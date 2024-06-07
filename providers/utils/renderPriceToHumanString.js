function renderPriceToHumanString(decimalPrice, currencySymbol) {
    return `${decimalPrice.toFixed(4)} ${currencySymbol}`;

}

export default renderPriceToHumanString;
