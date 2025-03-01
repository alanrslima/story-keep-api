import { InvalidRoleError } from "../../error/invalid-role-error";
import { availableRoles } from "../contract/available-roles";

type CreateProps = {
  name: keyof typeof availableRoles;
};

export class Role {
  private name: keyof typeof availableRoles;
  private permissions: string[];

  constructor(props: CreateProps) {
    if (!this.isAvailable(props.name)) {
      throw new InvalidRoleError();
    }
    this.name = props.name;
    this.permissions = availableRoles[props.name]?.permissions || [];
  }

  private isAvailable(roleName: string) {
    return roleName in availableRoles;
  }

  getName() {
    return this.name;
  }

  getPermissions() {
    return this.permissions;
  }
}
