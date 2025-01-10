export interface IHabit {
  _id: number;
  identifier: string;
  name: string;
  description: string;
  goodToKnow: string;
  co2EmissionKgPerAction: number;
  points: number;
  category: Array<string>;
}
