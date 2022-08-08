export default function dateToText(dateString: string): string {
  const dateArray: string[] = [
    "Jan", 
    "Feb", 
    "Mar", 
    "Apr", 
    "May", 
    "Jun", 
    "Jul", 
    "Aug", 
    "Sep", 
    "Oct",
    "Nov", 
    "Dec"
  ];
  // dateString looks like '2022-01' (YYYY-MM), so slicing at 5 gives you YYYY
  const month: number = parseInt(dateString.slice(5));
  return dateArray[month - 1] + " " + dateString.slice(0, 4);
}