import React, { createContext, useContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";

type LimitsContextType = {
  monthlyLimit: number;
  getLimits: () => void;
  setLimits: (monthly: number) => void;
};

const LimitsContext = createContext<LimitsContextType | undefined>(undefined);

export const LimitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const db = useSQLiteContext();

  const getLimits = async () => {
    try {
      const result = await db.getAllAsync<{
        monthly_limit: number;
      }>(`SELECT * FROM Limits;`);
      if (result.length > 0) {
        setMonthlyLimit(result[0].monthly_limit);
      }
    } catch (error) {
      console.error("Error fetching limits: ", error);
    }
  };

  const setLimits = async (monthly: number) => {
    try {
      await db.runAsync(
        `UPDATE Limits SET monthly_limit = ?, weekly_limit = 1000, daily_limit = 100 WHERE id = 1;`,
        [monthly]
      );
      setMonthlyLimit(monthly);
      console.log("Limits updated successfully");
    } catch (error) {
      console.error("Error updating limits: ", error);
    }
  };

  useEffect(() => {
    getLimits();
  }, []);

  return (
    <LimitsContext.Provider
      value={{
        monthlyLimit,
        getLimits,
        setLimits,
      }}
    >
      {children}
    </LimitsContext.Provider>
  );
};

export const useLimitsContext = () => {
  const context = useContext(LimitsContext);
  if (!context) {
    throw new Error("useLimitsContext must be used within a LimitsProvider");
  }
  return context;
};
