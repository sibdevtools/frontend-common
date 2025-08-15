const STORAGE_KEY = 'table-filters';

export const loadTableFilters = (tableId: string): Record<string, string> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};

    const allFilters = JSON.parse(stored);
    return allFilters[tableId] || {};
  } catch (e) {
    console.error('Error loading table filters:', e);
    return {};
  }
};

export const saveTableFilters = (tableId: string, filters: Record<string, string>) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allFilters = stored ? JSON.parse(stored) : {};

    allFilters[tableId] = filters;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allFilters));
  } catch (e) {
    console.error('Error saving table filters:', e);
  }
};
