
class AdsOfferModel {
  constructor({ id, OfferId, Name,ContractAddress, OwnerAddress, BigIntPrice, OwnerName, Image, Maxsupply, ExternalLink, Description, CurrencyAddress, Price ,  CurrencyName, Royalties, NumberTokenAllowed }) {
    this.id = id;
    this.offerId = OfferId;
    this.name = Name;
    this.contractAddress = ContractAddress;
    this.ownerAddress = OwnerAddress;
    this.ownerName = OwnerName;
    this.image = Image;
    this.maxSupply = Maxsupply;
    this.externalLink = ExternalLink;
    this.description = Description;
    this.currencyAddress = CurrencyAddress;
    this.currencyName = CurrencyName;
    this.price = Price;
    this.bigIntPrice = BigIntPrice;
    this.royalties = Royalties;
    this.numberTokenAllowed = NumberTokenAllowed;

  }


}
export default AdsOfferModel;
