import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextState {
  searchContext: string; 
  setSearchContext: React.Dispatch<React.SetStateAction<string>>; 
}

export const SearchContexts = createContext<SearchContextState>({
  searchContext: '',
  setSearchContext: () => {},
});

interface SearchContextProps {
  children: ReactNode;
}

export const SearchContext: React.FC<SearchContextProps> = ({ children }) => {
  const [searchContext, setSearchContext] = useState('');

  const state: SearchContextState = { searchContext, setSearchContext };

  return (
    <SearchContexts.Provider value={state}>
      {children}
    </SearchContexts.Provider>
  );
};