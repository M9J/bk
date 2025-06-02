export const prompt = "Current time";

export async function action(out) {
  const dt = new Date();
  const h = dt.getHours();
  const hh = String(h > 12 ? h - 12 : h).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  const ss = String(dt.getSeconds()).padStart(2, "0");
  const ampm = h < 12 ? "AM" : "PM";
  const time = hh + ":" + mm + ":" + ss + " " + ampm;
  out(time);
  return () => action(out);
}
