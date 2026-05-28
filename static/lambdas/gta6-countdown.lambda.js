export const prompt = "Days remaning till GTA VI release";

export async function action(ctx) {
  // 1. Define or parse your variables properly
  const releaseTimestamp = "1779753600000"; // Nov 19, 2026
  const today = new Date();
  
  // You can use either the timestamp or the component date constructor:
  // const releaseDate = new Date(Number(releaseTimestamp));
  const releaseDate = new Date(2026, 10, 19, 12, 0); // Note: 10 is November (0-indexed)

  // 2. Calculate time differences
  const timeDifference = releaseDate - today;
  
  // Math.ceil might give you an extra day if it's just a few hours past; 
  // Math.floor or Math.round is often preferred depending on your countdown style.
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const daysRemaining = daysDifference + " days";

  // Use the established releaseDate timestamp for consistency
  const epochDiff = releaseDate.getTime() - Date.now();
  
  // Helper function for formatting (defined below or imported)
  const secondsRemaining = formatWithCommas(Math.floor(epochDiff / 1000)) + " seconds";

  // 3. Update the context
  ctx.updateValue(`${daysRemaining} (${secondsRemaining})`);

  // 4. Return loop if your framework expects a cleanup/re-run function
  return () => action(ctx);
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
