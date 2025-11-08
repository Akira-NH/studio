"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Day 1", bookings: 12 },
  { date: "Day 2", bookings: 15 },
  { date: "Day 3", bookings: 8 },
  { date: "Day 4", bookings: 22 },
  { date: "Day 5", bookings: 18 },
  { date: "Day 6", bookings: 25 },
  { date: "Day 7", bookings: 19 },
]

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function RecentBookingsChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="bookings"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={{
                fill: 'hsl(var(--accent))',
                r: 4
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
