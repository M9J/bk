export const prompt = "Days remaning till GTA VI release";

export async function action(ctx) {
  const releaseTimestamp = "1779753600000";
  const today = new Date();
  const releaseDate = new Date(Number(releaseTimestamp));
  const timeDifference = releaseDate - today;
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const daysRemaining = daysDifference + " days";
  const epochDiff = Number(releaseTimestamp) - Date.now();
  const secondsRemaining = formatWithCommas(parseInt(epochDiff / 1000)) + " seconds";
  ctx.updateValue(`${daysRemaining} (${secondsRemaining})`);
  return () => action(ctx);
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
