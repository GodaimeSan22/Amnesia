async function loadCards() {
  const response = await fetch('cards.json');
  return response.json();
}

function draw(cards, count = 3) {
  const deck = [...cards];
  deck.sort(() => Math.random() - 0.5);
  return deck.slice(0, count);
}

function render(selection) {
  const container = document.getElementById('cards');
  container.innerHTML = '';
  selection.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    const title = document.createElement('p');
    title.textContent = card.name;
    div.appendChild(img);
    div.appendChild(title);
    container.appendChild(div);
  });
}

document.getElementById('draw').addEventListener('click', async () => {
  const cards = await loadCards();
  const selection = draw(cards);
  render(selection);
});
