export type Card = {
  id: string;
  data: string;
};

export type Column = {
  id: string;
  title: string;
  cardIds: string[];
};

export type Board = {
  columns: Record<string, Column>;
  columnOrder: string[];
  cards: Record<string, Card>;
};
