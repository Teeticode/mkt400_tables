export default function formatDateOne(
  inputDate: string | null | undefined
): string {
  if (!inputDate) {
    return "";
  }

  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();

  return `${formattedDay}/${formattedMonth}/${year}`;
}
