import { UseCase } from "../../../common";
import { GeolocationGateway } from "../contract/gateway/geolocation-gateway";

export class AutoCompleteUseCase implements UseCase<Input, Output> {
  constructor(private readonly geolocationGateway: GeolocationGateway) {}

  async execute(input: Input): Promise<Output> {
    const addresses = await this.geolocationGateway.autoComplete(input.text);
    return addresses.map((i) => i.toJSON());
  }
}

type Input = {
  text: string;
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
}[];
