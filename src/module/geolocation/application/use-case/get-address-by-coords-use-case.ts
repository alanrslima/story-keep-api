import { UseCase } from "../../../common";
import { GeolocationGateway } from "../contract/gateway/geolocation-gateway";

export class GetAddressByCoordsUseCase implements UseCase<Input, Output> {
  constructor(private readonly geolocationGateway: GeolocationGateway) {}

  async execute(input: Input): Promise<Output> {
    const address = await this.geolocationGateway.getByCoords(input.coords);
    return address.toJSON();
  }
}

type Input = {
  coords: { latitude: number; longitude: number };
};

type Output = {
  country: string;
  countryCode: string;
  state: string;
  city: string;
  neighborhood: string;
  longitude: number;
  latitude: number;
  addressLine1: string;
  addressLine2: string;
};
