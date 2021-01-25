import {numToStr} from "./common";

export const MESSAGES = {
  login: "Invalid login or password",
  register: "A user with such a phone already exists",
  required: "Required",
  email: "Invalid email format",
  maxLength: (max: number) => `The field cannot contain more than ${max} ${numToStr(max, ["character", "characters"])}`,
  minLength: (min: number) => `The field cannot contain less than ${min} ${numToStr(min, ["character", "characters"])}`
};
