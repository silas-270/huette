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
  } catch (e) {
    console.error('Fehler beim Senden:', e);
  }
  //addRow(inputs[0], inputs[1], inputs[2], inputs[3]);
}