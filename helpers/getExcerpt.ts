export function getExcerpt(text: string, emptyExcerpt = '', limit = 15): string {
    if (!text) {
        return emptyExcerpt;
    }

    const words = text.split(/\s+/);
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }

    return text;
}