import {Schema, Document} from "mongoose";

export interface OrderInterface extends Document {
  date: Date;
  order: number;
  list: {name: string; quantity: number; cost: number}[];
  user: number;
}


export interface UserInterface extends Document {
  email: string;
  password: string;
}

export interface PositionInterface extends Document {
  name: string;
  cost: number;
  category: number;
  user: number;
}

export interface CategoryInterface extends Document {
  name: string;
  imageSrc: string;
  user: number;
}
