export type InsertOneResult = {
  acknowledged: boolean;
  insertedId: string;
}

export type UpdateOneResult = {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
  upsertedId: string;
}