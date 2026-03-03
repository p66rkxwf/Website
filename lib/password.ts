export type PasswordOptions = {
  length: number;
  includeUpper: boolean;
  includeLower: boolean;
  includeDigits: boolean;
  includeSymbols: boolean;
};

export type PasswordStrength = '極弱' | '弱' | '中' | '強';

// 標準 ASCII 特殊符號集
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

export function generatePassword(options: PasswordOptions): string {
  let charSet = "";
  if (options.includeUpper) charSet += UPPER;
  if (options.includeLower) charSet += LOWER;
  if (options.includeDigits) charSet += DIGITS;
  if (options.includeSymbols) charSet += SYMBOLS;

  if (charSet === "" || options.length <= 0) return "";

  let result = "";
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array); // 使用 Web Crypto API 提高隨機安全性

  for (let i = 0; i < options.length; i++) {
    result += charSet[array[i] % charSet.length];
  }
  return result;
}

export function evaluateStrength(password: string, options: PasswordOptions): PasswordStrength {
  if (!password) return '極弱';
  
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  const typesCount = [
    options.includeUpper,
    options.includeLower,
    options.includeDigits,
    options.includeSymbols
  ].filter(Boolean).length;

  score += typesCount;

  if (score <= 2) return '弱';
  if (score <= 4) return '中';
  return '強';
}