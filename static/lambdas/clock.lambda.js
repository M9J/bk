export const prompt = "Current time";
export const action = (setOutput) => {
  const dt = new Date();
  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  const ss = String(dt.getSeconds()).padStart(2, "0");
  const time = hh + ":" + mm + ":" + ss;
  setOutput(time);
  let tmr1 = setTimeout(() => {
    clearTimeout(tmr1);
    action(setOutput);
  }, 1000);
};
