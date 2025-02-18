export const formatNumber = (
  amount: number,
  decimalCount: number = 2,
  decimal: string = ",",
  thousands: string = "."
): string => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    // Garantimos que 'amount' continua sendo um número, sem redefini-lo para string
    const fixedAmount = Math.abs(amount).toFixed(decimalCount); 
    const integerPart = parseInt(fixedAmount, 10).toString();
    let j = integerPart.length > 3 ? integerPart.length % 3 : 0;

    return (
      negativeSign +
      (j ? integerPart.substr(0, j) + thousands : "") +
      integerPart.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount ? decimal + fixedAmount.split(".")[1] : "")
    );
  } catch (e) {
    console.error(e);
    return "0";
  }
};
