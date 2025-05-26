export async function next(fn: Function) {
  if (fn) {
    let tmr1 = setTimeout(() => {
      clearTimeout(tmr1);
      fn();
    }, 0);
  }
}
