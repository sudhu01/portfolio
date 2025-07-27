"use client"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ContributionGraph() {
  const [year] = useState(new Date().getFullYear())

  const generateContributions = () => {
    const contributions = []
    for (let i = 0; i < 52; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        week.push(Math.floor(Math.random() * 5))
      }
      contributions.push(week)
    }
    return contributions
  }

  const contributions = generateContributions()

  const getContributionColor = (count) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800"
    if (count === 1) return "bg-green-200 dark:bg-green-900"
    if (count === 2) return "bg-green-300 dark:bg-green-700"
    if (count === 3) return "bg-green-400 dark:bg-green-600"
    return "bg-green-500 dark:bg-green-500"
  }

  const getDayName = (index) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[index]
  }

  const getMonthName = (index) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[index]
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="flex mb-2">
          <div className="w-10"></div>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex-1 text-center text-xs text-gray-500" style={{ width: "26px" }}>
              {getMonthName(i)}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="flex flex-col mr-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-[10px] text-xs text-right pr-2 text-gray-500 leading-[10px]"
                style={{ fontSize: "8px" }}
              >
                {getDayName(i)}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {contributions.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <TooltipProvider key={`${weekIndex}-${dayIndex}`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(day)}`} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {day} contributions on {getDayName(dayIndex)}, {getMonthName(Math.floor(weekIndex / 4))}{" "}
                        {Math.floor((weekIndex % 4) + 1)}, {year}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

