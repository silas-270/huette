function addRow(text1, text2, text3, text4) {
  const container = document.getElementById('container');
  const row = document.createElement('div');
  row.className = 'row';

  const texts = [text1, text2, text3, text4];

  texts.forEach((text, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.flex = CONFIG.ratios[index]; // Individuelle Breite
    cell.textContent = text;
    row.appendChild(cell);
  });

  container.appendChild(row);
}

function handleAddClick() {
  showInputRow();
}

// Neues Feld hinzufügen
function autoResizeTextarea(textarea) {
  textarea.style.height = 'auto'; // Zurücksetzen
  textarea.style.height = textarea.scrollHeight + 'px'; // Neue Höhe setzen
}

function showInputRow() {
  const addButton = document.getElementById('add-button');

  const inputRow = document.createElement('div');
  inputRow.className = 'row input-row';

  const ratios = getComputedStyle(document.documentElement)
    .getPropertyValue('--column-flex-ratios')
    .trim()
    .split(' ')
    .map(Number);

  for (let i = 0; i < 4; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.flex = CONFIG.ratios[i];

    const input = document.createElement('textarea');
    input.className = 'input-cell';
    input.rows = 1;

    // Auto-resize beim Input
    input.addEventListener('input', () => autoResizeTextarea(input));

    cell.appendChild(input);
    inputRow.appendChild(cell);
  }

  // Ersetze den Button durch die neue Eingabezeile
  addButton.replaceWith(inputRow);

  // Jetzt alle Textareas im neuen Row initial anpassen
  inputRow.querySelectorAll('textarea').forEach(autoResizeTextarea);
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