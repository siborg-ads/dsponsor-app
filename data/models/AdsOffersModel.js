
class AdsOfferModel {
  constructor({ id, Name, OwnerAddress, OwnerName, Image, Maxsupply, ExternalLink, Description, CurrencyAddress, Price ,  CurrencyName, Royalties, NumberTokenAllowed }) {
    this.id = id;
    this.name = Name;
    this.ownerAddress = OwnerAddress;
    this.ownerName = OwnerName;
    this.image = Image;
    this.maxSupply = Maxsupply;
    this.externalLink = ExternalLink;
    this.description = Description;
    this.currencyAddress = CurrencyAddress;
    this.currencyName = CurrencyName;
    this.price = Price;
    this.royalties = Royalties;
    this.numberTokenAllowed = NumberTokenAllowed;

  }


}
export default AdsOfferModel;
