'use strict';

(() => {
  const $ = (id) => document.getElementById(id);
  const storageKey = 'prism-browser-demo-v2';
  const aiStorageKey = 'prism-browser-ai-v1';
  const defaultOllamaUrl = 'http://localhost:11434';
  const maxFileSize = 1024 * 1024;
  const views = ['Home', 'Chat', 'Perspectives', 'Projects', 'Library', 'Settings'];
  const taskIdeas = ['Define the question', 'Review the sample outline', 'Revise the draft'];
  const perspectiveLenses = {
    Analytical: {
      purpose: 'Clarify the structure, assumptions, constraints, and measures that shape the question.',
      prompts: [
        'Which variables and constraints matter most?',
        'What evidence or measure would show whether an option is working?'
      ]
    },
    Creative: {
      purpose: 'Reframe the problem and surface alternatives beyond the obvious first solution.',
      prompts: [
        'What overlooked option or new framing could change the available choices?',
        'Can two existing ideas be combined into a better approach?'
      ]
    },
    Practical: {
      purpose: 'Translate options into resources, dependencies, trade-offs, and next steps.',
      prompts: [
        'What can be tried with the time, people, and budget available?',
        'What is the smallest useful experiment?'
      ]
    },
    Skeptical: {
      purpose: 'Stress-test claims, inspect missing evidence, and look for counterexamples.',
      prompts: [
        'What would make the preferred conclusion wrong?',
        'Which claims need verification or stronger supporting sources?'
      ]
    }
  };
  const starter = () => ({
    id: 'urban-tree-cover',
    name: 'Sample: Urban tree cover',
    messages: [],
    draft: 'Research plan\n\n1. Define a focused question about urban tree cover.\n2. Collect evidence from sources you review yourself.\n3. Build an outline that separates claims from evidence.\n4. Note limitations and unanswered questions.\n5. Revise the draft after checking every citation.\n\nFictional sample content. No research or source verification was performed.',
    tasks: taskIdeas.map((text, index) => ({ id: `sample-task-${index}`, text, done: false })),
    sources: [
      { title: 'Sample source card: urban tree cover', detail: 'Example metadata only. This preview did not retrieve or verify a source.' },
      { title: 'Sample note: measuring canopy', detail: 'A fictional research note for exploring the Library workflow.' }
    ]
  });
  const fresh = () => ({ version: 2, projects: [starter()], active: 0, theme: 'dark' });
  let state = fresh();
  let aiConfig = { url: defaultOllamaUrl, model: '', enabled: false };
  let aiModels = [];
  let aiConnection = { status: 'disconnected', message: 'Connect to Ollama to use a real local model.' };
  let aiBusy = false;
  let aiAbortController = null;
  let aiStopRequested = false;
  let screen = 'Home';
  let mode = 'Ask';
  let panelTab = 'Tasks';
  let toastTimer;
  let storageWarning = '';
  let perspectiveQuestion = 'How should a city decide where to add more street trees?';
  let selectedPerspectives = Object.keys(perspectiveLenses);
  let perspectiveResult = null;
  let perspectiveSaved = false;

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const current = () => state.projects[state.active];
  const wordCount = (text) => text.trim() ? text.trim().split(/\s+/).length : 0;
  const button = (label, action, extra = '') => `<button data-action="${action}" ${extra}>${esc(label)}</button>`;
  const toast = (message) => {
    $('toast').textContent = message;
    $('toast').hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('toast').hidden = true; }, 4500);
  };
  const blankProject = (name) => ({
    id: crypto.randomUUID ? crypto.randomUUID() : `project-${Date.now()}`,
    name,
    messages: [],
    draft: '',
    tasks: [],
    sources: []
  });

  function validateProject(project) {
    const allowed = ['id', 'name', 'messages', 'draft', 'tasks', 'sources'];
    const forbidden = /api.?key|token|secret|password|credential|authorization|cookie/i;
    const inspect = (value, depth = 0) => {
      if (depth > 8) throw new Error('The project file is nested too deeply.');
      if (Array.isArray(value)) {
        if (value.length > 300) throw new Error('The project contains too many items.');
        value.forEach((item) => inspect(item, depth + 1));
      } else if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, child]) => {
          if (forbidden.test(key)) throw new Error('Project files cannot contain credentials.');
          inspect(child, depth + 1);
        });
      } else if (typeof value === 'string' && value.length > 20000) {
        throw new Error('A project text field exceeds the 20,000-character limit.');
      }
    };
    inspect(project);
    if (!project || typeof project !== 'object' || Array.isArray(project) ||
        Object.keys(project).some((key) => !allowed.includes(key)) ||
        (project.id !== undefined && (typeof project.id !== 'string' || !project.id.trim() || project.id.length > 120)) ||
        typeof project.name !== 'string' || !project.name.trim() || project.name.length > 100 ||
        typeof project.draft !== 'string' || !Array.isArray(project.messages) ||
        !Array.isArray(project.tasks) || !Array.isArray(project.sources)) {
      throw new Error('A project has an unsupported or invalid format.');
    }
    const messages = project.messages.map((message) => {
      if (!message || typeof message.role !== 'string' || typeof message.text !== 'string' ||
          message.role.length > 60 || message.text.length > 10000 ||
          Object.keys(message).some((key) => !['role', 'text'].includes(key))) {
        throw new Error('A conversation message is invalid.');
      }
      return { role: message.role, text: message.text };
    });
    const tasks = project.tasks.map((task) => {
      if (!task || typeof task.text !== 'string' || !task.text.trim() || task.text.length > 200 ||
          typeof task.done !== 'boolean' ||
          Object.keys(task).some((key) => !['id', 'text', 'done'].includes(key))) {
        throw new Error('A task is invalid.');
      }
      return { id: String(task.id || `task-${Math.random()}`), text: task.text, done: task.done };
    });
    const sources = project.sources.map((source) => {
      if (!source || typeof source.title !== 'string' || typeof source.detail !== 'string' ||
          Object.keys(source).some((key) => !['title', 'detail'].includes(key))) {
        throw new Error('A sample source card is invalid.');
      }
      return { title: source.title, detail: source.detail };
    });
    return {
      id: String(project.id || `project-${Date.now()}`),
      name: project.name.trim(),
      messages,
      draft: project.draft,
      tasks,
      sources
    };
  }

  function normalize(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || value.version !== 2 ||
        !Array.isArray(value.projects) || value.projects.length < 1 || value.projects.length > 20 ||
        !Number.isInteger(value.active) || value.active < 0 || value.active >= value.projects.length ||
        !['dark', 'light'].includes(value.theme) ||
        Object.keys(value).some((key) => !['version', 'projects', 'active', 'theme'].includes(key))) {
      throw new Error('Unsupported project file. Choose a Prism demo JSON export.');
    }
    const projects = value.projects.map(validateProject);
    const projectIds = projects.map((project) => project.id);
    if (new Set(projectIds).size !== projectIds.length) {
      throw new Error('This project file contains duplicate project IDs. Export a fresh backup from Prism and try again.');
    }
    return {
      version: 2,
      projects,
      active: value.active,
      theme: value.theme
    };
  }

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      storageWarning = '';
      updatePrivacy();
      return true;
    } catch (error) {
      storageWarning = 'This browser could not save the latest changes. Check storage or privacy settings.';
      updatePrivacy();
      toast(storageWarning);
      return false;
    }
  }

  function load() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) state = normalize(JSON.parse(saved));
      else { save(); }
    } catch (error) {
      state = fresh();
      storageWarning = 'Saved demo data could not be read. Restore the sample or clear browser data in Settings.';
      toast(storageWarning);
    }
    setTheme(state.theme);
  }

  function updatePrivacy() {
    const label = $('privacyStatus');
    const settingsLabel = $('settingsPrivacyStatus');
    const message = storageWarning || (aiConnection.status === 'connected'
      ? `Projects stay in this browser. Chat prompts and recent conversation context are sent to your configured Ollama server at ${aiConfig.url}.`
      : 'Projects stay in this browser. No prompts are sent anywhere until you connect an AI model.');
    if (label) label.textContent = message;
    if (settingsLabel) settingsLabel.textContent = message;
  }

  function loadAIConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem(aiStorageKey) || 'null');
      if (!saved || typeof saved !== 'object') return;
      if (typeof saved.url === 'string') aiConfig.url = validateOllamaUrl(saved.url);
      if (typeof saved.model === 'string' && saved.model.length <= 200) aiConfig.model = saved.model;
      aiConfig.enabled = saved.enabled === true;
      if (aiConfig.enabled) aiConnection = { status: 'connecting', message: 'Checking your saved Ollama connection...' };
    } catch {
      aiConfig = { url: defaultOllamaUrl, model: '', enabled: false };
      aiConnection = { status: 'disconnected', message: 'Saved AI settings were invalid and have been reset.' };
    }
  }

  function saveAIConfig() {
    try {
      localStorage.setItem(aiStorageKey, JSON.stringify(aiConfig));
      return true;
    } catch {
      toast('Browser storage could not save the AI settings.');
      return false;
    }
  }

  function validateOllamaUrl(value) {
    let parsed;
    try { parsed = new URL(String(value || '').trim()); }
    catch { throw new Error('Enter a valid Ollama server address, such as http://localhost:11434.'); }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password ||
        parsed.search || parsed.hash || !['', '/'].includes(parsed.pathname)) {
      throw new Error('Use an HTTP or HTTPS server address without a path, username, password, or query string.');
    }
    return parsed.origin;
  }

  function updateAIChrome() {
    const badge = $('connectionBadge');
    const composerStatus = $('composerStatus');
    const sendButton = $('composer')?.querySelector('button[type="submit"]');
    const input = $('input');
    const cancel = $('cancelAI');
    const connected = aiConnection.status === 'connected' && aiConfig.enabled && Boolean(aiConfig.model);
    if (badge) {
      badge.textContent = connected ? `AI connected · ${aiConfig.model}` : (aiConnection.status === 'connecting' ? 'Connecting to AI...' : 'Sample mode');
      badge.classList.toggle('connected', connected);
    }
    if (composerStatus) {
      composerStatus.textContent = connected
        ? `Live local AI · ${aiConfig.model}`
        : 'Sample mode · connect Ollama in Settings for live AI';
    }
    if (sendButton) sendButton.disabled = aiBusy;
    if (input) input.disabled = aiBusy;
    if (cancel) cancel.hidden = !aiBusy;
    updatePrivacy();
  }

  async function connectAI(silent = false) {
    const urlField = $('ollamaUrl');
    const modelField = $('ollamaModel');
    try {
      aiConfig.url = validateOllamaUrl(urlField ? urlField.value : aiConfig.url);
      aiConnection = { status: 'connecting', message: 'Checking Ollama and discovering installed models...' };
      updateAIChrome();
      if (!silent) render();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      let response;
      try {
        response = await fetch(`${aiConfig.url}/api/tags`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
          signal: controller.signal
        });
      } finally { clearTimeout(timeout); }
      if (!response.ok) throw new Error(`Ollama returned HTTP ${response.status}. Check that the server is running.`);
      const payload = await response.json();
      aiModels = Array.isArray(payload.models)
        ? payload.models.map((item) => item && (item.name || item.model)).filter((name) => typeof name === 'string' && name.length <= 200)
        : [];
      if (!aiModels.length) {
        aiConfig.enabled = false;
        aiConnection = { status: 'error', message: 'Ollama is running, but no models are installed yet. Install a model, then connect again.' };
        saveAIConfig();
        if (!silent) render();
        updateAIChrome();
        return;
      }
      if (!aiModels.includes(aiConfig.model)) aiConfig.model = aiModels[0];
      aiConfig.enabled = true;
      aiConnection = { status: 'connected', message: `Connected successfully. Found ${aiModels.length} installed model${aiModels.length === 1 ? '' : 's'}.` };
      saveAIConfig();
      if (!silent) toast(`Prism connected to Ollama. ${aiModels.length} model(s) ready.`);
    } catch (error) {
      aiConfig.enabled = false;
      aiModels = [];
      const detail = error && error.name === 'AbortError'
        ? 'Ollama did not respond within 10 seconds.'
        : (error && error.message ? error.message : 'The browser could not reach Ollama.');
      aiConnection = {
        status: 'error',
        message: `${detail} Start Ollama and allow https://dudesquad999.github.io in OLLAMA_ORIGINS if the browser blocks the request.`
      };
      saveAIConfig();
      if (!silent) toast('Could not connect to Ollama. Check the setup notes in Settings.');
    }
    if (!silent && screen !== 'Settings') screen = 'Settings';
    render();
    updateAIChrome();
  }

  function disconnectAI() {
    if (aiAbortController) aiAbortController.abort();
    aiConfig.enabled = false;
    aiConnection = { status: 'disconnected', message: 'Disconnected. Your saved projects and drafts remain in this browser.' };
    saveAIConfig();
    render();
    toast('Local AI disconnected.');
  }

  function updateStreamingMessage(project, message, messageIndex) {
    if (screen !== 'Chat' || current().id !== project.id) return;
    const body = document.querySelector(`[data-message-index="${messageIndex}"] .body`);
    if (body) body.textContent = message.text || 'Thinking...';
    const view = $('view');
    if (view && screen === 'Chat') view.scrollTop = view.scrollHeight;
  }

  function buildOllamaMessages(project) {
    const system = [
      'You are Prism, a thoughtful research and writing assistant.',
      'Be clear, practical, and honest. Structure answers with concise headings or numbered steps when useful.',
      'Never invent sources, URLs, quotations, citations, statistics, or claims of live research.',
      'This browser workspace has no web search or source-verification tool. In Research mode, help plan research and evaluate material the user provides, but clearly say you cannot perform a live web search.',
      'Do not claim to have read files or sources unless their contents are included in the conversation.',
      `Current project: ${project.name}. Workspace mode: ${mode}.`
    ];
    if (mode === 'Documents' || mode === 'Create') {
      system.push('The project draft below is user-provided working text. Help revise it only as requested and explain substantial changes.');
      system.push(`Current project draft (may be empty):\n${project.draft.slice(0, 8000)}`);
    }
    const history = project.messages.slice(0, -1).slice(-18).filter((item) => typeof item.text === 'string' && item.text.trim());
    return [
      { role: 'system', content: system.join('\n\n') },
      ...history.map((item) => ({
        role: item.role === 'You' ? 'user' : 'assistant',
        content: item.text.slice(0, 10000)
      }))
    ];
  }

  async function streamOllamaChat(project, assistantMessage, messageIndex) {
    const controller = new AbortController();
    aiAbortController = controller;
    aiStopRequested = false;
    const timeout = setTimeout(() => controller.abort(), 180000);
    try {
      const response = await fetch(`${aiConfig.url}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/x-ndjson, application/json' },
        cache: 'no-store',
        signal: controller.signal,
        body: JSON.stringify({
          model: aiConfig.model,
          messages: buildOllamaMessages(project),
          stream: true,
          options: { temperature: 0.35 }
        })
      });
      if (!response.ok) {
        let detail = '';
        try { detail = (await response.json()).error || ''; } catch {}
        throw new Error(detail || `Ollama returned HTTP ${response.status}.`);
      }
      if (!response.body || !response.body.getReader) throw new Error('This browser does not support streamed responses. Try a current version of Edge or Chrome.');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      const consume = (line) => {
        if (!line.trim()) return;
        const chunk = JSON.parse(line);
        if (chunk.error) throw new Error(chunk.error);
        const part = chunk.message && typeof chunk.message.content === 'string' ? chunk.message.content : '';
        if (part && assistantMessage.text.length < 10000) {
          assistantMessage.text += part.slice(0, 10000 - assistantMessage.text.length);
          updateStreamingMessage(project, assistantMessage, messageIndex);
        }
      };
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const records = buffer.split('\n');
        buffer = records.pop() || '';
        records.forEach(consume);
      }
      buffer += decoder.decode();
      if (buffer.trim()) consume(buffer);
      if (!assistantMessage.text.trim()) throw new Error('Ollama returned an empty response. Check that the selected model is available.');
    } finally {
      clearTimeout(timeout);
      if (aiAbortController === controller) aiAbortController = null;
    }
  }

  async function submitChat(text) {
    const project = current();
    const selectedMode = mode;
    const userMessage = { role: 'You', text };
    project.messages.push(userMessage);
    $('input').value = '';
    screen = 'Chat';
    const liveAI = aiConfig.enabled && aiConnection.status === 'connected' && Boolean(aiConfig.model);
    const assistantMessage = {
      role: liveAI ? `Prism · ${aiConfig.model}` : 'Prism · sample mode',
      text: liveAI ? 'Thinking...' : reply(text)
    };
    project.messages.push(assistantMessage);
    const messageIndex = project.messages.length - 1;
    if (selectedMode === 'Create' && !liveAI) project.draft = assistantMessage.text;
    if (!liveAI) {
      save();
      render();
      return;
    }
    aiBusy = true;
    save();
    render();
    updateAIChrome();
    try {
      await streamOllamaChat(project, assistantMessage, messageIndex);
      if (selectedMode === 'Create' || selectedMode === 'Documents') {
        const nextDraft = assistantMessage.text;
        if (nextDraft.length <= 20000) project.draft = nextDraft;
        else toast('The AI response is too long to save as the project draft. Download or copy it from the chat instead.');
      }
      save();
    } catch (error) {
      const stopped = aiStopRequested && error && error.name === 'AbortError';
      assistantMessage.role = stopped ? 'Prism · response stopped' : 'Prism · connection issue';
      const detail = error && error.name === 'AbortError'
        ? (stopped ? 'Response stopped.' : 'The response timed out.')
        : (error && error.message ? error.message : 'The connection to Ollama was interrupted.');
      assistantMessage.text = assistantMessage.text === 'Thinking...'
        ? `${detail} Check the Ollama server and selected model in Settings, then try again.`
        : `${assistantMessage.text}\n\n[Connection interrupted: ${detail}]`;
      save();
    } finally {
      aiBusy = false;
      aiStopRequested = false;
      aiAbortController = null;
      render();
      updateAIChrome();
    }
  }

  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f6f5f9' : '#0f0e15';
  }

  function download(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function renderNav() {
    $('nav').innerHTML = views.map((view) =>
      `<button data-view="${view}" class="${screen === view ? 'active' : ''}" ${screen === view ? 'aria-current="page"' : ''}>${esc(view)}</button>`
    ).join('');
    $('projectLinks').innerHTML = state.projects.map((project, index) =>
      `<button data-project="${index}" title="${esc(project.name)}">${index === state.active ? '●' : '◇'} ${esc(project.name)}</button>`
    ).join('');
  }

  function renderPanel() {
    const project = current();
    const tabs = ['Tasks', 'Sources', 'Drafts'];
    $('tabs').innerHTML = tabs.map((tab) =>
      `<button data-tab="${tab}" class="${panelTab === tab ? 'active' : ''}" aria-pressed="${panelTab === tab}">${tab}</button>`
    ).join('');
    if (panelTab === 'Tasks') {
      $('panelBody').innerHTML = `<h3>Project tasks</h3>${project.tasks.map((task, index) =>
        `<div class="task"><input type="checkbox" data-task="${index}" aria-label="${esc(task.text)}" ${task.done ? 'checked' : ''}><span>${esc(task.text)}</span>${button('Remove task', 'removeTask', `data-index="${index}" aria-label="Remove ${esc(task.text)}"` )}</div>`
      ).join('')}<form id="taskForm" class="toolbar"><input id="taskText" maxlength="200" placeholder="Add a task" aria-label="New task"><button class="primary">Add task</button></form>
      <p class="tiny">${project.tasks.filter((task) => task.done).length} of ${project.tasks.length} complete. Sample tasks are editable.</p>`;
    } else if (panelTab === 'Sources') {
      $('panelBody').innerHTML = `<h3>Sample sources</h3><p>These are fictional example cards, not search results.</p>${project.sources.map((source) =>
        `<article class="card"><h3>${esc(source.title)}</h3><p>${esc(source.detail)}</p></article>`
      ).join('') || '<p>No sample cards in this project.</p>'}`;
    } else {
      $('panelBody').innerHTML = `<h3>Markdown draft</h3><p>Editable text stored in this browser.</p>${button('Open draft editor', 'draft')}<p>${button('Export Markdown', 'exportDraft')}</p>`;
    }
  }

  function render() {
    const project = current();
    $('crumb').textContent = screen;
    $('composerArea').hidden = screen !== 'Chat';
    renderNav();
    let html = '';
    if (screen === 'Home') {
      const aiReady = aiConnection.status === 'connected' && aiConfig.enabled;
      html = `<section class="home-hero">
        <div class="hero-kicker">RESEARCH · WRITING · YOUR AI</div>
        <h1>Turn your research into work that is ready to move forward.</h1>
        <p>Keep questions, notes, conversations, and drafts in one focused workspace. Connect your own local AI model when you want real assistance.</p>
        <div class="hero-status"><span class="status-dot ${aiReady ? 'live' : ''}"></span><strong>${aiReady ? 'Local AI is connected' : 'Workspace ready'}</strong><span>${aiReady ? esc(aiConfig.model) : 'Connect Ollama to turn on live AI'}</span></div>
        <div class="toolbar">${button('Open Prism Chat', 'openChat', 'class="primary"')}${button(aiReady ? 'AI connection settings' : 'Connect local AI', 'openAISettings')}${button('Create a project', 'newProject')}</div>
      </section>
      <div class="grid">
        <article class="card"><div class="card-icon">01</div><h2>Research with structure</h2><p>Shape a question, keep source notes together, and build a plan that separates evidence from assumptions.</p>${button('Open research chat', 'openChat')}</article>
        <article class="card"><div class="card-icon">02</div><h2>Write in one workspace</h2><p>Develop a Markdown draft, revise it with your connected model, and export your work at any time.</p>${button('Continue writing', 'draft')}</article>
        <article class="card"><div class="card-icon">03</div><h2>Challenge your thinking</h2><p>Compare analytical, creative, practical, and skeptical perspectives before deciding what to do next.</p>${button('Compare perspectives', 'perspectives')}</article>
      </div>
      <div class="grid home-lower">
        <article class="card"><h2>${esc(project.name)}</h2><p>${project.messages.length} messages · ${project.tasks.filter((task) => task.done).length}/${project.tasks.length} tasks complete</p>${button('Open project', 'projects')}</article>
        <article class="card"><h2>Your working draft</h2><p>${wordCount(project.draft)} words saved in this browser.</p>${button('Open Library', 'draft')}</article>
      </div>
      <div class="notice">The browser workspace can use a model running on your computer through Ollama. It does not include cloud API keys or live web search. AI-generated content should be reviewed before use.</div>`;
    } else if (screen === 'Chat') {
      html = project.messages.length ? project.messages.map((message, index) =>
        `<article class="message ${message.role === 'You' ? 'user' : ''}" data-message-index="${index}"><div class="who">${esc(message.role)}</div><div class="body">${esc(message.text)}</div></article>`
      ).join('') : `<div class="page"><h1>What are you working on?</h1><p>Ask a question, plan a research workflow, or work on your current draft. Connect Ollama in Settings for live model responses.</p><div class="grid">${button('Plan a research question', 'openChat', 'class="primary"')}${button('Connect local AI', 'openAISettings')}</div></div>`;
    } else if (screen === 'Perspectives') {
      html = renderPerspectiveView();
    } else if (screen === 'Projects') {
      html = `<h1>Projects</h1><p>Create projects and switch between their conversations, tasks, sample source cards, and drafts.</p><div class="toolbar">${button('New project', 'newProject', 'class="primary"')}${button('Rename this project', 'renameProject')}${button('Delete this project', 'deleteProject')}</div><div class="grid">${state.projects.map((item, index) => `<article class="card"><h2>${esc(item.name)}</h2><p>${item.messages.length} messages · ${item.tasks.length} tasks · ${wordCount(item.draft)} draft words</p><button data-project="${index}">${index === state.active ? 'Current project' : 'Open project'}</button></article>`).join('')}</div>`;
    } else if (screen === 'Library') {
      html = `<h1>Draft library</h1><p>${esc(project.name)} · Markdown is editable and auto-saved in this browser.</p><div class="toolbar">${button('Download Markdown', 'exportDraft', 'class="primary"')}${button('Download conversation', 'exportChat')}</div><label class="field" for="draftEditor">Working draft</label><textarea id="draftEditor" class="editor" maxlength="20000" spellcheck="true">${esc(project.draft)}</textarea><p class="tiny">${wordCount(project.draft)} words · Changes remain on this device.</p>`;
    } else {
      const modelOptions = aiModels.length
        ? aiModels.map((name) => `<option value="${esc(name)}" ${name === aiConfig.model ? 'selected' : ''}>${esc(name)}</option>`).join('')
        : `<option value="${esc(aiConfig.model)}">${aiConfig.model ? `Saved model: ${esc(aiConfig.model)} (reconnect to verify)` : 'Connect to discover installed models'}</option>`;
      html = `<h1>Settings</h1><p>Connect a model, manage your local workspace, and control how Prism stores your work.</p>
        <section class="card ai-connect-card">
          <div class="ai-card-top"><div><div class="hero-kicker">OPTIONAL LOCAL AI</div><h2>Connect your own model</h2></div><span id="settingsAIStatus" class="status-chip ${aiConnection.status}">${aiConnection.status === 'connected' ? 'Connected' : aiConnection.status === 'connecting' ? 'Connecting' : aiConnection.status === 'error' ? 'Needs attention' : 'Not connected'}</span></div>
          <p>Prism connects directly to Ollama running on your computer. Your model runs locally, and this browser page does not need a cloud API key.</p>
          <label class="field" for="ollamaUrl">Ollama server address<input id="ollamaUrl" type="url" spellcheck="false" autocomplete="url" value="${esc(aiConfig.url)}" placeholder="http://localhost:11434"></label>
          <label class="field" for="ollamaModel">Installed model<select id="ollamaModel" ${aiModels.length ? '' : 'disabled'}>${modelOptions}</select></label>
          <div class="toolbar">${button('Connect and find models', 'connectAI', 'class="primary"')}${button('Disconnect', 'disconnectAI', aiConfig.enabled ? '' : 'disabled')}</div>
          <p id="aiConnectionMessage" class="connection-note ${aiConnection.status}" role="status">${esc(aiConnection.message)}</p>
          <details class="setup-details"><summary>How to connect Ollama on Windows</summary>
            <ol><li>Install and open <a href="https://ollama.com/download/windows" target="_blank" rel="noopener noreferrer">Ollama for Windows</a>.</li><li>Make sure at least one model is installed. You can run <code>ollama list</code> in PowerShell to check.</li><li>Allow this website to contact your local Ollama server. In PowerShell, run <code>setx OLLAMA_ORIGINS "https://dudesquad999.github.io"</code>.</li><li>Quit Ollama from its system-tray icon, then open it again so the new setting takes effect.</li><li>Return here and select <strong>Connect and find models</strong>. Choose an installed model from the list.</li></ol>
            <p class="tiny">The hosted browser preview requires the website origin to be allowed by Ollama. For other hosting URLs, replace the origin in the command with the exact URL shown in your browser.</p>
          </details>
        </section>
        <section class="card settings-data-card"><h2>Data and privacy</h2><p id="settingsPrivacyStatus"></p><div class="toolbar">${button('Export projects (JSON)', 'exportJSON')}${button('Import projects (JSON)', 'importJSON')}</div><p class="tiny">The export contains project messages, tasks, sources, and drafts. It does not include AI server settings. Never place passwords, API keys, or private credentials in project files.</p></section>
        <section class="card settings-data-card"><h2>Appearance and reset</h2><div class="toolbar">${button('Dark theme', 'dark')}${button('Light theme', 'light')}${button('Restore sample project', 'restoreSample')}${button('Clear all data', 'clearData', 'class="danger"')}</div><p class="tiny">Clearing all data removes saved projects and AI connection settings from this browser. This cannot be undone.</p></section>`;
    }
    $('view').innerHTML = screen === 'Chat' ? html : `<div class="page">${html}</div>`;
    $('modes').innerHTML = ['Ask', 'Research', 'Documents', 'Create'].map((name) =>
      `<button data-mode="${name}" class="${mode === name ? 'active' : ''}" aria-pressed="${mode === name}">${name}</button>`
    ).join('');
    renderPanel();
    updateAIChrome();
    if (screen === 'Chat') $('view').scrollTop = $('view').scrollHeight;
  }

  function buildPerspectiveBrief(question, selected) {
    const lenses = selected.map((name) => ({ name, ...perspectiveLenses[name] }));
    const markdown = [
      '# Prism perspective brief',
      '',
      `**Question or decision:** ${question}`,
      '',
      '> This is a locally assembled review framework from the browser demo. It is not an AI-generated answer or research.',
      '',
      ...lenses.flatMap((lens) => [
        `## ${lens.name}`,
        lens.purpose,
        '',
        ...lens.prompts.map((prompt) => `- ${prompt}`),
        ''
      ]),
      '## Synthesis checklist',
      '',
      '- Where do the selected lenses agree, and where do they surface different priorities?',
      '- Which assumptions explain the differences?',
      '- Which factual claims need to be checked against original sources?',
      '- What is the smallest practical next step, and what evidence would change the decision?'
    ].join('\n');
    return { projectId: current().id, question, lenses, markdown };
  }

  function renderPerspectiveView() {
    const options = Object.entries(perspectiveLenses).map(([name, lens]) => `
      <label class="card perspective-option">
        <input type="checkbox" data-perspective="${esc(name)}" ${selectedPerspectives.includes(name) ? 'checked' : ''}>
        <span><strong>${esc(name)}</strong><span class="tiny">${esc(lens.purpose)}</span></span>
      </label>
    `).join('');

    let output = `<div id="perspectiveOutput" class="notice" aria-live="polite">Build a brief to see how different lenses can examine the same question. Choose at least two perspectives.</div>`;
    if (perspectiveResult) {
      const belongsToProject = perspectiveResult.projectId === current().id;
      const resultCards = perspectiveResult.lenses.map((lens) => `
        <article class="card">
          <h3>${esc(lens.name)}</h3>
          <p>${esc(lens.purpose)}</p>
          <ul>${lens.prompts.map((prompt) => `<li>${esc(prompt)}</li>`).join('')}</ul>
        </article>
      `).join('');
      output = `
        <section id="perspectiveOutput" class="perspective-output" aria-live="polite" aria-atomic="true">
          <span class="eyebrow">Structured review brief</span>
          <h2>${esc(perspectiveResult.question)}</h2>
          <div class="grid">${resultCards}</div>
          <div class="notice">
            <strong>Synthesis checklist</strong>
            <ul>
              <li>Where do the selected lenses agree, and where do they surface different priorities?</li>
              <li>Which assumptions explain the differences?</li>
              <li>Which factual claims need to be checked against original sources?</li>
              <li>What is the smallest practical next step, and what evidence would change the decision?</li>
            </ul>
            <p class="tiny">Compare the reasoning, not the number of perspectives. These cards are structured prompts, not independent model outputs or verified findings.</p>
          </div>
          <div class="toolbar">
            ${button('Download Markdown brief', 'downloadPerspective')}
            ${belongsToProject
              ? button(perspectiveSaved ? 'Saved to project draft' : 'Save to project draft', 'savePerspective', perspectiveSaved ? 'disabled' : '')
              : '<span class="tiny">This brief belongs to a different project. Rebuild it before saving to the current project.</span>'}
          </div>
        </section>`;
    }

    return `
      <h1>Look at the same question from different angles.</h1>
      <p>Choose the perspectives that matter, then build a review brief you can use to challenge assumptions and plan your next step.</p>
      <div class="notice">Browser demo only: this tool assembles a structured checklist locally. It does not call an AI model, search the web, produce factual conclusions, or verify sources. Perspectives are reasoning lenses, not separate AI agents.</div>
      <form id="perspectiveForm" class="card">
        <label class="field" for="perspectiveQuestion">Question or decision
          <textarea id="perspectiveQuestion" rows="3" maxlength="1200" required>${esc(perspectiveQuestion)}</textarea>
        </label>
        <div class="toolbar">
          <span class="tiny">Choose at least two perspectives</span>
          <button type="button" data-action="perspectiveExample">Load sample question</button>
        </div>
        <div class="grid">${options}</div>
        <button class="primary" type="submit">Build perspective brief</button>
      </form>
      ${output}`;
  }

  function reply(text) {
    const lower = text.toLowerCase();
    if (mode === 'Research') return 'Example research plan only. No search was performed and these are not findings.\n\n1. Identify a focused question.\n2. Search and inspect reliable sources yourself.\n3. Record what each source supports and its limitations.';
    if (mode === 'Documents') return 'Document workflow example only. No file was uploaded or read. You can paste notes into the draft editor in Library.';
    if (mode === 'Create' || /outline|draft|plan|write/.test(lower)) return `Sample outline for: ${text}\n\n1. State the question and context.\n2. Organize evidence you verify yourself.\n3. Discuss limitations.\n4. Summarize next steps.\n\nThis is a fixed example, not generated by AI or based on research.`;
    return `Thanks for trying Prism Chat. This is a scripted example response to “${text}”. The demo has no AI connection and did not search the web. Try the Research mode to see a sample workflow.`;
  }

  function showDialog(title, body) {
    $('dialogTitle').textContent = title;
    $('dialogBody').innerHTML = body;
    $('dialog').showModal();
  }

  function searchProjects(query = '') {
    const matches = state.projects
      .map((project, index) => ({ project, index }))
      .filter(({ project }) => project.name.toLowerCase().includes(query.trim().toLowerCase()));
    const results = matches.length
      ? matches.map(({ project, index }) => `<button data-project="${index}">${esc(project.name)}</button>`).join('')
      : '<p>No matching projects.</p>';
    const container = $('projectSearchResults');
    if (container) container.innerHTML = results;
  }

  function projectForm(rename = false) {
    showDialog(rename ? 'Rename project' : 'Create project', `<form id="projectForm"><label class="field">Project name<input id="projectName" maxlength="100" required value="${rename ? esc(current().name) : ''}"></label><button class="primary">${rename ? 'Save name' : 'Create project'}</button></form>`);
    $('projectName').focus();
    $('projectForm').onsubmit = (event) => {
      event.preventDefault();
      const name = $('projectName').value.trim();
      if (!name) return;
      if (rename) current().name = name;
      else {
        if (state.projects.length >= 20) return toast('A demo file can contain at most 20 projects.');
        state.projects.push(blankProject(name)); state.active = state.projects.length - 1;
      }
      save(); $('dialog').close(); render(); toast('Project saved in this browser.');
    };
  }

  function exportProject() {
    const data = JSON.stringify(state, null, 2);
    if (new Blob([data]).size > maxFileSize) return toast('This project export exceeds the 1 MB limit.');
    download('prism-demo.json', data, 'application/json');
    toast('Project data exported. No credentials are included.');
  }

  async function importProject(file) {
    if (!file) return;
    if (file.size > maxFileSize) throw new Error('Choose a JSON file smaller than 1 MB.');
    const imported = normalize(JSON.parse(await file.text()));
    const previous = state;
    state = imported;
    if (!save()) {
      state = previous;
      throw new Error('The imported data could not be saved in this browser.');
    }
    setTheme(state.theme); render(); toast('Project data imported into this browser.');
  }

  async function shareDemo() {
    const shareData = {
      title: 'Prism AI browser demo',
      text: 'Explore Prism AI’s interactive research and writing demo. No install or account needed.',
      url: `${location.origin}${location.pathname}`
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      toast('Demo link copied. Share it with someone who might find Prism useful.');
    } catch (error) {
      showDialog('Share the Prism demo', `<p>Copy this link to share the interactive demo:</p><label class="field">Demo link<input type="url" readonly value="${esc(shareData.url)}"></label>`);
      $('dialogBody').querySelector('input').focus();
      $('dialogBody').querySelector('input').select();
    }
  }

  function sampleConversation() {
    current().messages.push(
      { role: 'You', text: 'Help me plan a question about urban tree cover.' },
      { role: 'Prism · scripted example', text: 'Example plan only. No AI or search was used. Start with a specific location and population, decide how you will measure tree cover, compare access across neighborhoods, and check each claim against original sources.' }
    );
    save(); screen = 'Chat'; render();
  }

  function handleAction(action) {
    const project = current();
    if (action === 'perspectives') { screen = 'Perspectives'; render(); }
    else if (action === 'perspectiveExample') {
      perspectiveQuestion = 'How should a city decide where to add more street trees?';
      perspectiveResult = null;
      perspectiveSaved = false;
      screen = 'Perspectives';
      render();
    }
    else if (action === 'savePerspective') {
      if (!perspectiveResult) return;
      if (perspectiveResult.projectId !== current().id) return toast('Switch to the project used to create this brief, or build a new one.');
      if (perspectiveSaved) return toast('This brief is already saved to the project draft.');
      const previousDraft = current().draft;
      const existingDraft = previousDraft.trim();
      const nextDraft = existingDraft ? `${existingDraft}\n\n---\n\n${perspectiveResult.markdown}` : perspectiveResult.markdown;
      if (nextDraft.length > 20000) {
        return toast('This brief would exceed the 20,000-character project draft limit. Download the brief or shorten the existing draft before saving.');
      }
      current().draft = nextDraft;
      if (!save()) {
        current().draft = previousDraft;
        return;
      }
      perspectiveSaved = true;
      screen = 'Library';
      render();
      toast('Perspective brief added to this project draft.');
    }
    else if (action === 'downloadPerspective') {
      if (perspectiveResult) download('prism-perspective-brief.md', perspectiveResult.markdown, 'text/markdown;charset=utf-8');
    }
    else if (action === 'openAISettings') { screen = 'Settings'; render(); }
    else if (action === 'openChat') { screen = 'Chat'; render(); $('input').focus(); }
    else if (action === 'connectAI') connectAI(false);
    else if (action === 'disconnectAI') disconnectAI();
    else if (action === 'cancelAI' && aiAbortController) { aiStopRequested = true; aiAbortController.abort(); }
    else if (action === 'newProject') projectForm();
    else if (action === 'newchat') {
      if (project.messages.length && !confirm('Start a new chat and remove this project’s current conversation?')) return;
      project.messages = []; save(); screen = 'Chat'; render();
    }     else if (action === 'search') {
      showDialog('Search projects', '<label class="field" for="projectSearch">Project name<input id="projectSearch" type="search" autocomplete="off"></label><div id="projectSearchResults" class="results"></div>');
      searchProjects();
      $('projectSearch').focus();
    }
    else if (action === 'privacy') {
      showDialog('Browser workspace privacy', aiConnection.status === 'connected'
        ? `Projects and drafts are saved in this browser. When you use live chat, your prompt and recent conversation context are sent to your configured Ollama server at ${aiConfig.url}. Prism does not proxy those prompts through a Prism backend. No API key is stored by this page. This browser preview does not perform web search or verify citations.`
        : 'Projects and drafts are saved in this browser. No prompts are sent anywhere until you connect a model. If you connect Ollama, your prompt and recent conversation context are sent directly to the configured Ollama server. No API key is stored by this page.');
    }
    else if (action === 'share') shareDemo();
    else if (action === 'renameProject') projectForm(true);
    else if (action === 'deleteProject') {
      if (state.projects.length === 1) return toast('Keep at least one project. Clear all data in Settings to start blank.');
      if (!confirm(`Delete “${project.name}” from this browser?`)) return;
      state.projects.splice(state.active, 1); state.active = Math.max(0, state.active - 1); save(); render();
    } else if (action === 'sample') sampleConversation();
    else if (action === 'createDraft') {
      mode = 'Create'; project.draft = 'Research outline\n\n1. Question\n2. Context\n3. Evidence to verify\n4. Limitations\n5. Next steps'; save(); screen = 'Library'; render();
    } else if (action === 'draft') { screen = 'Library'; render(); }
    else if (action === 'exportDraft') download('prism-draft.md', project.draft, 'text/markdown;charset=utf-8');
    else if (action === 'exportChat') download('prism-conversation.md', project.messages.map((message) => `## ${message.role}\n\n${message.text}`).join('\n\n'), 'text/markdown;charset=utf-8');
    else if (action === 'exportJSON') exportProject();
    else if (action === 'importJSON') $('jsonFile').click();
    else if (action === 'restoreSample') {
      if (!confirm('Replace all saved demo projects with the fictional starter sample?')) return;
      state = fresh(); save(); setTheme(state.theme); render(); toast('Fictional sample restored.');
    } else if (action === 'clearData') {
      if (!confirm('Clear all Prism demo data from this browser and start blank? This cannot be undone.')) return;
      try { localStorage.removeItem(storageKey); }
      catch { return toast('Browser storage could not be cleared. Check your browser settings.'); }
      state = { ...fresh(), projects: [blankProject('My project')] }; save(); screen = 'Home'; render(); toast('Demo data cleared. Start with a blank project.');
    } else if (action === 'dark' || action === 'light') { setTheme(action); save(); }
    else if (action === 'close') $('dialog').close();
    else if (action === 'menu') $('sidebar').classList.toggle('open');
    else if (action === 'panel') $('panel').classList.toggle(innerWidth <= 1150 ? 'open' : 'collapsed');
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.view) { screen = target.dataset.view === 'My Prism' ? 'Home' : target.dataset.view; render(); }
    else if (target.dataset.project !== undefined) {
      state.active = Number(target.dataset.project); screen = 'Projects'; save();
      if ($('dialog').open) $('dialog').close();
      render();
    }
    else if (target.dataset.tab) { panelTab = target.dataset.tab; renderPanel(); }
    else if (target.dataset.mode) {
      mode = target.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach((item) => {
        item.classList.toggle('active', item === target);
        item.setAttribute('aria-pressed', String(item === target));
      });
    }
    else if (target.dataset.task !== undefined) {
      current().tasks[Number(target.dataset.task)].done = !current().tasks[Number(target.dataset.task)].done;
      save(); renderPanel();
    } else if (target.dataset.action === 'removeTask') {
      current().tasks.splice(Number(target.dataset.index), 1); save(); renderPanel();
    }     else if (target.dataset.action) handleAction(target.dataset.action === 'newproject' ? 'newProject' : target.dataset.action);
  });

  document.addEventListener('submit', (event) => {
    if (event.target.id === 'perspectiveForm') {
      event.preventDefault();
      const question = $('perspectiveQuestion').value.trim();
      if (!question) return toast('Enter a question or decision first.');
      const selected = Array.from(document.querySelectorAll('input[data-perspective]:checked'))
        .map((input) => input.dataset.perspective)
        .filter((name) => Object.prototype.hasOwnProperty.call(perspectiveLenses, name));
      if (selected.length < 2) return toast('Choose at least two perspectives to compare.');
      perspectiveQuestion = question;
      selectedPerspectives = selected;
      perspectiveResult = buildPerspectiveBrief(question, selected);
      perspectiveSaved = false;
      render();
      $('announce').textContent = `Perspective brief built with ${selected.length} lenses.`;
      return;
    }
    if (event.target.id === 'taskForm') {
      event.preventDefault();
      const input = $('taskText');
      if (input.value.trim() && current().tasks.length >= 300) return toast('A project can contain at most 300 tasks.');
      if (input.value.trim()) current().tasks.push({ id: `task-${Date.now()}`, text: input.value.trim(), done: false });
      save(); renderPanel();
    }
  });
  document.addEventListener('change', (event) => {
    if (event.target.id === 'ollamaModel') {
      aiConfig.model = event.target.value;
      saveAIConfig();
      updateAIChrome();
      return;
    }
    if (event.target.dataset.perspective !== undefined) {
      selectedPerspectives = Array.from(document.querySelectorAll('input[data-perspective]:checked'))
        .map((input) => input.dataset.perspective)
        .filter((name) => Object.prototype.hasOwnProperty.call(perspectiveLenses, name));
      perspectiveResult = null;
      perspectiveSaved = false;
      const output = $('perspectiveOutput');
      if (output) output.textContent = 'Perspective selection changed. Build a new brief to refresh the comparison.';
      return;
    }
    if (event.target.dataset.task === undefined) return;
    const index = Number(event.target.dataset.task);
    if (!Number.isInteger(index) || !current().tasks[index]) return;
    current().tasks[index].done = event.target.checked;
    save();
    renderPanel();
  });

  document.addEventListener('input', (event) => {
    if (event.target.id === 'perspectiveQuestion') {
      perspectiveQuestion = event.target.value;
      if (perspectiveResult) {
        perspectiveResult = null;
        perspectiveSaved = false;
        const output = $('perspectiveOutput');
        if (output) output.textContent = 'Your question changed. Build a new brief to refresh the comparison.';
      }
    }
    if (event.target.id === 'draftEditor') {
      current().draft = event.target.value; save();
      const count = document.querySelector('#view .tiny');
      if (count) count.textContent = `${wordCount(event.target.value)} words · Changes remain on this device.`;
    }
    if (event.target.id === 'projectSearch') searchProjects(event.target.value);
  });

  $('composer').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (aiBusy) return;
    const text = $('input').value.trim();
    if (!text) return;
    if (text.length > 10000) return toast('Messages are limited to 10,000 characters.');
    await submitChat(text);
  });
  $('jsonFile').addEventListener('change', async (event) => {
    try { await importProject(event.target.files[0]); }
    catch (error) { toast(`Import failed: ${error.message}`); }
    event.target.value = '';
  });
  $('input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault(); $('composer').requestSubmit();
    }
  });
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); handleAction('search');
    }
    if (event.key === 'Escape') $('sidebar').classList.remove('open');
  });

  load();
  loadAIConfig();
  render();
  if (aiConfig.enabled) connectAI(true);
})();
