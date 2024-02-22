
class AdsOfferModel {
  constructor({ id, Name, OwnerAddress, OwnerName, Image, Price, Maxsupply, ExternalLink, Description, Currency, Royalties, NumberTokenAllowed }) {
    this.id = id;
    this.name = Name;
    this.ownerAddress = OwnerAddress;
    this.ownerName = OwnerName;
    this.image = Image;
    this.price = Price;
    this.maxSupply = Maxsupply;
    this.externalLink = ExternalLink;
    this.description = Description;
    this.currency = Currency;
    this.royalties = Royalties;
    this.numberTokenAllowed = NumberTokenAllowed;

  }


}
export default AdsOfferModel;
