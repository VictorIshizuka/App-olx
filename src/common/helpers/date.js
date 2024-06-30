export function formatDate(date) {
  let cDate = new Date(date);
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let cDay = cDate.getDate();
  let cMonth = cDate.getMonth();
  let cYear = cDate.getFullYear();

  return `${cDay} de ${months[cMonth]} de ${cYear}`;
}
