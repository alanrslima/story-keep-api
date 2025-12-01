// src/domain/errors/DomainValidationError.ts

/**
 * Erro de Domínio específico para falhas de validação em objetos (VOs/Entidades).
 * Representa uma violação de uma invariante interna do objeto.
 */
export class DomainValidationError extends Error {
  /**
   * O nome do campo ou propriedade do objeto que falhou na validação.
   * Útil para o mapeamento posterior ao formato BaseErrorSerializeProps.
   */
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "DomainValidationError";
    this.field = field;
    Object.setPrototypeOf(this, DomainValidationError.prototype);
  }
}
