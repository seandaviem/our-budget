'use client'

import { useState } from "react";
import DateRange from "./DateRange";
import { DateRangeProps } from "@/helpers/getDateRangeObj";

export default function DateRangeToggle({ dateRangeObj }: { dateRangeObj: DateRangeProps }) {

    const [showDateRange, setShowDateRange] = useState(dateRangeObj.hasRangeParams);

    return (
        <div>
            <div className="flex mb-3">
                <label htmlFor="date-range-toggle" className="me-2 text-sm font-medium text-gray-900 dark:text-white">Date Range: </label>
                <input 
                    type="checkbox"
                    id="date-range-toggle"
                    name="dateRangeToggle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    checked={showDateRange}
                    onChange={() => setShowDateRange(!showDateRange)}
                />
            </div>
            {showDateRange ? <DateRange dateRangeObj={dateRangeObj} /> : ''}
        </div>
    )
}