# CSV Parser

![Build](https://img.shields.io/github/workflow/status/dilanluna/csv-parser/Release/main) ![Version](https://img.shields.io/npm/v/@dilanluna/csv-parser) ![Node Version](https://img.shields.io/node/v/@dilanluna/csv-parser) ![License](https://img.shields.io/github/license/dilanluna/csv-parser)

Simple and lightweight package to parse csv files into javascript objects.

## Installation

Package require [node.js](https://nodejs.org/en/download) version 10 or above, and can be installed with `npm`:

```bash
$ npm install @dilanluna/csv-parser
```

## Usage

Import the module in your app.

```js
import csvParser from '@dilanluna/csv-parser';
```

Or if you're using commonjs:

```js
const csvParser = require('@dilanluna/csv-parser').default;
```

The `csvParser` is a function that accepts the following configuration object:

```ts
{
  filePath: string;
  separator?: string;
  extractHeaderFromFirstLine?: boolean;
}
```

Configuration in detail.

| Property                     | Description                                                         | Default |
| ---------------------------- | ------------------------------------------------------------------- | ------- |
| `filePath`                   | Path to csv file. This property is **required**.                    |         |
| `separator`                  | Separator character of the csv file.                                | `";"`   |
| `extractHeaderFromFirstLine` | Determines if headers are extracted from the first line of the file | `false` |

Once called to `csvParser` function with apropiate config, it returns a `Promise` resolved with an array of parsed objects or rejected if something went wrong.

### Example

Supose you have a **csv file** called `fruits.csv` like this:

```csv
banana;12
apple;5
melon;4
watermelon;2
```

In your code you parse this file something like this:

```js
import csvParser from '@dilanluna/csv-parser';

const fruits = await csvParser({
  filePath: 'fruits.csv',
});

console.log(fruits);
// Output
// [
//   { 0: 'banana', 1: '12' },
//   { 0: 'apple', 1: '5' },
//   { 0: 'melon', 1: '4' },
//   { 0: 'watermelon', 1: '2' }
// ]
```

You can map keys in the parsed object from the first line of the **csv file**.

Adding headers in the first line

```
name;count
banana;12
apple;5
melon;4
watermelon;2
```

Now add `extractHeaderFromFirstLine` to configuration object.

```js
import csvParser from '@dilanluna/csv-parser';

const fruits = await csvParser({
  filePath: 'fruits.csv',
  extractHeaderFromFirstLine: true,
});

console.log(fruits);
// Output
// [
//   { name: 'banana', count: '12' },
//   { name: 'apple', count: '5' },
//   { name: 'melon', count: '4' },
//   { name: 'watermelon', count: '2' }
// ]
```

## License

[MIT](https://github.com/dilanluna/csv-parser/blob/main/LICENSE)
