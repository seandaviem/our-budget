import { getFormattedDate } from "./getDate";

export interface DateRangeProps {
    startDate: string;
    endDate: string;
    hasRangeParams: boolean;
}

export function getDateRangeObj( searchParams: { [key: string]: string | string[] | undefined }): DateRangeProps {

    const currentDate = new Date(getFormattedDate());
    let hasValidDates = true;
    let hasRangeParams = false;
    if (searchParams.startDate && searchParams.endDate) {

        hasRangeParams = true;
        const sd = new Date((searchParams.startDate).toString());
        const ed = new Date((searchParams.endDate).toString());
        if (sd.getTime() > ed.getTime() || ed.getTime() > currentDate.getTime() || sd.getTime() > currentDate.getTime()) {
            hasValidDates = false;
        }
    }

    const startDate = (searchParams.startDate && hasValidDates) ? searchParams.startDate.toString() : new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-01`).toISOString().split('T')[0];
    const endDate = (searchParams.endDate && hasValidDates) ? searchParams.endDate.toString() : new Date(currentDate).toISOString().split('T')[0];

    return {
        startDate,
        endDate,
        hasRangeParams
    };
}