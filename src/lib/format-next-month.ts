export default function formatNextMonth(date: Date) {
    if (!date) {
        return null;
    }

    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');

    let month = originalDate.getMonth() + 1; 
    let year = originalDate.getFullYear();

    if (month === 12) {
        month = 1;
        year += 1; 
    } else {
        month += 1; 
    }
    const formattedMonth = month.toString().padStart(2, '0');

    return `${day}/${formattedMonth}/${year}`;
}