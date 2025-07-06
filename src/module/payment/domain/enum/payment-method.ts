export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  BOLETO = "boleto",
  PIX = "pix",
}

enum OrderStatus {
  AGUARDANDO_PAGAMENTO,
  PAGO,
  CANCELADO,
  ENVIADO,
  ENTREGUE,
}
