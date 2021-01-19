export function toEvent<T>(value: T, name?: string) {
  return {target: {value, name}};
}

export function numToStr(val: number, textForms: string[]) {
  return val > 1 ? textForms[1] : textForms[0];
}
