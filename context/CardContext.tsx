// CardContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { Cards } from "@/utils/types";

type CardContextType = {
  cards: Cards[];
  getAllCards: () => Promise<Cards[]>;
  addCard: (name: string, amount: number, number: string, type: string) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Cards[]>([]);
  const db = useSQLiteContext();

  const addCard = async (
    name: string,
    amount: number,
    number: string,
    type: string
  ) => {
    try {
      await db.runAsync(
        `INSERT INTO Cards (name, amount, number, type) VALUES (?, ?, ?, ?)`,
        [name, amount, number, type]
      );
      console.log("Card added successfully");
    } catch (error) {
      console.error("Error adding card: ", error);
    }
  };

  const getAllCards = async () => {
    try {
      const cardsResult = await db.getAllAsync<Cards>(`SELECT * FROM Cards;`);
      setCards(cardsResult);
      return cardsResult;
    } catch (error) {
      console.error("Error fetching cards: ", error);
      return [];
    }
  };

  useEffect(() => {
    getAllCards(); // Fetch cards on component mount
  }, []);

  return (
    <CardContext.Provider
      value={{
        cards,
        getAllCards,
        addCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};
