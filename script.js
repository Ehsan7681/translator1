// DOM Elements
const sourceText = document.getElementById('source-text');
const toneSelect = document.getElementById('tone-select');
const targetLang = document.getElementById('target-lang');
const translateBtn = document.getElementById('translate-btn');
const translatedText = document.getElementById('translated-text');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');
const apiKeyInput = document.getElementById('api-key');
const saveKeyBtn = document.getElementById('save-key-btn');
const modelSelect = document.getElementById('model-select');
const langToggleMain = document.getElementById('lang-toggle-main');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const themeSelect = document.getElementById('theme-select');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const historyTitle = document.getElementById('history-title');

// Translation tones descriptions
const translationTones = {
    1: "Formal tone: Use formal language, proper grammar, and sophisticated vocabulary.",
    2: "Casual tone: Use informal language, contractions, and conversational style.",
    3: "Professional tone: Use business-appropriate language, clear and concise.",
    4: "Friendly tone: Use warm, approachable language with positive expressions.",
    5: "Academic tone: Use scholarly language, complex sentence structures, and formal vocabulary.",
    6: "Technical tone: Use specialized terminology, precise language, and technical jargon.",
    7: "Creative tone: Use imaginative language, figurative expressions, and artistic style.",
    8: "Humorous tone: Use witty language, jokes, and playful expressions.",
    9: "Sarcastic tone: Use ironic language with mocking or scornful intent.",
    10: "Poetic tone: Use lyrical language, metaphors, and rhythmic expressions.",
    11: "Business tone: Use corporate language, professional terminology, and persuasive style.",
    12: "Medical tone: Use medical terminology, clinical language, and precise descriptions.",
    13: "Legal tone: Use legal terminology, formal language, and precise wording.",
    14: "Youth Slang: Use modern slang, informal expressions, and trendy language.",
    15: "Elderly Style: Use traditional expressions, formal language, and old-fashioned terms.",
    16: "Shakespearean: Use Elizabethan English, archaic vocabulary, and poetic structure.",
    17: "Pirate: Use pirate jargon, nautical terms, and adventurous expressions.",
    18: "Robot: Use mechanical language, repetitive patterns, and digital expressions.",
    19: "Fantasy: Use mythical language, magical terms, and epic storytelling style.",
    20: "Sci-Fi: Use futuristic language, technological terms, and space-age expressions.",
    21: "Educational tone: Use clear, informative language suitable for teaching and learning purposes."
};

