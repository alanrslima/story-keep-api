/**
 * Define o tamanho máximo padrão permitido para este VO,
 * mas pode ser sobrescrito pelo chamador.
 */
const DEFAULT_MAX_LENGTH = 255;

/**
 * Value Object (VO) abstrato para representar qualquer campo de texto.
 * Pode ser herdado para criar VOs de texto mais específicos (ex: ServiceName).
 */
export abstract class Text {
  // O valor interno, imutável após a criação.
  protected readonly value: string;

  // O comprimento máximo permitido para esta instância.
  protected readonly maxLength: number;

  /**
   * Construtor protegido que exige a validação antes da criação.
   * @param value A string a ser armazenada.
   * @param maxLength O comprimento máximo permitido.
   */
  protected constructor(value: string, maxLength: number = DEFAULT_MAX_LENGTH) {
    this.maxLength = maxLength;
    this.validate(value);
    // Armazena o valor após a validação
    this.value = value.trim();
  }

  /**
   * Valida as regras de negócio para a string.
   * Lança um erro se a validação falhar.
   * @param text A string a ser validada.
   */
  private validate(text: string): void {
    const trimmedText = text.trim();

    if (!trimmedText) {
      throw new Error(`O campo de texto não pode ser vazio ou nulo.`);
    }

    if (trimmedText.length > this.maxLength) {
      throw new Error(
        `O campo de texto excede o limite máximo de ${this.maxLength} caracteres. Recebido: ${trimmedText.length}.`
      );
    }
  }

  /**
   * Retorna o valor primitivo da string.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Verifica se este VO é igual a outro (a igualdade em VOs é baseada no valor).
   */
  public equals(other: Text): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    // Compara o valor da string
    return this.value === other.value;
  }
}
