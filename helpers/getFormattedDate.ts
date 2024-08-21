export function getFormattedDate(isoDate: Date | null = null, isParams: boolean = false): string {
    const date = isoDate ? new Date( isoDate.getTime() - isoDate.getTimezoneOffset() * -60000 ) : new Date();
    
    if (isParams) {
        return date.toISOString().split('T')[0];
    }

    return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
}