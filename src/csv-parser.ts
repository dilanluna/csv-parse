import { createReadStream } from 'fs';
import { createInterface } from 'readline';

type CsvHeader = string | number;

type CsvObject = {
  [key: CsvHeader]: any;
};

type CsvParserOptions = {
  filePath: string;
  separator?: string;
  extractHeaderFromFirstLine?: boolean;
};

export default async function parseCsv({
  filePath,
  separator = ';',
  extractHeaderFromFirstLine = false,
}: CsvParserOptions): Promise<CsvObject[]> {
  const file = createReadStream(filePath);
  const readline = createInterface({
    input: file,
  });

  const headers: CsvHeader[] = [];
  const collection: CsvObject[] = [];
  let isFirstLine = true;

  for await (const line of readline) {
    const row = line.split(separator);
    const entries = row.entries();

    if (extractHeaderFromFirstLine && isFirstLine) {
      for (const [_, value] of entries) {
        headers.push(value);
      }

      isFirstLine = false;
      continue;
    }

    const element: CsvObject = {};
    for (const [key, value] of entries) {
      const header = extractHeaderFromFirstLine ? headers[key] : key;
      element[header] = value;
    }

    collection.push(element);
  }

  return collection;
}