// UI texts for both languages
const uiTexts = {
    en: {
        appTitle: "Smart AI Translator",
        appSubtitle: "Designed by Ehsan Shamsi",
        settingsTitle: "Settings",
        sourceTextLabel: "Text to Translate:",
        sourceTextPlaceholder: "Enter text to translate...",
        toneSelectLabel: "Translation Tone:",
        toneDefault: "Select Tone",
        tone1: "Formal",
        tone2: "Casual",
        tone3: "Professional",
        tone4: "Friendly",
        tone5: "Academic",
        tone6: "Technical",
        tone7: "Creative",
        tone8: "Humorous",
        tone9: "Sarcastic",
        tone10: "Poetic",
        tone11: "Business",
        tone12: "Medical",
        tone13: "Legal",
        tone14: "Youth Slang",
        tone15: "Elderly Style",
        tone16: "Shakespearean",
        tone17: "Pirate",
        tone18: "Robot",
        tone19: "Fantasy",
        tone20: "Sci-Fi",
        tone21: "Educational",
        targetLangLabel: "Target Language:",
        modelSelectLabel: "AI Model:",
        translateBtn: "Translate",
        translatedTextLabel: "Translated Text:",
        translatedTextPlaceholder: "Translation will appear here...",
        copyBtn: "Copy to Clipboard",
        apiKeyLabel: "OpenRouter API Key:",
        apiKeyPlaceholder: "Enter your OpenRouter API key",
        saveKeyBtn: "Save Key",
        loadingModels: "Loading models...",
        errorLoadingModels: "Error loading models",
        close: "Close"
    },
    fa: {
        appTitle: "مترجم هوشمند",
        appSubtitle: "طراحی شده توسط احسان شمسی",
        settingsTitle: "تنظیمات",
        sourceTextLabel: "متن برای ترجمه:",
        sourceTextPlaceholder: "متن خود را برای ترجمه وارد کنید...",
        toneSelectLabel: "سبک ترجمه:",
        toneDefault: "انتخاب سبک",
        tone1: "رسمی",
        tone2: "غیررسمی",
        tone3: "حرفه‌ای",
        tone4: "دوستانه",
        tone5: "دانشگاهی",
        tone6: "فنی",
        tone7: "خلاقانه",
        tone8: "طنزآمیز",
        tone9: "کنایه‌آمیز",
        tone10: "شعری",
        tone11: "تجاری",
        tone12: "پزشکی",
        tone13: "حقوقی",
        tone14: "عامیانه نوجوانان",
        tone15: "سبک سالمندان",
        tone16: "شکسپیری",
        tone17: "دزدان دریایی",
        tone18: "ربات",
        tone19: "فانتزی",
        tone20: "علمی‌تخیلی",
        tone21: "آموزشی",
        targetLangLabel: "زبان مقصد:",
        modelSelectLabel: "مدل هوش مصنوعی:",
        translateBtn: "ترجمه",
        translatedTextLabel: "متن ترجمه شده:",
        translatedTextPlaceholder: "ترجمه در اینجا نمایش داده می‌شود...",
        copyBtn: "کپی در حافظه",
        apiKeyLabel: "کلید API OpenRouter:",
        apiKeyPlaceholder: "کلید API OpenRouter خود را وارد کنید",
        saveKeyBtn: "ذخیره کلید",
        loadingModels: "در حال بارگذاری مدل‌ها...",
        errorLoadingModels: "خطا در بارگذاری مدل‌ها",
        close: "بستن"
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load all saved settings
    loadSettings();
    
    // Set up event listeners
    translateBtn.addEventListener('click', translateText);
    copyBtn.addEventListener('click', copyToClipboard);
    themeToggle.addEventListener('click', toggleTheme);
    saveKeyBtn.addEventListener('click', saveApiKey);
    langToggleMain.addEventListener('click', toggleLanguage);
    themeSelect.addEventListener('change', changeTheme);
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Set up settings panel event listeners
    settingsBtn.addEventListener('click', openSettings);
    closeSettings.addEventListener('click', closeSettingsPanel);
    
    // Close settings panel when clicking outside
    settingsPanel.addEventListener('click', (e) => {
        if (e.target === settingsPanel) {
            closeSettingsPanel();
        }
    });
    
    // Set up model change listener
    modelSelect.addEventListener('change', saveSettings);
    
    // Set up tone change listener
    toneSelect.addEventListener('change', saveSettings);
    
    // Set up target language change listener
    targetLang.addEventListener('change', saveSettings);
    
    // Load models from OpenRouter API
    loadModelsFromAPI();
    
    // Load translation history
    loadHistory();
});

// Load models from OpenRouter API
async function loadModelsFromAPI() {
    const lang = localStorage.getItem('ui-language') || 'en';
    modelSelect.innerHTML = `<option value="">${uiTexts[lang].loadingModels}</option>`;
    
    try {
        const response = await fetch('https://openrouter.ai/api/v1/models');
        if (!response.ok) {
            throw new Error('Failed to fetch models');
        }
        
        const data = await response.json();
        const models = data.data;
        
        // Clear the select
        modelSelect.innerHTML = '';
        
        // Add models to the select
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.id;
            modelSelect.appendChild(option);
        });
        
        // Load saved model or select first one
        const savedModel = localStorage.getItem('selected-model');
        if (savedModel && models.some(model => model.id === savedModel)) {
            modelSelect.value = savedModel;
        } else if (models.length > 0) {
            modelSelect.value = models[0].id;
        }
    } catch (error) {
        console.error('Error loading models:', error);
        modelSelect.innerHTML = `<option value="">${uiTexts[lang].errorLoadingModels}</option>`;
    }
}

