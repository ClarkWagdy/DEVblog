export const formatDate = (date:string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  
  return `${day} ${month} ${year}`;
}