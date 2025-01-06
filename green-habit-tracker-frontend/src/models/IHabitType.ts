export interface IHabitType {
  Id: number;
  Name: string;
  Description: string;
  GoodToKnow: string;
  Co2EmissionKgPerAction: number;
  Points: number;
  Category: Array<string>;
}
