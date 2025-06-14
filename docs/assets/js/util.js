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

/**
 * Sendet vier Strings an die API.
 * @param {string} dateStr  - Datumsstring im Format YYYY-MM-DD
 * @param {string} textA    - Text 1
 * @param {string} textB    - Text 2
 * @param {string} textC    - Text 3
 */
async function sendData(dateStr, textA, textB, textC) {
  try {
    const payload = { date: dateStr, text1: textA, text2: textB, text3: textC };
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
}

// Beispiel-Aufruf:
sendData('2025-06-14', 'Hallo', 'Welt', '00:00');
