# JavaScript implementation for largest differencing method

Implementation based on algorithm invented by
[Narendra Karmarkar and Richard M. Karp](https://en.wikipedia.org/wiki/Largest_differencing_method).

## Install

```sh
npm install ldm-partition
```

## Usage

```js
import partition from 'ldm-partition';

partition([8, 7, 6, 5, 4], 2);
//=> [[4, 7, 5], [8, 6]]

partition([{ x: 2 }, { x: 4 }], 2, (d) => d.x));
//=> [[{ x: 4 }], [{ x: 2 }]]
```
