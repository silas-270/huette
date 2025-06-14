function showNotification(type, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.classList.add('toast', type); // 'success' oder 'error'
  toast.textContent = message;

  container.appendChild(toast);

  // Nach 3 Sekunden entfernen
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function formatText(text) {
  // Escapen (für Sicherheit)
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    // Fettschrift für *text*
    .replace(/\*([^\*]+)\*/g, '<strong>$1</strong>')
    // Aufzählung: Zeilenumbruch + - Text → Bullet Point
    .replace(/\n- (.+)/g, '\n• $1')
    // Zeilenumbrüche als sichtbare <br>
    .replace(/\n/g, '<br>');
}

// Sendet vier Strings an die API.
async function sendData (inputs) {
  inputs[0] = parseDateStringToISO(inputs[0]);
  inputs[3] = normalizeTimeFormat(inputs[3]);

  console.log('Eingegebene Daten:', inputs);

  // Senden
  try {
    const payload = { date: inputs[0], text1: inputs[1], text2: inputs[2], text3: inputs[3] };
    const res = await fetch(CONFIG.APIURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Server-Error: ${err}`);
    }
    
    const result = await res.json();
    console.log('Erfolg:', result);
    // Aktualisieren der Aufrufe
    fetchAllData();
  } catch (e) {
    console.error('Fehler beim Senden:', e);
  }
}

// Holt alle gespeicherten Einträge von der API und zeigt sie an.
async function fetchAllData() {
  try {
    const res = await fetch(CONFIG.APIURL);

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Server-Error: ${err}`);
    }

    const data = await res.json();
    console.log('Empfangene Daten:', data);

    clearRows();
    data.forEach(entry => {
      const formattedDate = `${entry.date.slice(8,10)}.${entry.date.slice(5,7)}.${entry.date.slice(2,4)}`;
      addRow(formattedDate, entry.person, entry.task, entry.time);
    });

  } catch (e) {
    console.error('Fehler beim Abrufen:', e);
  }
}

// Initialer Aufruf
fetchAllData();