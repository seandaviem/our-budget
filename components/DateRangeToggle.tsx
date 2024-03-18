'use client'

import { useState } from "react";
import DateRange from "./DateRange";
import { DateRangeProps } from "@/helpers/getDateRangeObj";

export default function DateRangeToggle({ dateRangeObj }: { dateRangeObj: DateRangeProps }) {

    const [showDateRange, setShowDateRange] = useState(dateRangeObj.hasRangeParams);

    return (
        <div>
            <div className="flex mb-3">
                <label htmlFor="date-range-toggle" className="me-2 text-sm font-medium text-white">Date Range: </label>
                <input 
                    type="checkbox"
                    id="date-range-toggle"
                    name="dateRangeToggle"
                    className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    checked={showDateRange}
                    onChange={() => setShowDateRange(!showDateRange)}
                />
            </div>
            {showDateRange ? <DateRange dateRangeObj={dateRangeObj} /> : ''}
        </div>
    )
}