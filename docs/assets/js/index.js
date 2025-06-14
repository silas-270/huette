function addRow(text1, text2, text3, text4) {
  const container = document.getElementById('container');
  const row = document.createElement('div');
  row.className = 'row';

  const texts = [text1, text2, text3, text4];

  texts.forEach((text, index) => {
    const cell = document.createElement('div');
    cell.className = `cell flex-${index + 1}`;
    cell.innerHTML = formatText(text);
    row.appendChild(cell);
  });

  container.insertBefore(row, container.firstChild);
}

function clearRows() {
  const container = document.getElementById('container');
  const rows = container.querySelectorAll('.row');
  rows.forEach(row => row.remove());
}

// Neues Feld hinzufügen
function autoResizeAllInRow(textarea) {
  const row = textarea.closest('.input-row');
  row.querySelectorAll('textarea').forEach(ta => {
    ta.style.height = '0px';
    ta.style.height = ta.scrollHeight + 'px';
  });
}

function showInputRow() {
  const addButton = document.getElementById('add-button');
  const parent    = addButton.parentNode;
  const nextEl    = addButton.nextSibling;

  // 1) Verstecke den Add-Button sofort
  addButton.style.display = 'none';

  // 2) Baue den Input-Container mit Pop-In
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container pop-in';

  // 2a) Die Zeile mit 4 Textareas
  const inputRow = document.createElement('div');
  inputRow.className = 'row input-row';
  const placeholders = ['DD.MM.YY','Vornamen','Beschreibung','HH:MM'];
  const inputs = [];
  for (let i = 0; i < 4; i++) {
    const cell = document.createElement('div');
    cell.className = `cell flex-${i+1}`;
    const input = document.createElement('textarea');
    input.className = 'input-cell';
    input.rows = 1;
    input.placeholder = placeholders[i];
    input.addEventListener('input', () => autoResizeAllInRow(input));
    cell.appendChild(input);
    inputRow.appendChild(cell);
    inputs.push(input);
  }
  inputContainer.appendChild(inputRow);

  // 2b) Die Cancel- und Save-Buttons
  const buttonRow = document.createElement('div');
  buttonRow.className = 'button-row';
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Abbrechen';
  cancelBtn.className = 'cancel-button';
  const saveBtn   = document.createElement('button');
  saveBtn.textContent = 'Speichern';
  saveBtn.className   = 'save-button';
  buttonRow.append(cancelBtn, saveBtn);
  inputContainer.appendChild(buttonRow);

  // 3) Füge den Container direkt hinter den Add-Button ein
  parent.insertBefore(inputContainer, nextEl);

  // 4) Pop-In abschließen
  inputContainer.addEventListener('animationend', function handler(e) {
    if (e.animationName === 'pop-in') {
      inputContainer.classList.remove('pop-in');
      inputContainer.removeEventListener('animationend', handler);
    }
  });
  inputRow.querySelectorAll('textarea').forEach(autoResizeAllInRow);

  // 5) Close-Funktion
  function close() {
    // Pop-Out-Animation
    inputContainer.classList.add('pop-out');
    inputContainer.addEventListener('animationend', function handler2(e) {
      if (e.animationName === 'pop-out') {
        // 5a) Container entfernen
        inputContainer.remove();
        inputContainer.removeEventListener('animationend', handler2);
        // 5b) Add-Button wieder einblenden + Pop-In
        addButton.style.display = 'block';
        addButton.classList.add('pop-in');
        addButton.addEventListener('animationend', function handler3(e) {
          if (e.animationName === 'pop-in') {
            addButton.classList.remove('pop-in');
            addButton.removeEventListener('animationend', handler3);
          }
        });
      }
    });
  }

  // 6) Buttons verknüpfen
  cancelBtn.addEventListener('click', close);
  saveBtn.addEventListener('click', () => {
    const values = inputs.map(i => i.value.trim());

    if (!isValidDateFormat(values[0])) {
      showNotification('error', 'Bitte gib ein gültiges Datum im Format TT.MM.JJ ein.');
      return;
    }
    if (!isValidFlexibleTimeFormat(values[3])) {
      showNotification('error', 'Bitte gib eine gültige Zeit im Format HH:MM ein.');
      return;
    }

    sendData(values);
    showNotification('success', 'Eintrag erfolgreich hinzugefügt.');
    close();
  });
}

function isValidDateFormat(dateStr) {
  return /^\d{2}\.\d{2}\.\d{2}$/.test(dateStr);
}

function isValidFlexibleTimeFormat(timeStr) {
  return /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr);
}

// Parsen des Datumstrings in ISO 8601-DATE-String
function parseDateStringToISO(dateStr) {
  // Erwartetes Format: DD.MM.YY
  const [day, month, year] = dateStr.split('.');

  const date = "20" + year + '-' + month + '-' + day;
  return date; // Rückgabe im Format YYYY-MM-DD
}

function normalizeTimeFormat(timeStr) {
  if (!isValidFlexibleTimeFormat(timeStr)) {
    throw new Error("Ungültiges Zeitformat");
  }

  const [h, m] = timeStr.split(':');
  const hour = h.padStart(2, '0'); // Normalisiert z.B. 2 => 02
  return `${hour}:${m}`;
}