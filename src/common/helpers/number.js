export const maskCurrency = (valor, locale = "pt-BR", currency = "BRL") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(valor);
};
