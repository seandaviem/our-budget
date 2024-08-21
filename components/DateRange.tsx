'use client'

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DateRangeProps } from "@/helpers/getDateRangeObj";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

export default function DateRange({ dateRangeObj }: { dateRangeObj: DateRangeProps }) {

    const currentDate = new Date(getFormattedDate());

    const router = useRouter();
    const pathName = usePathname();
    const startDate = dateRangeObj.hasRangeParams ? new Date(dateRangeObj.startDate) : null;
    const endDate = dateRangeObj.hasRangeParams ? new Date(dateRangeObj.endDate) : null;

    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([startDate, endDate]);

    const icon = <IconCalendar style={{ width: 18, height: 18 }} stroke={1.5} />;

    function handleClick() {

        router.push(`${pathName}?startDate=${getFormattedDate(dateRange[0], true)}&endDate=${getFormattedDate(dateRange[1], true)}`);
    }


    // TODO: Look into this causing two re-renders and if necessary to fix
    function handleClear() {
        setDateRange([null, null]);
        router.push(`${pathName}`);
    }

    return (
        <div className="md:flex items-center">
            <DatePickerInput
                type="range"
                id="date-range"
                name="dateRange"
                placeholder="Select Date Range"
                leftSection={icon}
                leftSectionPointerEvents="none"
                maxDate={currentDate}
                value={dateRange}
                onChange={setDateRange}
            />
            <div className="flex gap-3 md:my-0 my-3">
                <button
                    className="btn btn-primary md:ms-3"
                    onClick={handleClick}
                >
                    Apply
                </button>
                <button
                    className="btn btn-red"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}