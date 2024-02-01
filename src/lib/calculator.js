const CURRENCY_API =
  "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json/?currencies=USD";

const OMEDIAS_RATE = 2.5;

async function getCurrentRate() {
  const response = await fetch(CURRENCY_API);
  const currencyData = await response.json();

  return currencyData[0]["currencies"][0]["rate"];
}

const currentRate = await getCurrentRate();

export async function calculateDiff(initialSalary) {
  const salaryInUSDWithOmediasRate = initialSalary / OMEDIAS_RATE;
  const salaryInGELWithCurrentRate = salaryInUSDWithOmediasRate * currentRate;
  const diff = salaryInGELWithCurrentRate - initialSalary;

  return {
    diff,
    salaryInGELWithCurrentRate,
  };
}
