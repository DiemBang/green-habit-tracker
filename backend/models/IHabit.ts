export interface IHabit {
  _id: string;
  name: string;
  identifier: string;
  description: string;
  category: Array<string>;
  co2EmissionKgPerAction: number;
}
