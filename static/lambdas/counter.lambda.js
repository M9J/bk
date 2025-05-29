export const prompt = "Counter";

export async function action(out) {
  startCounter(out);
}

let count = 0;

function startCounter(out) {
  out(++count);
  let tmr = setTimeout(() => {
    clearTimeout(tmr);
    startCounter(out);
  }, 1);
}
