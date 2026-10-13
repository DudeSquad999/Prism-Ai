const bootScreen = document.querySelector('#boot-screen');
const commandCenter = document.querySelector('#command-center');
const bootMessage = document.querySelector('#boot-message');
const bootProgress = document.querySelector('#boot-progress-bar');
const skipIntro = document.querySelector('#skip-intro');
const moduleCards = [...document.querySelectorAll('.module-card')];
const responseCards = [...document.querySelectorAll('.response-card')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const activeCount = document.querySelector('#active-count');
const activityMeter = document.querySelector('#activity-meter');
const coreMode = document.querySelector('#core-mode');
const synthesisStatus = document.querySelector('#synthesis-status');
const runComparison = document.querySelector('#run-comparison');
const liveStatus = document.querySelector('#live-status');
const promptInput = document.querySelector('#prompt');
const demoQuery = document.querySelector('#demo-query');
const emptySelection = document.querySelector('#empty-selection');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const INTRO_SEEN_KEY = 'prism-demo-intro-seen';
const runButtonLabel = runComparison.innerHTML;

let introComplete = false;
let introTimers = [];

function rememberIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Storage can be unavailable for file:// pages or private windows.
  }
}

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function finishIntro() {
  if (introComplete) return;
  introComplete = true;
  introTimers.forEach(clearTimeout);
  introTimers = [];
  rememberIntroSeen();
  document.removeEventListener('keydown', handleIntroKey);
  bootScreen.classList.add('complete');
  commandCenter.classList.add('ready');
  bootScreen.addEventListener('transitionend', () => bootScreen.remove(), { once: true });
  setTimeout(() => bootScreen.isConnected && bootScreen.remove(), 800);
}

function handleIntroKey(event) {
  if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    finishIntro();
  }
}

function runIntro() {
  if (reducedMotion.matches || introAlreadySeen()) {
    finishIntro();
    return;
  }

  document.addEventListener('keydown', handleIntroKey);

  const steps = [
    ['Loading local demonstration...', 0.3],
    ['Preparing perspective modules...', 0.6],
    ['Verifying offline mode...', 0.85],
    ['Prism interface ready.', 1]
  ];
  const stepDelay = 380;

  steps.forEach(([message, progress], index) => {
    introTimers.push(setTimeout(() => {
      bootMessage.textContent = message;
      bootProgress.style.transform = `scaleX(${progress})`;
      if (index === steps.length - 1) introTimers.push(setTimeout(finishIntro, 420));
    }, index * stepDelay));
  });
}

function getActiveModules() {
  return moduleCards.filter((card) => card.getAttribute('aria-pressed') === 'true');
}

function replayReveal(card, delay = 0) {
  card.classList.remove('revealing');
  if (reducedMotion.matches) return;
  // Force a reflow so the animation restarts even if the class was just removed.
  void card.offsetWidth;
  card.style.animationDelay = `${delay}ms`;
  card.classList.add('revealing');
}

function updateModules() {
  const selected = getActiveModules();
  const count = selected.length;

  moduleCards.forEach((card) => {
    const isActive = card.getAttribute('aria-pressed') === 'true';
    card.classList.toggle('active', isActive);
    card.querySelector('.module-state').textContent = isActive ? 'Selected' : 'Not selected';
  });

  responseCards.forEach((card) => {
    const isActive = selected.some((module) => module.dataset.module === card.dataset.response);
    const wasHidden = card.hidden;
    card.hidden = !isActive;
    card.classList.toggle('hidden', !isActive);
    if (isActive && wasHidden) replayReveal(card);
  });

  activeCount.textContent = count;
  activityMeter.style.transform = `scaleX(${count / moduleCards.length})`;
  activityMeter.parentElement.setAttribute('aria-label', `${count} of ${moduleCards.length} perspective modules selected`);
  coreMode.textContent = count ? `${count} selected` : 'None selected';
  emptySelection.hidden = count > 0;
  runComparison.disabled = count === 0;
  synthesisStatus.textContent = 'Fixed example';
}

function showExamples() {
  const count = getActiveModules().length;
  if (count === 0 || runComparison.disabled) return;
  const question = promptInput.value.trim();
  demoQuery.hidden = false;
  demoQuery.textContent = question
    ? `Question entered (display only): “${question}”`
    : 'No question entered. The prewritten examples below are unchanged.';
  coreMode.textContent = 'Showing examples';
  runComparison.disabled = true;
  runComparison.textContent = 'Showing examples...';
  liveStatus.textContent = `Showing prewritten examples for ${count} selected perspective modules. Your question is not sent to a model or used to change the examples.`;

  document.querySelector('#comparison').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });

  setTimeout(() => {
    responseCards
      .filter((card) => !card.hidden)
      .forEach((card, index) => replayReveal(card, index * 90));
    const currentCount = getActiveModules().length;
    coreMode.textContent = currentCount ? `${currentCount} selected` : 'None selected';
    runComparison.disabled = currentCount === 0;
    runComparison.innerHTML = runButtonLabel;
  }, reducedMotion.matches ? 0 : 300);
}

function setActiveNav(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function watchSections() {
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (sections.length === 0) return;

  let scheduled = false;
  const update = () => {
    scheduled = false;
    const marker = window.innerHeight * 0.35;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) current = section;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    setActiveNav(current.id);
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  update();
}

moduleCards.forEach((card) => {
  card.addEventListener('click', () => {
    const pressed = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', String(!pressed));
    updateModules();
  });
});

responseCards.forEach((card) => {
  card.addEventListener('animationend', () => {
    card.style.animationDelay = '';
  });
});

runComparison.addEventListener('click', showExamples);
promptInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    showExamples();
  }
});

skipIntro.addEventListener('click', finishIntro);
updateModules();
watchSections();
runIntro();
