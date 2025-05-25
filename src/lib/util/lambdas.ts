export async function getLambdas() {
  const basePath = import.meta.env.MODE === "production" ? "/bk" : "";
  const lambdasFolder = basePath + "/lambdas";
  try {
    const lambdasFolderIndexModule = await fetch(lambdasFolder + "/index.json");
    if (lambdasFolderIndexModule) {
      const lambdasIndex = await lambdasFolderIndexModule.json();
      const hasLambdasIndex = Array.isArray(lambdasIndex) ? lambdasIndex.length > 0 : false;
      if (hasLambdasIndex) {
        const lambdaFileFetchPromises = lambdasIndex.map(
          (lambdaFileName: string) => import(lambdasFolder + "/" + lambdaFileName + ".lambda.js")
        );
        return await Promise.all(lambdaFileFetchPromises);
      }
    }
  } catch (err) {
    console.error("lambdas folder or lambdas/index.json not found. Error:", err);
  }
}
