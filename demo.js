'use strict';

(() => {
  const $ = (id) => document.getElementById(id);
  const storageKey = 'prism-browser-demo-v2';
  const maxFileSize = 1024 * 1024;
  const views = ['Home', 'Chat', 'Projects', 'Library', 'Settings'];
  const taskIdeas = ['Define the question', 'Review the sample outline', 'Revise the draft'];
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
  let screen = 'Home';
  let mode = 'Ask';
  let panelTab = 'Tasks';
  let toastTimer;
  let storageWarning = '';

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
    return {
      version: 2,
      projects: value.projects.map(validateProject),
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
    if (label) label.textContent = storageWarning || 'Saved only in this browser. Nothing is uploaded.';
    const settingsLabel = $('settingsPrivacyStatus');
    if (settingsLabel) settingsLabel.textContent = storageWarning || 'Saved only in this browser. Nothing is uploaded.';
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
      html = `<h1>Explore Prism AI’s research and writing workspace.</h1>
      <p>Try a sample research project, edit a Markdown draft, and see how Prism keeps your work together. No install or account needed.</p>
      <div class="notice">Demo only: chat replies and source cards are examples, not live AI or research. Your work saves in this browser and is not uploaded.</div>
      <div class="toolbar">${button('Try a sample conversation', 'sample', 'class="primary"')}${button('Share the demo', 'share')}${button('New project', 'newProject')}${button('Edit the draft', 'draft')}<a class="button-link" href="https://github.com/DudeSquad999/Prism-Ai/releases/latest">Get Prism for Windows</a></div>
      <div class="grid"><article class="card"><h2>${esc(project.name)}</h2><p>${project.messages.length} messages · ${project.tasks.filter((task) => task.done).length}/${project.tasks.length} tasks complete</p>${button('Open project', 'projects')}</article><article class="card"><h2>Continue writing</h2><p>${wordCount(project.draft)} words in your Markdown draft.</p>${button('Open Library', 'draft')}</article></div>`;
    } else if (screen === 'Chat') {
      html = project.messages.length ? project.messages.map((message) =>
        `<article class="message ${message.role === 'You' ? 'user' : ''}"><div class="who">${esc(message.role)}</div><div class="body">${esc(message.text)}</div></article>`
      ).join('') : `<div class="page"><h1>What are you working on?</h1><p>Try a sample prompt to see how a research conversation might fit into a project. Replies are scripted examples; nothing leaves this browser.</p><div class="grid">${button('Plan a research question', 'sample', 'class="primary"')}${button('Draft an outline', 'createDraft')}</div></div>`;
    } else if (screen === 'Projects') {
      html = `<h1>Projects</h1><p>Create projects and switch between their conversations, tasks, sample source cards, and drafts.</p><div class="toolbar">${button('New project', 'newProject', 'class="primary"')}${button('Rename this project', 'renameProject')}${button('Delete this project', 'deleteProject')}</div><div class="grid">${state.projects.map((item, index) => `<article class="card"><h2>${esc(item.name)}</h2><p>${item.messages.length} messages · ${item.tasks.length} tasks · ${wordCount(item.draft)} draft words</p><button data-project="${index}">${index === state.active ? 'Current project' : 'Open project'}</button></article>`).join('')}</div>`;
    } else if (screen === 'Library') {
      html = `<h1>Draft library</h1><p>${esc(project.name)} · Markdown is editable and auto-saved in this browser.</p><div class="toolbar">${button('Download Markdown', 'exportDraft', 'class="primary"')}${button('Download conversation', 'exportChat')}</div><label class="field" for="draftEditor">Working draft</label><textarea id="draftEditor" class="editor" maxlength="20000" spellcheck="true">${esc(project.draft)}</textarea><p class="tiny">${wordCount(project.draft)} words · Changes remain on this device.</p>`;
    } else {
      html = `<h1>Demo settings</h1><p>Local browser data and appearance.</p><div class="card"><p id="settingsPrivacyStatus"></p><div class="toolbar">${button('Export projects (JSON)', 'exportJSON')}${button('Import projects (JSON)', 'importJSON')}</div><div class="toolbar">${button('Restore fictional sample', 'restoreSample')}${button('Clear all data', 'clearData', 'class="danger"')}${button('Dark theme', 'dark')}${button('Light theme', 'light')}</div><p class="tiny">Import accepts Prism demo JSON exports only (1 MB maximum). Credentials and unknown fields are rejected. Clearing data cannot be undone.</p></div>`;
    }
    $('view').innerHTML = screen === 'Chat' ? html : `<div class="page">${html}</div>`;
    $('modes').innerHTML = ['Ask', 'Research', 'Documents', 'Create'].map((name) =>
      `<button data-mode="${name}" class="${mode === name ? 'active' : ''}" aria-pressed="${mode === name}">${name}</button>`
    ).join('');
    renderPanel();
    updatePrivacy();
    if (screen === 'Chat') $('view').scrollTop = $('view').scrollHeight;
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
    if (action === 'newProject') projectForm();
    else if (action === 'newchat') {
      if (project.messages.length && !confirm('Start a new chat and remove this project’s current conversation?')) return;
      project.messages = []; save(); screen = 'Chat'; render();
    }     else if (action === 'search') {
      showDialog('Search projects', '<label class="field" for="projectSearch">Project name<input id="projectSearch" type="search" autocomplete="off"></label><div id="projectSearchResults" class="results"></div>');
      searchProjects();
      $('projectSearch').focus();
    }
    else if (action === 'privacy') {
      showDialog('Browser demo privacy', 'This demo has no backend and does not send prompts, projects, drafts, or imports anywhere. Data is saved in this browser only. Chat replies and source cards are fictional examples; no AI or web search is connected.');
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
    if (event.target.id === 'taskForm') {
      event.preventDefault();
      const input = $('taskText');
      if (input.value.trim() && current().tasks.length >= 300) return toast('A project can contain at most 300 tasks.');
      if (input.value.trim()) current().tasks.push({ id: `task-${Date.now()}`, text: input.value.trim(), done: false });
      save(); renderPanel();
    }
  });
  document.addEventListener('change', (event) => {
    if (event.target.dataset.task === undefined) return;
    const index = Number(event.target.dataset.task);
    if (!Number.isInteger(index) || !current().tasks[index]) return;
    current().tasks[index].done = event.target.checked;
    save();
    renderPanel();
  });

  document.addEventListener('input', (event) => {
    if (event.target.id === 'draftEditor') {
      current().draft = event.target.value; save();
      const count = document.querySelector('#view .tiny');
      if (count) count.textContent = `${wordCount(event.target.value)} words · Changes remain on this device.`;
    }
    if (event.target.id === 'projectSearch') searchProjects(event.target.value);
  });

  $('composer').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = $('input').value.trim();
    if (!text) return;
    if (text.length > 10000) return toast('Messages are limited to 10,000 characters.');
    current().messages.push({ role: 'You', text }, { role: 'Prism · scripted example', text: reply(text) });
    if (mode === 'Create') current().draft = reply(text);
    $('input').value = ''; save(); screen = 'Chat'; render();
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
  render();
})();
