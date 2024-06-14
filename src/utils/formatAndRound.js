const formatAndRound = (value) => {
  const num = parseFloat(value);
  if (num > 1) {
    return num.toFixed(3);
  } else if (num > 0.1) {
    return num.toFixed(4);
  } else if (num > 0.01) {
    return num.toFixed(5);
  } else if (num > 0.001) {
    return num.toFixed(6);
  } else if (num > 0.0001) {
    return num.toFixed(7);
  } else {
    return num.toFixed(8);
  }
};

export default formatAndRound;

export const formatAndRoundPrice = (value) => {
  const num = parseFloat(value);
  if (num > 1) {
    return num.toFixed(3);
  } else if (num > 0.1) {
    return num.toFixed(4);
  } else if (num > 0.01) {
    return num.toFixed(5);
  } else if (num > 0.001) {
    return num.toFixed(6);
  } else if (num > 0.0001) {
    return num.toFixed(7);
  } else {
    return num.toFixed(8);
  }
};
