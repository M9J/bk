export const prompt = "Timestamp Password";

export async function action(out) {
  const offsetStr = findOffsetString();
  const accessStr = findAccessString();
  const dict = [...numArr, ...lCharArr, ...uCharArr];
  const dict16Bit = createDictArr(dict, 16);
  const offsetDict = offsetDictionary(dict16Bit, offsetStr);
  const timestampPassword = getTSPWD(offsetDict);
  const tspwd = timestampPassword.toUpperCase();
  out(tspwd);
  return () => action(out);
}

function findOffsetString() {
  const dt = new Date();
  const year = String(dt.getFullYear());
  const month = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  const ss = String(dt.getSeconds()).padStart(2, "0");
  const ms = String(parseInt(new Date().getMilliseconds() / 10)).padStart(2, "0");
  const salt = `${year}${month}${day}${hh}${mm}${ss}${ms}`;
  return salt;
}

function findAccessString() {
  const offest = "000" + Date.now();
  return offest;
}

function createDictArr(dict, len) {
  if (!dict) throw new Error(`'dict' not provided`);
  if (!len) throw new Error(`'len' not provided`);
  const dictArr = [];
  for (let i = 0; i < len; i++) {
    dictArr.push([...dict]);
  }
  return dictArr;
}

function offsetDictionary(dict, offsetStr) {
  if (!dict) throw new Error(`'dict' not provided`);
  if (!offsetStr) throw new Error(`'offsetStr' not provided`);
  const offsetStrArr = offsetStr.split("").map(Number);

  const offsetNumsArr = generateOffsetNumsArray(offsetStr);
  const adjustDict = adjustDictionaryOffset(dict, offsetNumsArr);
  return adjustDict;
}

function generateOffsetNumsArray(offsetStr) {
  if (!offsetStr) throw new Error(`'offsetStr' not provided`);
  const arr = offsetStr.split("");
  const res = arr.reduce((p, c, i, t) => {
    p += c;
    if (i % 2 !== 0 && i < t.length - 1) {
      p += "-";
    }
    return p;
  }, "");
  const resNums = res.split("-").map(Number);
  const resNumsCleaned = [];
  for (let n of resNums) {
    if (n > 62) {
      const v = String(n)
        .split("")
        .reduce((p, c) => (p += Number(c)), 0);
      resNumsCleaned.push(v);
    } else {
      resNumsCleaned.push(n);
    }
  }
  return resNumsCleaned;
}

function adjustDictionaryOffset(dict, offsetNumsArr) {
  if (!dict) throw new Error(`'dict' not provided`);
  if (!offsetNumsArr) throw new Error(`'offsetNumsArr' not provided`);
  const tempDict = Array.from(dict);
  for (const [i, n] of Object.entries(offsetNumsArr)) {
    for (let x = 0; x < n; x++) {
      tempDict[i].push(tempDict[i].shift());
    }
  }
  return tempDict;
}

function getTSPWD(offsetDict) {
  if (!offsetDict) throw new Error(`'offsetDict' not provided`);
  const val = offsetDict.reduce((p, c) => (p += c[0] ? c[0] : ""), "");
  const cleanedVal = val.replaceAll(/0+/gi, "");
  return cleanedVal;
}

const numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lCharArr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const uCharArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
