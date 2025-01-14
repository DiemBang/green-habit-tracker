export interface IHabit {
  _id: string;
  identifier: string;
  name: string;
  description: string;
  goodToKnow: string;
  co2EmissionKgPerAction: number;
  points: number;
  category: Array<string>;
}