// Load all saved settings
function loadSettings() {
    // Load saved API key
    const savedApiKey = localStorage.getItem('openrouter-api-key');
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
    }
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
    
    // Load saved UI language
    const savedLang = localStorage.getItem('ui-language') || 'en';
    if (savedLang === 'fa') {
        langToggleMain.classList.add('active');
        updateUILanguage('fa');
    } else {
        langToggleMain.classList.remove('active');
        updateUILanguage('en');
    }
    
    // Load saved tone
    const savedTone = localStorage.getItem('selected-tone');
    if (savedTone) {
        toneSelect.value = savedTone;
    }
    
    // Load saved target language
    const savedTargetLang = localStorage.getItem('target-language');
    if (savedTargetLang) {
        targetLang.value = savedTargetLang;
    }
    
    // Load saved model
    const savedModel = localStorage.getItem('selected-model');
    if (savedModel) {
        modelSelect.value = savedModel;
    }
    
    // Load saved theme
    const savedSelectedTheme = localStorage.getItem('selected-theme');
    if (savedSelectedTheme) {
        themeSelect.value = savedSelectedTheme;
        changeTheme();
    }
}

// Save all current settings
function saveSettings() {
    localStorage.setItem('selected-model', modelSelect.value);
    localStorage.setItem('selected-tone', toneSelect.value);
    localStorage.setItem('target-language', targetLang.value);
    localStorage.setItem('ui-language', langToggleMain.classList.contains('active') ? 'fa' : 'en');
}

// Toggle language
function toggleLanguage() {
    langToggleMain.classList.toggle('active');
    const lang = langToggleMain.classList.contains('active') ? 'fa' : 'en';
    updateUILanguage(lang);
    saveSettings();
}

// Update UI language
function updateUILanguage(lang) {
    // Update all text elements
    document.getElementById('app-title').textContent = uiTexts[lang].appTitle;
    document.getElementById('app-subtitle').textContent = uiTexts[lang].appSubtitle;
    document.getElementById('settings-title').textContent = uiTexts[lang].settingsTitle;
    document.getElementById('source-text-label').textContent = uiTexts[lang].sourceTextLabel;
    document.getElementById('source-text').placeholder = uiTexts[lang].sourceTextPlaceholder;
    document.getElementById('tone-select-label').textContent = uiTexts[lang].toneSelectLabel;
    document.getElementById('tone-default').textContent = uiTexts[lang].toneDefault;
    document.getElementById('tone-1').textContent = uiTexts[lang].tone1;
    document.getElementById('tone-2').textContent = uiTexts[lang].tone2;
    document.getElementById('tone-3').textContent = uiTexts[lang].tone3;
    document.getElementById('tone-4').textContent = uiTexts[lang].tone4;
    document.getElementById('tone-5').textContent = uiTexts[lang].tone5;
    document.getElementById('tone-6').textContent = uiTexts[lang].tone6;
    document.getElementById('tone-7').textContent = uiTexts[lang].tone7;
    document.getElementById('tone-8').textContent = uiTexts[lang].tone8;
    document.getElementById('tone-9').textContent = uiTexts[lang].tone9;
    document.getElementById('tone-10').textContent = uiTexts[lang].tone10;
    document.getElementById('tone-11').textContent = uiTexts[lang].tone11;
    document.getElementById('tone-12').textContent = uiTexts[lang].tone12;
    document.getElementById('tone-13').textContent = uiTexts[lang].tone13;
    document.getElementById('tone-14').textContent = uiTexts[lang].tone14;
    document.getElementById('tone-15').textContent = uiTexts[lang].tone15;
    document.getElementById('tone-16').textContent = uiTexts[lang].tone16;
    document.getElementById('tone-17').textContent = uiTexts[lang].tone17;
    document.getElementById('tone-18').textContent = uiTexts[lang].tone18;
    document.getElementById('tone-19').textContent = uiTexts[lang].tone19;
    document.getElementById('tone-20').textContent = uiTexts[lang].tone20;
    document.getElementById('tone-21').textContent = uiTexts[lang].tone21;
    document.getElementById('target-lang-label').textContent = uiTexts[lang].targetLangLabel;
    document.getElementById('model-select-label').textContent = uiTexts[lang].modelSelectLabel;
    translateBtn.textContent = uiTexts[lang].translateBtn;
    document.getElementById('translated-text-label').textContent = uiTexts[lang].translatedTextLabel;
    document.getElementById('translated-text').placeholder = uiTexts[lang].translatedTextPlaceholder;
    copyBtn.textContent = uiTexts[lang].copyBtn;
    document.getElementById('api-key-label').textContent = uiTexts[lang].apiKeyLabel;
    document.getElementById('api-key').placeholder = uiTexts[lang].apiKeyPlaceholder;
    document.getElementById('save-key-btn').textContent = uiTexts[lang].saveKeyBtn;
    closeSettings.textContent = lang === 'en' ? '×' : '×';
    
    // Apply RTL for Persian
    if (lang === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl');
    }
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Change theme
function changeTheme() {
    const selectedTheme = themeSelect.value;
    
    // Remove all theme classes
    const themes = ['midnight', 'ocean', 'sunset', 'forest', 'lavender', 'coral', 'mint', 'amber', 'indigo', 'rose', 'teal', 'slate', 'violet', 'emerald', 'cyan', 'fuchsia', 'lime', 'sky', 'stone'];
    themes.forEach(theme => {
        document.body.classList.remove(`${theme}-theme`);
    });
    
    // Add selected theme class if not default
    if (selectedTheme !== 'default') {
        document.body.classList.add(`${selectedTheme}-theme`);
    }
    
    // Save theme preference
    localStorage.setItem('selected-theme', selectedTheme);
}

// Load translation history
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('translation-history')) || [];
    renderHistory(history);
}

