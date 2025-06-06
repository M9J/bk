export const prompt = "Unique String";

export const CONFIG_ACTION_DELAY = 10000;

export function action(out) {
  let str = genRandomChar() + genRandomDigit() + genRandomChar() + genRandomDigit(2);
  out(str);
  return () => action(out);
}

function getRandomNumber(min = 0, max = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRandomChar(len = 1) {
  const MIN = 65;
  const MAX = 90;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(getRandomNumber(MIN, MAX));
  }
  return str;
}

function genRandomDigit(len = 1) {
  const MIN = 48;
  const MAX = 57;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(getRandomNumber(MIN, MAX));
  }
  return str;
}
