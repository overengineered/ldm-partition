// Based on https://en.wikipedia.org/wiki/Largest_differencing_method

export default function partition<T>(
  items: Iterable<T>,
  k: number = 2,
  getWeight: (item: T) => number = (x) => Number(x)
): T[][] {
  const jobs = [...items].map((x) => [[x], ...[...Array(k - 1)].map(() => [])]);
  while (jobs.length > 1) {
    const [a, b] = select2(jobs, getWeight);
    const [jobA, jobB] = [jobs[a], jobs[b]];
    const merged = jobA.map((l, i) => [...l, ...jobB[jobB.length - 1 - i]]);
    const cache = new Map<T[], number>();
    merged.forEach((list) => cache.set(list, weigh(list, getWeight)));
    merged.sort((l1, l2) => (cache.get(l2) ?? 0) - (cache.get(l1) ?? 0));
    jobs[a] = merged;
    jobs.splice(b, 1);
  }
  return jobs.length == 0 ? [...Array(k)].map(() => []) : jobs[0];
}

function select2<T>(
  buckets: T[][][],
  getWeight: (item: T) => number
): [number, number] {
  const diffs = buckets.map((it) => measureDiff(it, getWeight));
  const max1 = Math.max(...diffs);
  const a = diffs.indexOf(max1);
  diffs[a] = -Infinity;
  const max2 = Math.max(...diffs);
  const b = diffs.indexOf(max2);
  return [a, b];
}

function measureDiff<T>(bucket: T[][], getWeight: (item: T) => number): number {
  const max = weigh(bucket[0], getWeight);
  const min = weigh(bucket[bucket.length - 1], getWeight);
  return max - min;
}

function weigh<T>(list: T[], getWeight: (item: T) => number) {
  return list.reduce((sum, it) => sum + getWeight(it), 0);
}