// Save translation to history
function saveToHistory(source, translated, tone, targetLang) {
    const history = JSON.parse(localStorage.getItem('translation-history')) || [];
    
    // Add new translation to the beginning of the array
    history.unshift({
        id: Date.now(),
        source: source,
        translated: translated,
        tone: tone,
        targetLang: targetLang,
        timestamp: new Date().toLocaleString()
    });
    
    // Keep only the last 50 translations
    if (history.length > 50) {
        history.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('translation-history', JSON.stringify(history));
    
    // Update UI
    renderHistory(history);
}

// Render history to UI
function renderHistory(history) {
    const lang = localStorage.getItem('ui-language') || 'en';
    
    // Clear history list
    historyList.innerHTML = '';
    
    // Update history title
    historyTitle.textContent = lang === 'en' ? 'Translation History' : 'تاریخچه ترجمه';
    clearHistoryBtn.textContent = lang === 'en' ? 'Clear' : 'پاک کردن';
    
    // If no history, show message
    if (history.length === 0) {
        const noHistoryMessage = document.createElement('p');
        noHistoryMessage.textContent = lang === 'en' ? 'No translation history yet.' : 'هنوز تاریخچه ترجمه‌ای وجود ندارد.';
        noHistoryMessage.style.textAlign = 'center';
        noHistoryMessage.style.opacity = '0.7';
        noHistoryMessage.style.padding = '20px';
        historyList.appendChild(noHistoryMessage);
        return;
    }
    
    // Add each history item to the list
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const toneText = document.getElementById(`tone-${item.tone}`)?.textContent || item.tone;
        
        historyItem.innerHTML = `
            <div class="history-item-header">
                <span>${item.timestamp}</span>
                <span>${toneText} → ${item.targetLang}</span>
            </div>
            <div class="history-source-text">${item.source}</div>
            <div class="history-translated-text">${item.translated}</div>
        `;
        
        historyList.appendChild(historyItem);
    });
}

// Clear history
function clearHistory() {
    const lang = localStorage.getItem('ui-language') || 'en';
    const confirmClear = lang === 'en' 
        ? confirm('Are you sure you want to clear all translation history?')
        : confirm('آیا مطمئن هستید که می‌خواهید تمام تاریخچه ترجمه را پاک کنید؟');
    
    if (confirmClear) {
        localStorage.removeItem('translation-history');
        loadHistory();
    }
}

