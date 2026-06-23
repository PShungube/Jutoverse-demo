import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  ComposedChart,
} from "recharts";

import { useMemo } from "react";
import { useI18n } from "../i18n/I18nProvider";

const tooltipStyle = {
  backgroundColor: "#141e30",
  border: "1px solid rgba(45,212,191,0.15)",
  borderRadius: "6px",
  fontSize: "11px",
  color: "#e2e8f0",
};

const C = {
  teal: "#2dd4bf",
  amber: "#f59e0b",
  rose: "#f43f5e",
  green: "#22c55e",
  violet: "#a78bfa",
  slate: "#64748b",
};

export function AnalyticsDashboard({ data }: any) {
  const { text } = useI18n();

  if (!data) return null;

  // Safe defaults
  const qualityTrend: any[] = [];
  const sentimentTrend: any[] = [];

  const channelData = useMemo(() => {
    const map = new Map<string, number>();

    (data.interactions || []).forEach((i: any) => {
      map.set(i.channel, (map.get(i.channel) || 0) + 1);
    });

    return Array.from(map.entries()).map(([channel, volume]) => ({
      channel,
      volume,
    }));
  }, [data]);

  const taxonomy = data.taxonomy ?? [];
  const forecast = data.forecast ?? [];

  return (
    <div className="space-y-6">
      {/* QUALITY TREND */}

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-3">
          Quality Score Trend
        </h3>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={qualityTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <ReferenceLine
              y={85}
              stroke={C.amber}
              strokeDasharray="4 4"
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={C.teal}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CHANNEL VOLUME */}

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-3">
          Channel Volume
        </h3>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={channelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="volume" fill={C.teal} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SENTIMENT */}

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-3">
          Sentiment Trend
        </h3>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={sentimentTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />

            <Area
              dataKey="positive"
              stackId="1"
              stroke={C.green}
              fill={C.green + "40"}
            />

            <Area
              dataKey="neutral"
              stackId="1"
              stroke={C.slate}
              fill={C.slate + "40"}
            />

            <Area
              dataKey="negative"
              stackId="1"
              stroke={C.rose}
              fill={C.rose + "40"}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* TAXONOMY */}

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-3">
          Inquiry Taxonomy
        </h3>

        <div className="space-y-2">
          {taxonomy.map((t: any) => (
            <div
              key={t.id}
              className="flex justify-between text-xs"
            >
              <span>{text(t.label)}</span>
              <span>{t.share}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* FORECAST */}

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-3">
          Demand Forecast
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={forecast}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />

            <Bar dataKey="value" fill={C.violet} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}