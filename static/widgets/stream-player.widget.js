const STREAM_URLS = [
  {
    name: "Ephphatha FM",
    link: "https://ephphatha.radioca.st/;",
  },
  {
    name: "Open Sky Radio",
    link: "https://audio.opensky.radio:8082/flac?_res_tag_=audio;",
  },
  {
    name: "1.FM - Amsterdam Trance",
    link: "https://audio.opensky.radio:8082/flac?_res_tag_=audio;",
  },
];

export const title = "Stream Player";

export const element = (() => {
  console.log("1");
  const rootElem = document.createElement("div");
  rootElem.style.fontFamily = "Arial, sans-serif";

  // Load Howler.js from CDN
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js";
  console.log("2");
  script.onload = () => {
    console.log("3: script.onload");
    let currentHowl = null;
    const listElem = document.createElement("div");
    listElem.style.display = "flex";
    listElem.style.gap = "16px";
    listElem.style.flexWrap = "wrap";
    console.log("4");

    STREAM_URLS.forEach((stream, index) => {
      console.log("5: STREAM_URLS.forEach", stream, index);
      const btn = document.createElement("button");
      btn.dataset.customId = Date.now() + "." + index;
      btn.innerText = `▶ ${stream.name}`;
      btn.style.padding = "8px 8px";
      btn.style.border = "none";
      btn.style.borderRadius = "4px";
      btn.style.background = "#222";
      btn.style.color = "#fff";
      btn.style.cursor = "pointer";
      btn.style.userSelect = "none";
      console.log("6");

      btn.onclick = () => {
        console.log("7: btn.onclick", stream, index, btn);
        if (currentHowl) {
          console.log("8");
          if (currentHowl.currentlyPlaying.btn.dataset.customId === btn.dataset.customId) {
            console.log("9");
            currentHowl.stop();
            currentHowl.unload();
            currentHowl.currentlyPlaying.btn.style.background = "#222";
            currentHowl = null;
            return;
          } else {
            console.log("10");
            currentHowl.stop();
            currentHowl.unload();
            currentHowl.currentlyPlaying.btn.style.background = "#222";
            currentHowl = null;
          }
        }

        console.log("11");
        currentHowl = new Howl({
          src: [stream.link],
          html5: true,
          format: [
            "mp3",
            "mpeg",
            "mpga",
            "wav",
            "aac",
            "m4a",
            "mp4",
            "ogg",
            "oga",
            "opus",
            "webm",
            "weba",
            "flac",
            "caf",
          ],
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
        console.log("12");

        btn.style.background = "#007bff";
        currentHowl.uniqueCustomId = Date.now();
        currentHowl.currentlyPlaying = {
          uniqueCustomId: currentHowl.uniqueCustomId,
          btn: btn,
        };
        currentHowl.play();
      };
      console.log("13");

      listElem.appendChild(btn);
    });

    console.log("14");
    rootElem.appendChild(listElem);
  };

  console.log("15");
  document.head.appendChild(script);
  return rootElem;
})();
