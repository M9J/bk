const STREAM_URLS = [
  {
    name: "Radyo EZ Konpa",
    link: "http://198.178.123.17:9712/stream/1/;",
  },
  {
    name: "World Music Radio",
    link: "http://stream.wlmm.dk:8010/wmrmp3;",
  },
  {
    name: "KWMV",
    link: "https://ice41.securenetsystems.net/KWMV;",
  },
  {
    name: "Top FM",
    link: "http://dione.shoutca.st:8420/;",
  },
  {
    name: "Truckers Channel",
    link: "http://philae.shoutca.st:8388/;",
  },
  {
    name: "All Time Oldies",
    link: "https://kea.cdnstream.com/1295_128;",
  },
  {
    name: "106.1 KISS FM",
    link: "https://stream.revma.ihrhls.com/zc2245;",
  },
  {
    name: "Christian Radio 1",
    link: "http://k2.usastreams.com/Christian;",
  },
  {
    name: "Jesus Coming FM",
    link: "http://live.jesuscomingfm.com:8584/;",
  },
  {
    name: "Ephphatha FM",
    link: "https://ephphatha.radioca.st/;",
  },
  {
    name: "Chuck FM 102.5",
    link: "https://ice23.securenetsystems.net/QXFM;",
  },
  {
    name: "Electronic Music",
    link: "https://strm112.1.fm/atr_mobile_mp3;",
  },
  {
    name: "Modern Age",
    link: "https://r5.zetcast.net/flac;",
  },
  {
    name: "Vintage Experimental",
    link: "https://streams.95bfm.com/stream112;",
  },
  {
    name: "City Pop FM Chile",
    link: "http://cityradio.ddns.net:8000/citypop;",
  },
  {
    name: "KFRE",
    link: "https://kfre.s3.amazonaws.com/truehd/FLAC/program.m3u8;",
  },
  {
    name: "Radio Paradise Global",
    link: "http://stream.radioparadise.com/global-flac;",
  },
  {
    name: "Trance",
    link: "http://stream.trance.ie:8000/tpmixes;",
  },
  {
    name: "Radio Paradise",
    link: "http://stream.radioparadise.com/flac;",
  },
  {
    name: "Radio Paradise Mellow",
    link: "http://stream.radioparadise.com/mellow-flac;",
  },
  {
    name: "Radio Paradise Rock",
    link: "http://stream.radioparadise.com/rock-flac;",
  },
  {
    name: "Open Sky Radio",
    link: "https://audio.opensky.radio:8082/flac?_res_tag_=audio;",
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
      btn.style.userSelect = "none";

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
