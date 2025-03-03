import { Plan } from "../../../domain/entity/plan";

export interface PlanRepository {
  getById(id: string): Promise<Plan>;
  create(plan: Plan): Promise<void>;
  update(plan: Plan): Promise<void>;
}
