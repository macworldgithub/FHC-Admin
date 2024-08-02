export function getFormattedDate() {
  const date = new Date();

  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = (date.getFullYear() % 100).toString();

  day = parseInt(day) < 10 ? "0" + day : day;
  month = parseInt(month) < 10 ? "0" + month : month;
  year = parseInt(year) < 10 ? "0" + year : year;

  return `${day}-${month}-${year}`;
}
