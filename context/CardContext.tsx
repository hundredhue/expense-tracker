// CardContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { Cards } from "@/utils/types";

type CardContextType = {
  cards: Cards[];
  getAllCards: () => Promise<Cards[]>;
  addCard: (name: string, amount: number, number: string, type: string) => void;
  removeCard: (id: number) => void;
  updateCard: (id: number, newData: Partial<Cards>) => void;
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
    type: any
  ) => {
    try {
      await db.runAsync(
        `INSERT INTO Cards (name, amount, number, type) VALUES (?, ?, ?, ?)`,
        [name, amount, number, type]
      );
      // Update local state to reflect the new card
      setCards([
        ...cards,
        { id: cards.length + 1, name, amount, number, type },
      ]);
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

  const removeCard = async (id: number) => {
    try {
      // Delete transactions associated with the card
      await db.runAsync(`DELETE FROM Transactions WHERE card_id = ?`, [id]);
      await db.runAsync(`DELETE FROM Cards WHERE id = ?`, [id]);
      const updatedCards = cards.filter((card) => card.id !== id);
      setCards(updatedCards);
      console.log("Card removed successfully");
    } catch (error) {
      console.error("Error removing card: ", error);
    }
  };

  const updateCard = async (id: number, newData: Partial<Cards>) => {
    try {
      const currentCard = cards.find((card) => card.id === id);
      if (!currentCard) {
        throw new Error(`Card with id ${id} not found.`);
      }

      const { name, amount, number, type } = newData;
      const updatedFields: any = {};

      // Update fields that are provided in newData
      if (name !== undefined) updatedFields.name = name;
      if (amount !== undefined) updatedFields.amount = amount;
      if (number !== undefined) updatedFields.number = number;
      if (type !== undefined) updatedFields.type = type;

      // Only run update if there are fields to update
      if (Object.keys(updatedFields).length > 0) {
        const fieldsToUpdate = Object.keys(updatedFields);
        const valuesToUpdate = fieldsToUpdate.map(
          (field) => updatedFields[field]
        );

        const updateQuery = `UPDATE Cards SET ${fieldsToUpdate
          .map((field) => `${field} = ?`)
          .join(", ")} WHERE id = ?`;

        await db.runAsync(updateQuery, [...valuesToUpdate, id]);

        // Update local state to reflect the updated card
        const updatedCards = cards.map((card) =>
          card.id === id ? { ...card, ...updatedFields } : card
        );
        setCards(updatedCards);
        console.log("Card updated successfully");
      } else {
        console.log("No fields to update provided.");
      }
    } catch (error) {
      console.error("Error updating card: ", error);
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
        removeCard,
        updateCard,
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
