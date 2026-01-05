export type CartDocument = {
  id: string;
  userId: string;
  foodId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
