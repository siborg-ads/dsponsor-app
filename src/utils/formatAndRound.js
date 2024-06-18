export function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

const formatAndRoundPrice = (value) => {
  let num = parseFloat(value);

  if (num === 0) {
    num = round(num, 0).toLocaleString("en-US");
  }

  if (num > 1) {
    num = round(num, 3).toLocaleString("en-US");
  } else if (num > 0.1) {
    num = round(num, 4).toLocaleString("en-US");
  } else if (num > 0.01) {
    num = round(num, 5).toLocaleString("en-US");
  } else if (num > 0.001) {
    num = round(num, 6).toLocaleString("en-US");
  } else if (num > 0.0001) {
    num = round(num, 7).toLocaleString("en-US");
  } else {
    num = round(num, 8).toLocaleString("en-US");
  }

  return num;
};

export default formatAndRoundPrice;
