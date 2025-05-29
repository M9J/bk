export const prompt = "Counter";

let count = 0;

export async function action(out) {
  out(++count);
  let tmr = setTimeout(() => {
    clearTimeout(tmr);
    action(out);
  }, 1);
}
