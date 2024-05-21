import configs from "../configs/configs";

export default function getCurrencyByAddress(chainName, currency) {
        const currencyConfig = configs[chainName];
        const assets = currencyConfig?.assets;
        if(assets){
            return assets[currency];
        }
}
