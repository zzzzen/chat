export function toEvent<T>(value: T, name?: string) {
  return {target: {value, name}};
}

export function numToStr(val: number, textForms: string[]) {
  // textForms: ["час", "часа", "часов"]
  const n = Math.abs(val) % 100;
  const n1 = val % 10;

  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
}
