import { availablePermissions } from "./available-permissions";

type ids = "admin";

type AvailableRolesProps = {
  [key in ids]: {
    name: string;
    description: string;
    permissions: Array<keyof typeof availablePermissions>;
  };
};

export const availableRoles: AvailableRolesProps = Object.freeze({
  admin: {
    name: "Administrador",
    description: "O usuário possui todas as permissões do sistema",
    permissions: Object.keys(availablePermissions).map(
      (key) => key as keyof typeof availablePermissions
    ),
  },
  user: {
    name: "Usuário",
    description:
      "O usuário tem permissões relacionadas ao seu escuto de acesso",
    permissions: [],
  },
});
