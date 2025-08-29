const STREAM_URLS = [
  {
    name: "Radyo EZ Konpa",
    link: "http://198.178.123.17:9712/stream/1/;",
  },
];

export const title = "Stream Player";

export const element = (() => {
  const rootElem = document.createElement("div");
  rootElem.style.fontFamily = "Arial, sans-serif";

  // Load Howler.js from CDN
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js";
  script.onload = () => {
    let currentHowl = null;
    const listElem = document.createElement("div");
    listElem.style.display = "flex";
    listElem.style.gap = "16px";
    listElem.style.flexWrap = "wrap";

    STREAM_URLS.forEach((stream, index) => {
      const btn = document.createElement("button");
      btn.dataset.customId = Date.now() + "." + index;
      btn.innerText = `▶ ${stream.name}`;
      btn.style.padding = "8px 8px";
      btn.style.border = "none";
      btn.style.borderRadius = "4px";
      btn.style.background = "#222";
      btn.style.color = "#fff";
      btn.style.cursor = "pointer";

      btn.onclick = () => {
        if (currentHowl) {
          if (currentHowl.currentlyPlaying.btn.dataset.customId === btn.dataset.customId) {
            currentHowl.stop();
            currentHowl.unload();
            currentHowl.currentlyPlaying.btn.style.background = "#222";
            currentHowl = null;
            return;
          } else {
            currentHowl.stop();
            currentHowl.unload();
            currentHowl.currentlyPlaying.btn.style.background = "#222";
            currentHowl = null;
          }
        }

        currentHowl = new Howl({
          src: [stream.link],
          html5: true,
          format: ["mp3", "aac", "ogg"],
          autoplay: true,
          volume: 1.0,
          onplay: () => {
            btn.innerText = `⏸ ${stream.name}`;
          },
          onend: () => {
            btn.innerText = `▶ ${stream.name}`;
          },
          onstop: () => {
            btn.innerText = `▶ ${stream.name}`;
          },
        });

        btn.style.background = "#007bff";
        currentHowl.uniqueCustomId = Date.now();
        currentHowl.currentlyPlaying = {
          uniqueCustomId: currentHowl.uniqueCustomId,
          btn: btn,
        };
        currentHowl.play();
      };

      listElem.appendChild(btn);
    });

    rootElem.appendChild(listElem);
  };

  document.head.appendChild(script);
  return rootElem;
})();
