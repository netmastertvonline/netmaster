export function todayDate(): string {
    const today: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    const dateString: string = today.toLocaleDateString('pt-BR', options);
    const [day, month, year]: string[] = dateString.split('/');
    const todayDate: string = `${year}-${month}-${day}`;

    return todayDate;
}