// Save API key to localStorage
function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
        localStorage.setItem('openrouter-api-key', apiKey);
        const lang = localStorage.getItem('ui-language') || 'en';
        alert(lang === 'en' ? 'API key saved successfully!' : 'کلید API با موفقیت ذخیره شد!');
    } else {
        const lang = localStorage.getItem('ui-language') || 'en';
        alert(lang === 'en' ? 'Please enter a valid API key.' : 'لطفاً یک کلید API معتبر وارد کنید.');
    }
}

// Open settings panel
function openSettings() {
    settingsPanel.style.display = 'flex';
}

// Close settings panel
function closeSettingsPanel() {
    settingsPanel.style.display = 'none';
}

// Copy translated text to clipboard
function copyToClipboard() {
    const text = translatedText.value;
    if (text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                const lang = localStorage.getItem('ui-language') || 'en';
                const originalText = copyBtn.textContent;
                copyBtn.textContent = lang === 'en' ? 'Copied!' : 'کپی شد!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                const lang = localStorage.getItem('ui-language') || 'en';
                alert(lang === 'en' ? 'Failed to copy text to clipboard.' : 'کپی متن به حافظه ناموفق بود.');
            });
    }
}

// Translate text using OpenRouter API
async function translateText() {
    const text = sourceText.value.trim();
    const tone = toneSelect.value;
    const targetLanguage = targetLang.options[targetLang.selectedIndex].text;
    const apiKey = apiKeyInput.value.trim();
    const model = modelSelect.value;
    const lang = localStorage.getItem('ui-language') || 'en';
    
    // Validate inputs
    if (!text) {
        alert(lang === 'en' ? 'Please enter text to translate.' : 'لطفاً متنی را برای ترجمه وارد کنید.');
        return;
    }
    
    if (tone === '0') {
        alert(lang === 'en' ? 'Please select a translation tone.' : 'لطفاً یک سبک ترجمه انتخاب کنید.');
        return;
    }
    
    if (!apiKey) {
        alert(lang === 'en' ? 'Please enter your OpenRouter API key.' : 'لطفاً کلید API OpenRouter خود را وارد کنید.');
        return;
    }
    
    // Show loading state
    translateBtn.disabled = true;
    translateBtn.textContent = lang === 'en' ? 'Translating...' : 'در حال ترجمه...';
    translatedText.value = lang === 'en' ? 'Translating...' : 'در حال ترجمه...';
    
    try {
        // Get tone description
        const toneDescription = translationTones[tone];
        
        // Create prompt for translation
        const prompt = lang === 'en' 
            ? `Translate the following text to ${targetLanguage} in a ${toneDescription}. Text to translate: "${text}"`
            : `متن زیر را به زبان ${targetLanguage} با سبک ${toneDescription} ترجمه کن. متن برای ترجمه: "${text}"`;
        
        // Call OpenRouter API
        const response = await callOpenRouterAPI(prompt, apiKey, model);
        
        // Display translated text
        translatedText.value = response;
        
        // Save translation to history
        saveToHistory(text, response, tone, targetLanguage);
        
        // Save settings after successful translation
        saveSettings();
    } catch (error) {
        console.error('Translation error:', error);
        translatedText.value = lang === 'en' 
            ? `Error: ${error.message || 'Failed to translate text. Please try again.'}`
            : `خطا: ${error.message || 'ترجمه متن ناموفق بود. لطفاً دوباره تلاش کنید.'}`;
    } finally {
        // Reset button state
        translateBtn.disabled = false;
        translateBtn.textContent = lang === 'en' ? 'Translate' : 'ترجمه';
    }
}

// Call OpenRouter API
async function callOpenRouterAPI(prompt, apiKey, model) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href,
            'X-Title': 'Smart AI Translator'
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// Add keyboard shortcut for translation (Ctrl+Enter)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        translateText();
    }
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered: ', registration);
            })
            .catch(registrationError => {
                console.log('Service Worker registration failed: ', registrationError);
            });
    });
}
