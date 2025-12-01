// domain/value-objects/entity-id.ts

import { DomainValidationError } from "../errors";

/**
 * Representa um Objeto de Valor (Value Object) para o Identificador de qualquer Entidade.
 * Garante que o ID seja uma string não vazia.
 */
export class EntityId {
  private readonly value: string;

  constructor(id: string) {
    if (typeof id !== "string" || id.trim().length === 0) {
      throw new DomainValidationError("O ID da entidade não pode ser vazio.");
    }

    this.value = id.trim();
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }

  // Método equals para comparação por valor
  public equals(other: EntityId): boolean {
    return this.value === other.value;
  }
}
