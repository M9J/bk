export const prompt = "Days remaning till GTA VI release";

export CONFIG_ACTION_DELAY = 1;

export async function action(ctx) {
  const today = new Date();

  // Your target date: November 19, 2026, at 12:00 PM
  const releaseDate = new Date(2026, 10, 19, 12, 0); 

  // Calculate the total millisecond difference
  const epochDiff = releaseDate.getTime() - today.getTime();

  // 1. Calculate Days Remaining
  const daysDifference = Math.ceil(epochDiff / (1000 * 3600 * 24));
  const daysRemaining = daysDifference + " days";

  // 2. Calculate Seconds Remaining with 3 decimal places (.000)
  const secondsLeft = Math.max(0, epochDiff / 1000);
  
  // Forces exactly 3 decimal places for millisecond precision
  const fixedSeconds = secondsLeft.toFixed(3); 
  const secondsRemaining = formatWithCommas(fixedSeconds) + " seconds";

  // 3. Update the context
  ctx.updateValue(`${daysRemaining} (${secondsRemaining})`);

  return () => action(ctx);
}

function formatWithCommas(number) {
  // Split the string into integer and decimal parts so commas aren't added to the milliseconds
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
