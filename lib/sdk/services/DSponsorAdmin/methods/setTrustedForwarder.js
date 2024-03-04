//                 'function setTrustedForwarder(address forwarder)',
export default function setTrustedForwarder(forwarder) {
    return this.contract.setTrustedForwarder(forwarder);
}
