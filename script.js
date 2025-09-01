async function loadDeck() {
  const res = await fetch('cards/');
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('a'))
    .map(a => a.getAttribute('href'))
    .filter(h => h && /\.(png|jpe?g|gif|svg)$/i.test(h))
    .map(name => `cards/${name}`);
}

function draw(deck, count = 5) {
  const pool = [...deck];
  pool.sort(() => Math.random() - 0.5);
  return pool.slice(0, Math.min(count, pool.length));
}

function render(selection) {
  const container = document.getElementById('cards');
  container.innerHTML = '';
  selection.forEach(src => {
    const div = document.createElement('div');
    div.className = 'card';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Tarot card';
    div.appendChild(img);
    container.appendChild(div);
  });
}

async function setup() {
  const deck = await loadDeck();
  document.getElementById('draw').addEventListener('click', () => {
    render(draw(deck));
  });
}

setup();
