// Transcript Viewer Component for Alignment Science Blog
// Supports multiple transcripts with chat-style layout

class TranscriptViewer {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            transcripts: options.transcripts || [],
            ...options
        };
        this.transcripts = {};
        this.currentTranscript = null;
        this.currentIndex = 0;
        this.init();
    }

    async init() {
        try {
            // Create the viewer structure
            this.render();
            
            // Load transcript data
            if (this.options.transcripts && this.options.transcripts.length > 0) {
                await this.loadTranscripts();
            }
        } catch (error) {
            console.error('Failed to initialize transcript viewer:', error);
            this.showError('Failed to load transcripts');
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="transcript-viewer">
                <div class="transcript-header">
                    <div class="transcript-header-title">Abridged Transcripts</div>
                    <div class="transcript-tabs"></div>
                </div>
                <div class="transcript-content">
                    <div class="transcript-loading">Loading transcripts...</div>
                </div>
            </div>
        `;
    }

    async loadTranscripts() {
        const tabsContainer = this.container.querySelector('.transcript-tabs');
        
        for (const transcriptInfo of this.options.transcripts) {
            try {
                const response = await fetch(transcriptInfo.url);
                if (!response.ok) throw new Error(`Failed to fetch ${transcriptInfo.url}`);
                const data = await response.json();
                
                // Store transcript data
                const id = transcriptInfo.id || transcriptInfo.url;
                this.transcripts[id] = data;
                
                // Create tab button
                const button = document.createElement('button');
                button.className = 'transcript-tab';
                button.textContent = data.name || 'Unnamed Transcript';
                button.onclick = () => this.selectTranscript(id);
                tabsContainer.appendChild(button);
                
                // Select first transcript by default
                if (!this.currentTranscript) {
                    this.selectTranscript(id);
                }
            } catch (error) {
                console.error(`Failed to load transcript from ${transcriptInfo.url}:`, error);
            }
        }
    }

    selectTranscript(id) {
        this.currentTranscript = id;
        this.currentIndex = 0;
        
        // Update tab states
        const tabs = this.container.querySelectorAll('.transcript-tab');
        tabs.forEach((tab, index) => {
            tab.classList.toggle('active', index === Object.keys(this.transcripts).indexOf(id));
        });
        
        // Render the selected transcript
        this.renderTranscript();
        
        // Reset scroll position to top
        const contentContainer = this.container.querySelector('.transcript-content');
        if (contentContainer) {
            contentContainer.scrollTop = 0;
        }
    }

    renderTranscript() {
        const content = this.container.querySelector('.transcript-content');
        const transcript = this.transcripts[this.currentTranscript];
        
        if (!transcript || !transcript.entries) {
            content.innerHTML = '<div class="transcript-empty">No transcript data available</div>';
            return;
        }

        // Add description if available
        let html = '';
        if (transcript.description) {
            html += `<div class="transcript-description">${transcript.description}</div>`;
        }

        // Render entries
        html += '<div class="transcript-entries">';
        html += transcript.entries.map((entry, index) => 
            this.renderEntry(entry, index)
        ).join('');
        html += '</div>';

        content.innerHTML = html;
        
        // Add intersection observer for lazy rendering of code blocks
        this.setupIntersectionObserver();
    }

    renderEntry(entry, index) {
        const typeClass = `transcript-entry-${entry.type}`;
        const subtypeClass = entry.subtype ? `subtype-${entry.subtype}` : '';
        const isLastEntry = index === this.transcripts[this.currentTranscript].entries.length - 1;
        const lastEntryClass = isLastEntry ? 'last-entry' : '';
        
        let content = this.formatContent(entry);
        
        return `
            <div class="transcript-entry ${typeClass} ${subtypeClass} ${lastEntryClass}" data-index="${index}">
                <div class="entry-content">
                    ${content}
                </div>
            </div>
        `;
    }

    formatContent(entry) {
        let content = entry.content;
        
        // Handle specific subtypes that need special formatting
        if (entry.subtype === 'todo_output') {
            return this.formatTodoList(content);
        } else if (entry.subtype === 'report') {
            return this.formatMarkdown(content);
        } else if (entry.subtype === 'plan') {
            return this.formatMarkdown(content);
        }
        
        // Format <b>[...]</b> tags with orange styling BEFORE other formatting
        content = content.replace(/<b>(\[.*?\])<\/b>/g, '<span class="orange-bracket-highlight">$1</span>');
        
        // Format code blocks BEFORE converting newlines
        content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'plaintext';
            const trimmedCode = code.trim();
            
            // If Prism is available, let it handle the highlighting
            if (window.Prism) {
                return `<pre class="code-block"><code class="language-${language}">${this.escapeHtml(trimmedCode)}</code></pre>`;
            }
            
            // Otherwise, apply basic tokenization
            const highlightedCode = this.basicSyntaxHighlight(trimmedCode, language);
            return `<pre class="code-block"><code class="language-${language}">${highlightedCode}</code></pre>`;
        });
        
        // Format inline code
        content = content.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
        
        // Convert newlines to <br> for better formatting (but not inside pre tags)
        content = content.split(/(<pre[\s\S]*?<\/pre>)/).map((part, i) => {
            // Only convert newlines in non-pre sections
            if (i % 2 === 0) {
                return part.replace(/\n/g, '<br>');
            }
            return part;
        }).join('');
        
        // Add special formatting based on type and subtype
        const titleSuffix = entry.title_suffix ? ` ${entry.title_suffix}` : '';
        
        if (entry.type === 'agent') {
            if (entry.subtype === 'send_message' || entry.subtype === 'normal_chat') {
                content = `<div class="tool-call-marker">💬 Chat with Target${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'send_tool_call_result') {
                content = `<div class="tool-call-marker">📤 Send Tool Result${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'set_target_system_message') {
                content = `<div class="tool-call-marker">⚙️ Set Target System Prompt${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'rollback_conversation') {
                content = `<div class="tool-call-marker">🔄 Rollback Conversation${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'create_tool') {
                // For create_tool, try to extract tool name from function code or arguments
                const toolMatch = content.match(/def\s+(\w+)\s*\(/) || content.match(/create_tool\(name=['"]([^'"]+)['"]/);
                const toolName = toolMatch ? toolMatch[1] : 'Unknown Tool';
                content = `<div class="tool-call-marker">🔨 Create Tool: ${toolName}${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'end_conversation') {
                content = `<div class="tool-call-marker">🏁 End Conversation${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'tool_call') {
                // Legacy handling for old tool_call subtype
                if (content.includes('send_message(')) {
                    const messageMatch = content.match(/send_message\(message=['"]([\s\S]*?)['"]/)
                    const messageContent = messageMatch ? messageMatch[1] : content;
                    content = `<div class="tool-call-marker">📨 Send Message${titleSuffix}</div><div class="message-content">${this.escapeHtml(messageContent).replace(/\n/g, '<br>')}</div>`;
                } else if (content.includes('send_tool_call_result(')) {
                    content = `<div class="tool-call-marker">📤 Send Tool Result${titleSuffix}</div>${content}`;
                } else if (content.includes('set_target_system_message(')) {
                    content = `<div class="tool-call-marker">⚙️ Set Target System Prompt${titleSuffix}</div>${content}`;
                } else if (content.includes('rollback_conversation(')) {
                    content = `<div class="tool-call-marker">🔄 Rollback Conversation${titleSuffix}</div>${content}`;
                } else if (content.includes('create_tool(')) {
                    const toolMatch = content.match(/create_tool\(name=['"]([^'"]+)['"]/);
                    const toolName = toolMatch ? toolMatch[1] : 'Unknown Tool';
                    content = `<div class="tool-call-marker">🔨 Create Tool: ${toolName}${titleSuffix}</div>${content}`;
                } else {
                    content = `<div class="tool-call-marker">🔧 Tool Call${titleSuffix}</div>${content}`;
                }
            } else if (entry.subtype === 'todo_call') {
                content = `<div class="tool-call-marker">📝 Todo Update${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'code_write') {
                content = `<div class="tool-call-marker">💻 Writing Code${titleSuffix}</div><div class="code-write-content">${content}</div>`;
            } else if (entry.subtype === 'bash_tool') {
                content = `<div class="tool-call-marker">🔧 Bash Command${titleSuffix}</div>${this.formatFeatureInput(content)}`;
            } else if (entry.subtype === 'thought' || entry.subtype === 'think') {
                content = `<div class="thought-marker">💭 Thinking${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'auditor_scratchpad') {
                content = `<div class="thought-marker">📝 Auditor Scratchpad${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'plan') {
                content = `<div class="tool-call-marker">📋 Plan${titleSuffix}</div>${content}`;
            } else if (entry.subtype && (entry.subtype.includes('_') || entry.subtype.includes('-'))) {
                // Handle any other tool subtypes dynamically
                const label = entry.subtype.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                content = `<div class="tool-call-marker">🔧 ${label}${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'set_system_prompt_tool') {
                content = `<div class="tool-call-marker">⚙️ Set Target System Prompt${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'normal_chat') {
                content = `<div class="tool-call-marker">💬 Chat with Target${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'chat_tool') {
                content = `<div class="tool-call-marker">💬 Chat with Target${titleSuffix}</div>${this.formatFeatureInput(content)}`;
            } else if (entry.subtype === 'retry_tool') {
                content = `<div class="tool-call-marker">🔄 Retry Conversation${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'get_all_feature_details') {
                content = `<div class="tool-call-marker">🔬 Get Feature Details${titleSuffix}</div>${this.formatFeatureInput(content)}`;
            } else if (entry.subtype === 'get_top_activating_features') {
                content = `<div class="tool-call-marker">📊 Get Top Activating Features${titleSuffix}</div>${this.formatFeatureInput(content)}`;
            } else if (entry.subtype === 'steer_with_features') {
                content = `<div class="tool-call-marker">🎯 Steer With Features${titleSuffix}</div>${this.formatFeatureInput(content)}`;
            } else if (entry.subtype === 'grep_dataset') {
                content = `<div class="tool-call-marker">🔍 Grep Dataset${titleSuffix}</div>${this.formatFeatureInput(content)}`;
            } else if (entry.subtype && entry.subtype.includes('feature')) {
                content = `<div class="tool-call-marker">🔬 Feature Analysis${titleSuffix}</div>${content}`;
            }
        } else if (entry.type === 'result') {
            // Add headers for result cells
            if (entry.subtype === 'chat_output') {
                content = `<div class="result-marker">🤖 Target Model Response${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'thinking') {
                content = `<div class="result-marker">💭 Target Thinking${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'tool_call') {
                content = `<div class="result-marker">🛠️ Target Tool Call${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'tool_output') {
                content = `<div class="result-marker">📤 Tool Output${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'todo_output') {
                content = `<div class="result-marker">📋 Todo List Updated${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'bash_output') {
                content = `<div class="result-marker">📤 Bash Output${titleSuffix}</div><div class="bash-output-content">${content}</div>`;
            } else if (entry.subtype === 'get_all_feature_details') {
                content = `<div class="result-marker">🔬 Top Activating Examples${titleSuffix}</div>${this.formatFeatureDetails(content)}`;
            } else if (entry.subtype === 'get_top_activating_features') {
                content = `<div class="result-marker">📊 Top Features${titleSuffix}</div>${this.formatTopFeatures(content)}`;
            } else if (entry.subtype === 'steer_output') {
                content = `<div class="result-marker">🎯 Steering Result${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'grep_output') {
                content = `<div class="result-marker">🔍 Search Results (Example Synthetic Document)${titleSuffix}</div>${content}`;
            } else if (entry.subtype) {
                // Generic result with subtype
                const label = entry.subtype.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                content = `<div class="result-marker">📤 ${label}${titleSuffix}</div>${content}`;
            } else {
                // Generic result
                content = `<div class="result-marker">📤 Result${titleSuffix}</div>${content}`;
            }
        } else if (entry.type === 'summary') {
            if (entry.subtype === 'critical_finding') {
                content = `<div class="finding-marker critical">⚠️ Critical Finding${titleSuffix}</div>${content}`;
            } else if (entry.subtype === 'finding') {
                content = `<div class="finding-marker">🔍 Finding${titleSuffix}</div>${content}`;
            }
            // No marker for generic summary/narration
        }
        
        return content;
    }
    
    formatMarkdown(content) {
        // Basic markdown to HTML conversion
        let html = content;
        
        // Format <b>[...]</b> tags with orange styling first
        html = html.replace(/<b>(\[.*?\])<\/b>/g, '<span class="orange-bracket-highlight">$1</span>');
        
        // Headers
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
        
        // Bold and italic
        html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Lists
        html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`);
        
        html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, match => {
            if (!match.includes('<ul>')) {
                return `<ol>${match}</ol>`;
            }
            return match;
        });
        
        // Code blocks
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'plaintext';
            const trimmedCode = code.trim();
            
            // If Prism is available, let it handle the highlighting
            if (window.Prism) {
                return `<pre class="code-block"><code class="language-${language}">${this.escapeHtml(trimmedCode)}</code></pre>`;
            }
            
            // Otherwise, apply basic tokenization
            const highlightedCode = this.basicSyntaxHighlight(trimmedCode, language);
            return `<pre class="code-block"><code class="language-${language}">${highlightedCode}</code></pre>`;
        });
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
        
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Paragraphs
        html = html.split('\n\n').map(para => {
            if (para.trim() && !para.startsWith('<')) {
                return `<p>${para}</p>`;
            }
            return para;
        }).join('\n');
        
        // Line breaks - removed to avoid excessive <br> tags
        // html = html.replace(/\n/g, '<br>');
        
        return `<div class="markdown-content">${html}</div>`;
    }
    
    formatTodoList(content) {
        try {
            // Try to parse the JSON from the content
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) return content;
            
            const data = JSON.parse(jsonMatch[0]);
            if (!data.todos || !Array.isArray(data.todos)) return content;
            
            // Create a formatted todo list
            let html = '<div class="todo-list">';
            html += '<div class="todo-list-header">📋 ToDo List</div>';
            
            // Group by status
            const grouped = {
                pending: [],
                in_progress: [],
                completed: []
            };
            
            data.todos.forEach(todo => {
                const status = todo.status || 'pending';
                if (grouped[status]) {
                    grouped[status].push(todo);
                }
            });
            
            // Render each group
            ['in_progress', 'pending', 'completed'].forEach(status => {
                if (grouped[status].length > 0) {
                    const statusLabel = status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                    html += `<div class="todo-group">`;
                    html += `<div class="todo-group-header">${statusLabel}</div>`;
                    
                    grouped[status].forEach(todo => {
                        const priorityClass = `priority-${todo.priority || 'medium'}`;
                        const statusIcon = status === 'completed' ? '✓' : 
                                         status === 'in_progress' ? '⏳' : '○';
                        
                        // Format the content with orange bracket highlighting
                        let todoContent = this.escapeHtml(todo.content);
                        todoContent = todoContent.replace(/&lt;b&gt;(\[.*?\])&lt;\/b&gt;/g, '<span class="orange-bracket-highlight">$1</span>');
                        
                        html += `<div class="todo-item ${priorityClass}">`;
                        html += `<span class="todo-status">${statusIcon}</span>`;
                        html += `<span class="todo-content">${todoContent}</span>`;
                        if (todo.priority === 'high') {
                            html += `<span class="todo-priority">⚡</span>`;
                        }
                        html += `</div>`;
                    });
                    
                    html += `</div>`;
                }
            });
            
            html += '</div>';
            return html;
            
        } catch (e) {
            // If parsing fails, return original content
            return content;
        }
    }
    
    formatFeatureInput(content) {
        try {
            let html = '<div class="feature-input">';
            
            // Parse the content for key-value pairs
            // Split by newlines or pipe delimiters
            const lines = content.split(/[\n|]/).filter(line => line.trim());
            
            lines.forEach(line => {
                const colonIndex = line.indexOf(':');
                if (colonIndex > -1) {
                    const key = line.substring(0, colonIndex).trim();
                    const value = line.substring(colonIndex + 1).trim();
                    
                    html += `<div class="input-field">`;
                    html += `<span class="input-label">${this.escapeHtml(key)}:</span>`;
                    html += `<span class="input-value">${this.escapeHtml(value)}</span>`;
                    html += `</div>`;
                }
            });
            
            html += '</div>';
            return html;
            
        } catch (e) {
            console.error('Failed to format feature input:', e);
            return content;
        }
    }
    
    formatTopFeatures(content) {
        try {
            let html = '<div class="top-features">';
            
            // Parse features using regex pattern
            // Matches: - **Feature 188727**: "Capital city / seat of government"
            const featureRegex = /- \*\*Feature (\d+)\*\*: "([^"]+)"/g;
            let match;
            const features = [];
            
            while ((match = featureRegex.exec(content)) !== null) {
                features.push({
                    index: match[1],
                    name: match[2]
                });
            }
            
            if (features.length === 0) {
                // If no features match the pattern, return the original content
                return content;
            }
            
            features.forEach(feature => {
                html += `<div class="feature-inlay">`;
                html += `<span class="feature-index">Feature ${this.escapeHtml(feature.index)}</span>`;
                html += `<span class="feature-name">${this.escapeHtml(feature.name)}</span>`;
                html += `</div>`;
            });
            
            html += '</div>';
            return html;
            
        } catch (e) {
            console.error('Failed to format top features:', e);
            return content;
        }
    }
    
    formatFeatureDetails(content) {
        try {
            if (!content || content.trim() === '') {
                return '<div class="feature-details-empty">No feature details available</div>';
            }
            
            let html = '<div class="feature-details">';
            // html += '<div class="feature-section-label">Top Activating Examples</div>';
            
            // Parse examples using regex
            const exampleRegex = /<example_(\d+)>(.*?)<\/example_\d+>/gs;
            let match;
            const examples = [];
            
            while ((match = exampleRegex.exec(content)) !== null) {
                examples.push({
                    index: parseInt(match[1]),
                    content: match[2]
                });
            }
            
            if (examples.length === 0) {
                return '<div class="feature-details-empty">No examples found</div>';
            }
            
            html += '<div class="feature-examples-container">';
            examples.forEach((example) => {
                // Parse the example content
                let displayText = example.content;
                
                // Replace ❰...❱ with highlighted spans
                displayText = displayText.replace(/❰(.+?)❱/g, '<span class="feature-highlight">$1</span>');
                
                // Clean up special characters
                displayText = displayText.replace(/⏎/g, '<span class="newline-marker">↵</span>');
                displayText = displayText.replace(/↑/g, '<span class="special-char">↑</span>');
                displayText = displayText.replace(/⇪/g, '<span class="special-char">⇪</span>');
                displayText = displayText.replace(/⍽/g, '<span class="special-char">⍽</span>');
                
                html += `<div class="feature-example-inlay">${displayText}</div>`;
            });
            html += '</div>';
            
            html += '</div>';
            return html;
            
        } catch (e) {
            console.error('Failed to format feature details:', e);
            return content;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    basicSyntaxHighlight(code, language) {
        // First escape HTML to prevent injection
        let highlighted = this.escapeHtml(code);
        
        // Apply basic syntax highlighting based on language
        // Comments (single and multi-line)
        highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="token comment">$1</span>');
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>');
        highlighted = highlighted.replace(/(#.*$)/gm, '<span class="token comment">$1</span>');
        
        // Strings (double and single quotes)
        highlighted = highlighted.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="token string">$1</span>');
        highlighted = highlighted.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="token string">$1</span>');
        
        // Numbers
        highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
        
        // Keywords (common across languages)
        const keywords = /\b(function|return|if|else|for|while|do|switch|case|break|continue|const|let|var|class|extends|import|export|from|async|await|try|catch|finally|throw|new|this|super|typeof|instanceof|in|of|delete|void|null|undefined|true|false|def|elif|except|pass|raise|lambda|with|as|is|not|and|or)\b/g;
        highlighted = highlighted.replace(keywords, '<span class="token keyword">$1</span>');
        
        // Function names (basic pattern)
        highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="token function">$1</span>(');
        
        // Operators
        highlighted = highlighted.replace(/([+\-*/%=<>!&|^~?:]+)/g, '<span class="token operator">$1</span>');
        
        return highlighted;
    }

    setupIntersectionObserver() {
        // Lazy load syntax highlighting for code blocks
        const codeBlocks = this.container.querySelectorAll('pre code');
        
        if (codeBlocks.length > 0 && window.Prism) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Prism.highlightElement(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            codeBlocks.forEach(block => observer.observe(block));
        }
    }

    showError(message) {
        const content = this.container.querySelector('.transcript-content');
        content.innerHTML = `<div class="transcript-error">${message}</div>`;
    }
}

// Auto-initialize transcript viewers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Find all transcript viewer containers
    const containers = document.querySelectorAll('[data-transcript-viewer]');
    
    containers.forEach(container => {
        // Parse transcript URLs from data attribute
        const transcriptUrls = container.dataset.transcriptUrls;
        let transcripts = [];
        
        if (transcriptUrls) {
            // Support both single URL and comma-separated URLs
            const urls = transcriptUrls.split(',').map(url => url.trim());
            transcripts = urls.map(url => ({ url }));
        }
        
        // Also support JSON configuration
        const configScript = container.querySelector('script[type="application/json"]');
        if (configScript) {
            try {
                const config = JSON.parse(configScript.textContent);
                if (config.transcripts) {
                    transcripts = config.transcripts;
                }
            } catch (e) {
                console.error('Failed to parse transcript config:', e);
            }
        }
        
        if (transcripts.length > 0) {
            new TranscriptViewer(container, { transcripts });
        }
    });
});

// Export for manual initialization
window.TranscriptViewer = TranscriptViewer;