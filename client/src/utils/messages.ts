import {numToStr} from "./common";

export const MESSAGES = {
  required: "Обязательное поле",
  maxLength: (max: number) => `Поле не может содержать более ${max} ${numToStr(max, ["символ", "символа", "символов"])}`,
  minLength: (min: number) => `Поле не может содержать менее ${min} ${numToStr(min, ["символ", "символа", "символов"])}`
};
