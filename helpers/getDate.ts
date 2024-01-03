export function getFormattedDate(isoDate: Date): string {
    const date = isoDate ? new Date( isoDate.getTime() - isoDate.getTimezoneOffset() * -60000 ) : new Date();
    

    return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
}