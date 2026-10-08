export const prompt = "Days remaning till GTA VI release";

export const CONFIG_ACTION_DELAY = 1000;

export async function action(ctx) {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  ctx.updateValue(timeString);
  return () => action(ctx);
}
