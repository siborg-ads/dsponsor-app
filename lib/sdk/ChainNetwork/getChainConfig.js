import PolygonMumbai from './chains/polygon-mumbai.json' assert { type: 'json' };

const CONFIG = {
    'polygon-mumbai': PolygonMumbai
}
export default function getChainConfig(chainName){
    if(!CONFIG[chainName]){
        throw new Error(`Chain ${chainName} not supported`);
    }
    return CONFIG[chainName];
}
