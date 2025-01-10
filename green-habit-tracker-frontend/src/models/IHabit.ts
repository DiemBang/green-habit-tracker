export interface IHabit {
  _id: number;
  Identifier: string;
  Name: string;
  Description: string;
  GoodToKnow: string;
  Co2EmissionKgPerAction: number;
  Points: number;
  Category: Array<string>;
}
