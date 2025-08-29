const STREAM_URLS = [
    {
        name: "Radyo EZ Konpa",
        link: "http://198.178.123.17:9712/stream/1/;"
    },
]

export const title = "Stream Player";

export const element = (() => {
  const rootElem = document.createElement("div");
  rootElem.innerText = "Widget content";
  return rootElem;
})();
