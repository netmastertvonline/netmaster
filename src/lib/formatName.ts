export default function formatName(name: string) {
    if (!name) {
        return null
    }    
    const words = name.trim().split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    const formattedName = words.join(" ");
    return formattedName
}