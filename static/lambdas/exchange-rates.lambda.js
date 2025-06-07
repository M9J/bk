export const prompt = "Exchange rates";

export async function action(ctx) {
  const currencies = ["USD", "AUD"];
  const ratesResponseJSON = {};
  for (const curr of currencies) {
    if (curr) ratesResponseJSON[curr] = await fetchExchangeRates(curr);
  }
  let rates = "";
  const entries = Object.entries(ratesResponseJSON);
  for (const [index, [curr, rate]] of Object.entries(entries)) {
    rates += curr + " = " + rate.conversion_rate;
    rates += index < entries.length ? "\n" : "";
  }
  ctx.updateValue(rates);
}

async function fetchExchangeRates(curr1 = "INR", curr2 = "INR") {
  const URL =
    "https://v6.exchangerate-api.com/v6/64088c97d7fe64e87149380e/pair/" + curr1 + "/" + curr2;
  try {
    const resp = await fetch(URL);
    if (resp) return resp.json();
    else throw new Error("Unable to get response.");
  } catch (err) {
    throw new Error(err);
  }
}
