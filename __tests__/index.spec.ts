import partition from "../";

test("should handle empty array", () => {
  expect(partition([])).toEqual([[], []]);
  expect(partition([], 4)).toEqual([[], [], [], []]);
});

test("should partition trivial number array", () => {
  expect(partition([2, 4])).toEqual([[4], [2]]);
});

test("should partition small example into 2 subsets", () => {
  expect(partition([3, 1, 1, 2, 2, 1])).toEqual([
    [1, 3, 1],
    [1, 2, 2],
  ]);
});

test("should partition small example into 3 subsets", () => {
  expect(partition([3, 1, 1, 2, 2, 1], 3)).toEqual([
    [1, 2, 1],
    [2, 1],
    [3], //
  ]);
});

test("should partition adversarial example into suboptimal result", () => {
  expect(partition([5, 5, 5, 4, 4, 3, 3, 1], 3)).toEqual([
    // Not optimal: [5,5], [3,3,4], [1,4,5] would be better.
    [3, 3, 5],
    [4, 1, 5],
    [4, 5],
  ]);
});

test("should partition objects", () => {
  expect(partition([{ x: 2 }, { x: 4 }], 2, (d) => d.x)).toEqual([
    [{ x: 4 }],
    [{ x: 2 }],
  ]);
});
