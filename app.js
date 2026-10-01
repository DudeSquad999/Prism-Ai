const bootScreen = document.querySelector('#boot-screen');
const commandCenter = document.querySelector('#command-center');
const bootMessage = document.querySelector('#boot-message');
const bootProgress = document.querySelector('#boot-progress-bar');
const skipIntro = document.querySelector('#skip-intro');
const moduleCards = [...document.querySelectorAll('.module-card')];
const responseCards = [...document.querySelectorAll('.response-card')];
const activeCount = document.querySelector('#active-count');
const activityMeter = document.querySelector('#activity-meter');
const coreMode = document.querySelector('#core-mode');
const synthesisStatus = document.querySelector('#synthesis-status');
const runComparison = document.querySelector('#run-comparison');
const liveStatus = document.querySelector('#live-status');

let introComplete = false;

function finishIntro() {
  if (introComplete) return;
  introComplete = true;
  bootScreen.classList.add('complete');
  commandCenter.classList.add('ready');
  setTimeout(() => bootScreen.remove(), 700);
}

function runIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishIntro();
    return;
  }

  const steps = [
    ['Loading local demonstration...', '28%'],
    ['Preparing perspective modules...', '56%'],
    ['Verifying offline mode...', '78%'],
    ['Prism interface ready.', '100%']
  ];

  steps.forEach(([message, progress], index) => {
    setTimeout(() => {
      bootMessage.textContent = message;
      bootProgress.style.width = progress;
      if (index === steps.length - 1) setTimeout(finishIntro, 650);
    }, index * 620);
  });
}

function getActiveModules() {
  return moduleCards.filter((card) => card.getAttribute('aria-pressed') === 'true');
}

function updateModules() {
  const selected = getActiveModules();
  const count = selected.length;

  moduleCards.forEach((card) => {
    const isActive = card.getAttribute('aria-pressed') === 'true';
    card.classList.toggle('active', isActive);
    card.querySelector('.module-state').textContent = isActive ? 'Online' : 'Offline';
  });

  responseCards.forEach((card) => {
    const isActive = selected.some((module) => module.dataset.module === card.dataset.response);
    card.hidden = !isActive;
    card.classList.toggle('hidden', !isActive);
  });

  activeCount.textContent = count;
  activityMeter.style.width = `${count * 25}%`;
  activityMeter.parentElement.setAttribute('aria-label', `${count} of 4 perspective modules active`);
  coreMode.textContent = count ? `${count} active` : 'Standby';
  synthesisStatus.textContent = `${count} module${count === 1 ? '' : 's'} reviewed`;
}

moduleCards.forEach((card) => {
  card.addEventListener('click', () => {
    const pressed = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', String(!pressed));
    updateModules();
  });
});

runComparison.addEventListener('click', () => {
  const count = getActiveModules().length;
  const visibleCards = responseCards.filter((card) => !card.hidden);
  coreMode.textContent = 'Scanning';
  runComparison.disabled = true;
  runComparison.textContent = 'Running local scan...';
  liveStatus.textContent = `Running a local demonstration with ${count} selected perspective modules. No prompt data is sent or stored.`;

  visibleCards.forEach((card) => card.classList.remove('revealing'));

  setTimeout(() => {
    visibleCards.forEach((card, index) => {
      setTimeout(() => card.classList.add('revealing'), index * 140);
    });
    coreMode.textContent = count ? `${count} active` : 'Standby';
    runComparison.disabled = false;
    runComparison.innerHTML = '<span aria-hidden="true">◈</span> Run local comparison';
    document.querySelector('#comparison').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }, 700);
});

skipIntro.addEventListener('click', finishIntro);
updateModules();
runIntro();