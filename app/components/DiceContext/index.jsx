import React, { createContext, useState, useContext } from 'react';

const DiceContext = createContext();

export const DiceProvider = ({ children }) => {
  const [diceValue, setDiceValue] = useState(null);

  return (
    <DiceContext.Provider value={{ diceValue, setDiceValue }}>
      {children}
    </DiceContext.Provider>
  );
};

export const useDice = () => useContext(DiceContext);
