export interface IHabit {
  _id: number;
  name: string;
  identifier: string;
  description: string;
  category: Array<string>;
  co2EmissionKgPerAction: number;
}
