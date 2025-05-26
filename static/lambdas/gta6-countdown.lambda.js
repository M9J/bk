export const prompt = "Days remaning for GTA VI release";
export const action = () => {
  const releaseTimestamp = "1779753600000";
  const today = new Date();
  const releaseDate = new Date(Number(releaseTimestamp));
  let timeDifference = releaseDate - today;
  let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference + " days";
};
