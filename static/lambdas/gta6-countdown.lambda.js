export const prompt = "Days remaning till GTA VI release";

export async function action(ctx) {
  const today = new Date();
  
  // Your target date: November 19, 2026, at 12:00 PM
  const releaseDate = new Date(2026, 10, 19, 12, 0); 

  // Calculate the total millisecond difference once to use for both metrics
  const epochDiff = releaseDate.getTime() - today.getTime();

  // 1. Calculate Days Remaining
  const daysDifference = Math.ceil(epochDiff / (1000 * 3600 * 24));
  const daysRemaining = daysDifference + " days";

  // 2. Calculate Seconds Remaining (using Math.max so it doesn't go negative if passed)
  const secondsLeft = Math.max(0, Math.floor(epochDiff / 1000));
  const secondsRemaining = formatWithCommas(secondsLeft) + " seconds";

  // 3. Update the context
  ctx.updateValue(`${daysRemaining} (${secondsRemaining})`);

  return () => action(ctx);
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}