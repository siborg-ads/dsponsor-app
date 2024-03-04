//               function updateProtocolFee(address _recipient, uint96 _bps)

export default function updateProtocolFee(_recipient, _bps) {
    return this.contract.updateProtocolFee(_recipient, _bps);
}
