import { Plan } from "../../../domain/entity/plan";

export interface PlanRepository {
  getById(id: string): Promise<Plan>;
}
