export interface CodePaste {
  id: string;
  code: string;
  language: string;
  title: string;
  timestamp: number;
}

const STORAGE_KEY = "codeshare_pastes";
const MAX_PASTES = 50;

export const savePaste = (paste: Omit<CodePaste, "id" | "timestamp">): CodePaste => {
  const pastes = getPastes();
  const newPaste: CodePaste = {
    ...paste,
    id: Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
  };
  
  const updatedPastes = [newPaste, ...pastes].slice(0, MAX_PASTES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPastes));
  
  return newPaste;
};

export const getPastes = (): CodePaste[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getPasteById = (id: string): CodePaste | undefined => {
  const pastes = getPastes();
  return pastes.find((p) => p.id === id);
};

export const deletePaste = (id: string): void => {
  const pastes = getPastes();
  const filtered = pastes.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearAllPastes = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
