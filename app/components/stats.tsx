export async function Stats() {
  const data = await fetch(`https://wojtek.im/api/stats/hexp3`, { next: { revalidate: 600 } });
  const json = await data.json();
  const metrics = json.stats;
  const total = metrics.find((metric: any) => metric.event === "converted.total")?.count ?? "0";

  return <p className="pt-2">{total.toLocaleString("en-US")} colors converted since Jan 2024.</p>;
}
