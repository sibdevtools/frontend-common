const STORAGE_KEY = 'table-state';

export interface TableState {
  filters: Record<string, string>;
  sort?: {
    column: string;
    direction: 'asc' | 'desc';
  };
}

export const loadTableState = (tableId: string): TableState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { filters: {} };

    const allStates = JSON.parse(stored);
    return allStates[tableId] || { filters: {} };
  } catch (e) {
    console.error('Error loading table state:', e);
    return { filters: {} };
  }
};

export const saveTableState = (tableId: string, state: TableState) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allStates = stored ? JSON.parse(stored) : {};

    allStates[tableId] = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allStates));
  } catch (e) {
    console.error('Error saving table state:', e);
  }
};
