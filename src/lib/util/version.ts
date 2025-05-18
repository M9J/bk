export async function getCurrentVersion() {
  const basePath = import.meta.env.MODE === "production" ? "/bk" : "";
  const currentVersionURL = basePath + "/version.json";
  try {
    const currentVersionResp = await fetch(currentVersionURL);
    if (!currentVersionResp.ok) {
      console.log(new Error("Failed to fetch current version"));
    } else {
      const currentVersionJSON = await currentVersionResp.json();
      return currentVersionJSON.version;
    }
  } catch (err) {
    console.error("Current version check failed: ", err);
  }
}

export async function checkForLatestVersion() {
  const latestVersionAPIURL =
    "https://api.github.com/repos/m9j/bk/contents/version.json?ref=gh-pages";
  try {
    const latestVersionResp = await fetch(latestVersionAPIURL, { cache: "no-store" });
    if (!latestVersionResp.ok) {
      console.log(new Error("Failed to fetch latest version"));
    } else {
      const latestVersionRespJSON = await latestVersionResp.json();
      const latestVersionJSON = JSON.parse(atob(latestVersionRespJSON.content));
      return latestVersionJSON.version;
    }
  } catch (err) {
    console.error("Latest version check failed: ", err);
  }
}
