const STREAM_URLS = [
    {
        name: "",
        link: ""
    },
]

export const title = "Stream Player";

export const element = (() => {
  const rootElem = document.createElement("div");
  rootElem.innerText = "Widget content";
  return rootElem;
})();
