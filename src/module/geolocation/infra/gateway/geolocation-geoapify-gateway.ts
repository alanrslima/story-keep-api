import { GeolocationGateway } from "../../application/contract/gateway/geolocation-gateway";
import { Address } from "../../domain/entity/address";

export class GeolocationGeoapifyGateway implements GeolocationGateway {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = "https://api.geoapify.com/v1/geocode";
    this.apiKey = "8b4692a4a7754f3e8a3c66ef592c8445";
  }

  async autoComplete(text: string): Promise<Address[]> {
    const response = await fetch(
      `${this.baseUrl}/autocomplete?text=${text}&apiKey=${this.apiKey}`,
      { method: "GET" }
    );
    const data = await response.json();
    return data.features.map((feature: any) =>
      this.buildAddress(feature.properties)
    );
  }

  private buildAddress(properties: any): Address {
    return Address.create({
      postcode: properties.postcode,
      addressLine1: properties.address_line1,
      addressLine2: properties.address_line2,
      city: properties.city,
      country: properties.country,
      countryCode: properties.country_code,
      latitude: properties.lat,
      longitude: properties.lon,
      neighborhood: properties.suburb || "",
      state: properties.state || "",
    });
  }

  async getByCoords(coords: {
    latitude: number;
    longitude: number;
  }): Promise<Address> {
    const response = await fetch(
      `${this.baseUrl}/reverse?lat=${coords.latitude}&lon=${coords.longitude}&apiKey=${this.apiKey}`,
      { method: "GET" }
    );
    const data = await response.json();

    if (!data.features?.length) throw new Error("Address not found");
    console.log("data", data.features);
    return this.buildAddress(data.features[0].properties);
  }
}
