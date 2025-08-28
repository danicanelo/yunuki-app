import { Breed } from "./breed.interface";

export interface Yunuki {
  id: number;
  name: string;
  breed: Breed;
  dead?: Date | null;
  birth: Date;
  hunger: number;
  dirt: number;
  tiredness: number;
  userId: number;
  epitaph?: string;
}
