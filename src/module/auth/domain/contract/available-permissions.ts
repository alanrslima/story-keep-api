type PermissionDefinition = {
  readonly description: string;
};

function definePermissions<T extends Record<string, PermissionDefinition>>(
  obj: T
) {
  return Object.freeze(obj);
}

export const availablePermissions = definePermissions({
  "user.delete": {
    description: "O usuário pode deletar outro usuário",
  },
  "user.list": {
    description: "O usuário pode listar todos os usuários",
  },
  "user.approve": {
    description: "O usuário pode aprovar o acesso de um outro usuário",
  },
  "user.deny": {
    description: "O usuário pode negar o acesso de um outro usuário",
  },
  "memory.list": {
    description: "O usuário pode listar os seus baús de memórias",
  },
  "memory.update": {
    description:
      "O usuário pode atualizar as informações de um baú de memórias",
  },
  "memory.create": {
    description: "O usuário pode criar um baú de memórias",
  },
  "memory.order": {
    description: "O usuário pode comprar de um baú de memorias",
  },
  "plan.create": {
    description: "O usuário pode criar um plano",
  },
  "plan.list": {
    description: "O usuário pode listar os planos disponíveis",
  },
  "media-registry.create": {
    description: "O usuário pode criar um registro de midia",
  },
  "media-registry.list": {
    description: "O usuário pode listar registros de midias",
  },
});
