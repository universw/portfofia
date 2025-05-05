// Load language from dropdown or saved preference
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  document.getElementById('lang-switcher').value = savedLang;
  loadLanguage(savedLang);
});

// Listen for language switch
document.getElementById('lang-switcher').addEventListener('change', function () {
  const lang = this.value;
  localStorage.setItem('preferredLanguage', lang);
  loadLanguage(lang);
});

// Load JSON language file
function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Language file not found.');
      }
      return response.json();
    })
    .then((translations) => {
      applyTranslations(translations);
    })
    .catch((error) => {
      console.error('Error loading language:', error);
    });
}

// Apply translations
function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      // Handle input placeholders
      if (element.placeholder !== undefined && element.tagName === 'INPUT') {
        element.placeholder = translations[key];
      } else {
        element.innerHTML = translations[key];
      }
    } else {
      console.warn(`Missing translation for: ${key}`);
    }
  });

  // Also update page title if key exists
  if (translations['site_title']) {
    document.title = translations['site_title'];
  }
}