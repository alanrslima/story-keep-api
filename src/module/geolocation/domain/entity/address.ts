import { ID } from "../../../common";

type CreateProps = {
  country: string;
  countryCode: string;
  state: string;
  city: string;
  neighborhood: string;
  longitude: number;
  latitude: number;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
};

type BuildProps = CreateProps & {
  id: string;
};

export class Address {
  private id: ID;
  private postcode: string;
  private country: string;
  private countryCode: string;
  private state: string;
  private city: string;
  private neighborhood: string;
  private longitude: number;
  private latitude: number;
  private addressLine1: string;
  private addressLine2: string;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.postcode = props.postcode;
    this.country = props.country;
    this.countryCode = props.countryCode;
    this.state = props.state;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.longitude = props.longitude;
    this.latitude = props.latitude;
    this.addressLine1 = props.addressLine1;
    this.addressLine2 = props.addressLine2;
  }

  static create(props: CreateProps): Address {
    return new Address({ ...props, id: new ID().getValue() });
  }

  static build(props: BuildProps): Address {
    return new Address(props);
  }

  public getId(): string {
    return this.id.getValue();
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

  public setCountryCode(countryCode: string): void {
    this.countryCode = countryCode;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string): void {
    this.state = state;
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
      postcode: this.postcode,
      country: this.country,
      countryCode: this.countryCode,
      state: this.state,
      city: this.city,
      neighborhood: this.neighborhood,
      longitude: this.longitude,
      latitude: this.latitude,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
    };
  }
}
