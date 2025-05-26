export const prompt = "Current time";
export const action = (setOutput) => {
  const dt = new Date();
  let hh = 0;
  const hours = dt.getHours();
  if (hours > 12) hh = hours - 12;
  hh = String(hh).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  const ss = String(dt.getSeconds()).padStart(2, "0");
  const ampm = hours / 12 > 1 ? "PM" : "AM";
  const time = hh + ":" + mm + ":" + ss + " " + ampm;
  setOutput(time);
  let tmr1 = setTimeout(() => {
    clearTimeout(tmr1);
    action(setOutput);
  }, 1000);
};
