export default function dateToText(dateString: string): string {
    const dateArray: string[] = ["Jan", 
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
                                "Dec"];
    const month: number = parseInt(dateString.slice(5));
    return dateArray[month - 1] + " " + dateString.slice(0, 4);
}