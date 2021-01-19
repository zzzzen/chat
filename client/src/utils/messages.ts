import {numToStr} from "./common";

export const MESSAGES = {
  required: "Required",
  maxLength: (max: number) => `The field cannot contain more than ${max} ${numToStr(max, ["character", "characters"])}`,
  minLength: (min: number) => `The field cannot contain less than ${min} ${numToStr(min, ["character", "characters"])}`
};
