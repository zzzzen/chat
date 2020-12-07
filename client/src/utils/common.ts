export function getSquare(width: number, depth: number): string {
  return (width * depth).toFixed(2);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function hasValue(value: any): boolean {
  return value !== undefined && value !== "" && value !== null;
}
