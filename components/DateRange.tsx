'use client'

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DateRangeProps } from "@/helpers/getDateRangeObj";
import { getFormattedDate } from "@/helpers/getDate";

export default function DateRange({ dateRangeObj }: { dateRangeObj: DateRangeProps }) {

    const currentDate = new Date(getFormattedDate()).toISOString().split('T')[0];

    const router = useRouter();
    const pathName = usePathname();

    const [startDate, setStartDate] = useState(dateRangeObj.startDate);
    const [endDate, setEndDate] = useState(dateRangeObj.endDate);
    const hasRangeParams = dateRangeObj.hasRangeParams;

    function handleClick() {

        router.push(`${pathName}?startDate=${startDate}&endDate=${endDate}`);
    }

    function handleClear() {
        setStartDate(dateRangeObj.startDate);
        setEndDate(dateRangeObj.endDate);
        router.push(`${pathName}`);
    }

    return (
        <div className="md:flex items-center">
            <input
                type="date"
                id="start-date"
                name="startDate"
                className="md:w-auto w-full border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                required
                max={endDate ? endDate : currentDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="mx-2 text-white">to</span>
            <input
                type="date"
                id="end-date"
                name="endDate"
                className="md:w-auto w-full border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                required
                min={startDate ? startDate : undefined}
                max={currentDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex gap-3 md:my-0 my-3">
                <button
                    className="focus:ring-4 font-medium rounded-lg text-sm md:ms-3 px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    onClick={handleClick}
                >
                    Apply
                </button>
                <button
                    className="focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-white bg-red-600 hover:bg-red-700 focus:ring-red-800"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
            <p className="md:ms-3 text-sm font-medium text-white">
                Current Date Range: { hasRangeParams ? `${startDate} to ${endDate}` : 'All Activities' }
            </p>
        </div>
    );
}