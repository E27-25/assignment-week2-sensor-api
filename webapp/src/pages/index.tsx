import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  value: {
    label: "Sensor Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type SensorData = {
  id: number;
  sensorName: string;
  sensorType: string;
  value: number;
  unit: string | null;
  timestamp: number | string;
};

const fetchSensors = async () => {
  const response = await axios.get("/sensors?limit=50", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
    },
    baseURL: import.meta.env.VITE_API_URL,
  });
  return response.data;
};

function IndexPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sensors"],
    queryFn: fetchSensors,
    refetchInterval: 5000, // Refetch every 5 seconds
    select: (data: unknown) => {
      if (Array.isArray(data)) {
        return (data as SensorData[])
          .sort((a, b) => {
            const timeA = typeof a.timestamp === 'number' ? a.timestamp * 1000 : new Date(a.timestamp).getTime();
            const timeB = typeof b.timestamp === 'number' ? b.timestamp * 1000 : new Date(b.timestamp).getTime();
            return timeA - timeB;
          })
          .map((item) => {
            const time = typeof item.timestamp === 'number' ? new Date(item.timestamp * 1000) : new Date(item.timestamp);
            return {
              ...item,
              timestampFormatted: time.toLocaleString(),
              timestampShort: time.toLocaleTimeString(),
            };
          });
      }
      return [];
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <main className="container mx-auto max-w-6xl w-full space-y-8 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">IoT Sensor Dashboard</h1>
          <p className="text-muted-foreground">Real-time sensor data monitoring</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sensor Data Chart</CardTitle>
            <CardDescription>
              {isLoading
                ? "Loading sensor data..."
                : error
                  ? "Error loading sensor data"
                  : `Showing ${data?.length || 0} sensor readings`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-muted-foreground">Loading...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-red-500">Error loading data. Please check your API connection.</div>
              </div>
            ) : !data || data.length === 0 ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-muted-foreground">No sensor data available</div>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={data}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                    bottom: 12,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestampShort"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        labelFormatter={(_, payload) => {
                          if (payload && payload[0]) {
                            return payload[0].payload.timestampFormatted;
                          }
                          return "";
                        }}
                        formatter={(value, _name, item) => (
                          <>
                            <div className="flex flex-col gap-1">
                              <span className="text-muted-foreground">
                                {item.payload.sensorName} ({item.payload.sensorType})
                              </span>
                              <span className="font-mono font-medium">
                                {value} {item.payload.unit || ""}
                              </span>
                            </div>
                          </>
                        )}
                      />
                    }
                  />
                  <Area
                    dataKey="value"
                    type="monotone"
                    fill="var(--color-value)"
                    fillOpacity={0.4}
                    stroke="var(--color-value)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sensor Readings</CardTitle>
            <CardDescription>Latest 10 sensor readings from the database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Sensor</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-right p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.slice(0, 10).reverse().map((reading) => (
                    <tr key={reading.id} className="border-b">
                      <td className="p-2 text-sm text-muted-foreground">
                        {reading.timestampFormatted}
                      </td>
                      <td className="p-2">{reading.sensorName}</td>
                      <td className="p-2">{reading.sensorType}</td>
                      <td className="p-2 text-right font-mono">
                        {reading.value} {reading.unit || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default IndexPage;
