import { UseCase } from "../../../common";
import { Plan } from "../../domain/entity/plan";
import { PlanRepository } from "../contract/repository/plan-repository";

export class CreatePlanUseCase implements UseCase<Input, Output> {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(input: Input): Promise<void> {
    const plan = Plan.create({
      currencyCode: input.currencyCode,
      description: input.description,
      name: input.name,
      priceCents: input.priceCents,
      photosLimit: input.photosLimit,
      videosLimit: input.videosLimit,
      position: input.position,
    });
    await this.planRepository.create(plan);
  }
}

export type Input = {
  name: string;
  description: string;
  currencyCode: string;
  priceCents: number;
  photosLimit: number;
  videosLimit: number;
  position: number;
};

export type Output = void;
