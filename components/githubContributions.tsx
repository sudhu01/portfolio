import { format, subDays, eachDayOfInterval } from "date-fns";
import GithubContributionsGrid from "@/components/githubContributionsGrid";

type Props = {
  username: string;
};

async function getContributions(username: string) {
  const token = process.env.NEXT_PUBLIC_GITHUB_PAT;

  const query = `
    query($userName:String!, $from:DateTime!, $to:DateTime!) {
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const from = new Date(subDays(new Date(), 365));
  from.setHours(0, 0, 0, 0);
  const to = new Date();
  to.setHours(23, 59, 59, 999);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        userName: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GitHub API error: ${result.errors[0].message}`);
  }

  const map: Record<string, number> = {};

  result.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
    (week: { contributionDays: Array<{ date: string; contributionCount: number }> }) => {
      week.contributionDays.forEach((day) => {
        map[day.date] = day.contributionCount;
      });
    }
  );

  const days = eachDayOfInterval({
    start: subDays(new Date(), 365),
    end: new Date(),
  });

  return days.map((day) => {
    const key = format(day, "yyyy-MM-dd");
    return { date: key, count: map[key] || 0 };
  });
}

export default async function GithubContributions({ username }: Props) {
  const data = await getContributions(username);

  const weeks: { date: string; count: number }[][] = [];
  let current: { date: string; count: number }[] = [];

  data.forEach((day) => {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  });
  if (current.length) weeks.push(current);

  const total = data.reduce((a, b) => a + b.count, 0);

  // One label per week column. A column is labelled with the month that owns
  // most of it (its middle day), and only on the column where that month first
  // appears. Labels need MIN_GAP columns of clearance so names never collide.
  const MIN_GAP = 3;

  const starts: { idx: number; label: string }[] = [];
  let lastKey = "";
  weeks.forEach((week, idx) => {
    const middle = week[Math.floor((week.length - 1) / 2)];
    if (!middle) return;
    const date = new Date(middle.date + "T12:00:00");
    const key = format(date, "yyyy-MM");
    if (key === lastKey) return;
    lastKey = key;
    starts.push({ idx, label: format(date, "MMM") });
  });

  // The window opens mid-month, so the first column often belongs to a month
  // that is a few days wide. Labelling it would crowd out — and therefore hide
  // — the first real month, so drop the sliver instead.
  if (starts.length > 1 && starts[1].idx < MIN_GAP) starts.shift();

  const months = weeks.map(() => "");
  let lastLabelIdx = -MIN_GAP;
  starts.forEach(({ idx, label }) => {
    if (idx - lastLabelIdx < MIN_GAP) return;
    lastLabelIdx = idx;
    months[idx] = label;
  });

  return (
    <GithubContributionsGrid
      weeks={weeks}
      months={months}
      total={total}
      username={username}
    />
  );
}
