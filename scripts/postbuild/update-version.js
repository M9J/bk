import fs from "fs";

const buildFolder = "build";
const versionFile = "version.json";
const versionFilePath = buildFolder + "/" + versionFile;

export async function updateVersionInfoFile() {
  console.log("Updating version.json...");
  const latestVersion = { version: Date.now().toString() };
  fs.writeFileSync(versionFilePath, JSON.stringify(latestVersion));
  console.log("Version.json updated.");
}
