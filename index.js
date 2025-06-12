function addRow(text1, text2, text3, text4) {
  const container = document.getElementById('container');
  const row = document.createElement('div');
  row.className = 'row';

  const texts = [text1, text2, text3, text4];
  const flexRatios = [0.8, 3, 8, 0.5]; // Erste Zelle doppelt so breit wie zweite

  texts.forEach((text, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.flex = flexRatios[index]; // Individuelle Breite
    cell.textContent = text;
    row.appendChild(cell);
  });

  container.appendChild(row);
}

function handleAddClick() {
  console.log("Add-Button wurde geklickt");
  // Später kannst du hier ein Formular oder Eingabefelder anzeigen
}

// Optional: Einen ersten Balken beim Start anzeigen
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");
addRow("21.03.25", "was ", "geht ", "00:00");