function renderPriceToHumanString(decimalPrice, currencySymbol) {
    return `${decimalPrice.toFixed(2)} ${currencySymbol}`;

}

export default renderPriceToHumanString;
