export function getCurrentDate() {
    let currentDate = new Date().toJSON().slice(0, 10);

    return currentDate;
}