export const prompt = "Days remaning till GTA VI release";

export const CONFIG_ACTION_DELAY = 1;

export async function action(ctx) {
  const today = new Date();
  const releaseDate = new Date(2026, 10, 19, 12, 0);
  const epochDiff = releaseDate.getTime() - today.getTime();
  const daysDifference = Math.ceil(epochDiff / (1000 * 3600 * 24));
  const daysRemaining = daysDifference + " days";
  const millisecondsLeft = Math.max(0, Math.floor(epochDiff));
  const millisecondsRemaining = formatWithCommas(millisecondsLeft) + " milliseconds";
  ctx.updateValue(`${daysRemaining} (${millisecondsRemaining})`);
  return () => action(ctx);
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
