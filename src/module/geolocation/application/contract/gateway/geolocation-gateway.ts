import { Address } from "../../../domain/entity/address";

export interface GeolocationGateway {
  autoComplete(text: string): Promise<Address[]>;
  getByCoords(coords: {
    latitude: number;
    longitude: number;
  }): Promise<Address>;
}
