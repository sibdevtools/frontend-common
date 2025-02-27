import { Settings } from './types';
import { getDefaultSettings } from './defaults';

/**
 * Load application settings
 */
export const load = (): Settings => {
  const defaultSettings = getDefaultSettings();
  const storedSettings = localStorage.getItem('web-app-settings');

  if (!storedSettings) {
    return defaultSettings;
  }
  try {
    const parsedSettings = JSON.parse(storedSettings);
    return { ...defaultSettings, ...parsedSettings };
  } catch (e) {
    console.error('Error parsing localStorage settings:', e);
    return defaultSettings;
  }
};

/**
 * Save application settings
 * @param settings new settings
 */
export const save = (settings: Settings) => {
  localStorage.setItem('web-app-settings', JSON.stringify(settings));
};
