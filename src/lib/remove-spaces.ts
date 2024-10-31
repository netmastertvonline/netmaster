export default function removeSpaces(data: string) {
    if (!data) {
        return null
    }    
    return data.trim()
}