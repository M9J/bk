import { updateVersionInfoFile } from "./update-version.js";

(async () => {
  console.log("Running post build tasks...");
  await updateVersionInfoFile();
})();
