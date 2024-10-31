export default function normalizeDate(date: string) {
    if (!date) {
        return
    }
    const partes = date.split('-');
    const dataInvertida = partes.reverse().join('-');
    return dataInvertida;
}