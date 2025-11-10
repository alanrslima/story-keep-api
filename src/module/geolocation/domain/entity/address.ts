type CreateProps = {
  street: string;
  country: string;
  countryCode: string;
  state: string;
  stateCode: string;
  city: string;
  neighborhood: string;
  longitude: number;
  latitude: number;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  housenumber: string;
  formatted: string;
};

export class Address {
  private formatted: string;
  private postcode: string;
  private street: string;
  private housenumber: string;
  private country: string;
  private countryCode: string;
  private state: string;
  private stateCode: string;
  private city: string;
  private neighborhood: string;
  private longitude: number;
  private latitude: number;
  private addressLine1: string;
  private addressLine2: string;

  private constructor(props: CreateProps) {
    this.formatted = props.formatted;
    this.housenumber = props.housenumber;
    this.postcode = props.postcode;
    this.street = props.street;
    this.country = props.country;
    this.countryCode = props.countryCode;
    this.state = props.state;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.longitude = props.longitude;
    this.latitude = props.latitude;
    this.addressLine1 = props.addressLine1;
    this.addressLine2 = props.addressLine2;
  }

  static create(props: CreateProps): Address {
    return new Address(props);
  }

  public getCountry(): string {
    return this.country;
  }

  public setCountry(country: string): void {
    this.country = country;
  }

  public getCountryCode(): string {
    return this.countryCode;
  }

  public getPostcode(): string {
    return this.postcode;
  }

  public setPostcode(postcode: string): void {
    this.postcode = postcode;
  }

  public getStreet(): string {
    return this.street;
  }

  public setStreet(street: string): void {
    this.street = street;
  }

  public setCountryCode(countryCode: string): void {
    this.countryCode = countryCode;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public getStateCode(): string {
    return this.stateCode;
  }

  public setStateCode(stateCode: string): void {
    this.stateCode = stateCode;
  }

  public getCity(): string {
    return this.city;
  }

  public setCity(city: string): void {
    this.city = city;
  }

  public getNeighborhood(): string {
    return this.neighborhood;
  }

  public setNeighborhood(neighborhood: string): void {
    this.neighborhood = neighborhood;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public setLongitude(longitude: number): void {
    this.longitude = longitude;
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public setLatitude(latitude: number): void {
    this.latitude = latitude;
  }

  public getAddressLine1(): string {
    return this.addressLine1;
  }

  public setAddressLine1(addressLine1: string): void {
    this.addressLine1 = addressLine1;
  }

  public getAddressLine2(): string {
    return this.addressLine2;
  }

  public setAddressLine2(addressLine2: string): void {
    this.addressLine2 = addressLine2;
  }

  toJSON() {
    return {
      housenumber: this.housenumber,
      street: this.street,
      postcode: this.postcode,
      country: this.country,
      countryCode: this.countryCode,
      state: this.state,
      stateCode: this.stateCode,
      city: this.city,
      neighborhood: this.neighborhood,
      longitude: this.longitude,
      latitude: this.latitude,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      formatted: this.formatted,
    };
  }
}
