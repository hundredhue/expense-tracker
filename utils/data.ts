export const data = {
  account_types: [
    { name: "Cash", _id: "cash" },
    { name: "Bank", _id: "bank" },
    { name: "Wallet", _id: "wallet" },
  ],
  transaction_types: [
    { name: "Expense", _id: "Expense" },
    { name: "Income", _id: "Income" },
  ],
  cash_flow: [
    {
      name: "Amazon",
      description: "shopping",
      amount: 1672.5,
      type: "expense",
    },
    { name: "Derreck", description: "received", amount: 50.0, type: "income" },
    {
      name: "Travelling",
      description: "chi-hr",
      amount: 10.0,
      type: "expense",
    },
  ],
};
