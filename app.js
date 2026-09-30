const perspectiveCards = [...document.querySelectorAll('.perspective-card')];
const responseCards = [...document.querySelectorAll('[data-response]')];
const selectionCount = document.querySelector('#selection-count');
const compareButton = document.querySelector('#compare-button');
const status = document.querySelector('#demo-status');

function updateSelection() {
  const selected = perspectiveCards.filter((card) => card.getAttribute('aria-pressed') === 'true');

  perspectiveCards.forEach((card) => {
    const isSelected = card.getAttribute('aria-pressed') === 'true';
    const state = card.querySelector('.select-state');
    card.classList.toggle('is-selected', isSelected);
    state.textContent = isSelected ? 'Selected' : 'Add';
  });

  responseCards.forEach((card) => {
    const name = card.dataset.response;
    const isSelected = selected.some((selectedCard) => selectedCard.dataset.perspective === name);
    card.hidden = !isSelected;
    card.classList.toggle('is-hidden', !isSelected);
  });

  selectionCount.textContent = `${selected.length} selected`;
}

perspectiveCards.forEach((card) => {
  card.addEventListener('click', () => {
    const isSelected = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', String(!isSelected));
    updateSelection();
  });
});

compareButton.addEventListener('click', () => {
  const count = perspectiveCards.filter((card) => card.getAttribute('aria-pressed') === 'true').length;
  const comparison = document.querySelector('#comparison');
  status.textContent = `Showing ${count} prewritten demonstration perspective${count === 1 ? '' : 's'}. No prompt data was sent or stored.`;
  comparison.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

updateSelection();
