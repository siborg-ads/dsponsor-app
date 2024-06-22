const formatAndRoundPrice = (value) => {
  let num = parseFloat(value);

  if (num === 0) {
    return 0;
  }

  if (num > 1) {
    return 1;
  } else if (num > 0.1) {
    return parseFloat(num.toFixed(3));
  } else if (num > 0.01) {
    return parseFloat(num.toFixed(4));
  } else if (num > 0.001) {
    return parseFloat(num.toFixed(5));
  } else if (num > 0.0001) {
    return parseFloat(num.toFixed(6));
  } else if (num > 0.00001) {
    return parseFloat(num.toFixed(7));
  } else if (num > 0.000001) {
    return parseFloat(num.toFixed(8));
  } else {
    return parseFloat(num.toFixed(9));
  }
};

export default formatAndRoundPrice;
