export interface Settings {
    shouldShuffle: boolean;
    enableMathJax?: boolean;
}

function loadSettings(): Settings {
    const settingsString = localStorage.getItem('settings');
    if (settingsString) {
        return JSON.parse(settingsString) as Settings;
    } else {
        return {
            shouldShuffle: true,
            enableMathJax: true
        };
    }
}

function saveSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

export { loadSettings, saveSettings };