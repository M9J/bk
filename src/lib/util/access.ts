export const isGranted = async () => await run();

const STORED_HASH =
  "c3bb7c6ce286577d5945d6e452b9c8dca103276a88f9c5c4587372b957f164d6d636acce2422ce3410488b3feb6a9e7b2bf3aeb576614d23d958d3086e5f00f4";
const STORED_SALT = "1976f6ba3ea71cc44453f8de0e412b6b";

async function run() {
  const pwd = localStorage.getItem("pwd") || prompt("Password") || "";
  const isGranted = await checkIfGranted(pwd);
  if (isGranted) localStorage.setItem("pwd", pwd);
  return isGranted;
}

async function deriveKey(input: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(input),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-512",
    },
    keyMaterial,
    512
  );

  return Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// function generateSalt() {
//   Array.from(crypto.getRandomValues(new Uint8Array(16)))
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
// }

async function verifyUserInput(userInput: string, storedHash: string, storedSalt: string) {
  const userHash = await deriveKey(userInput, storedSalt);
  // const userSalt = generateSalt();
  return userHash === storedHash;
}

async function checkIfGranted(pwd: string) {
  return await verifyUserInput(pwd, STORED_HASH, STORED_SALT);
}
