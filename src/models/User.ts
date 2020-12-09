import {Schema, model} from "mongoose";
import {UserInterface} from "../interfaces/models";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = model<UserInterface>("users", UserSchema);
