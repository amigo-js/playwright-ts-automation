import fs from "fs";
import path from "path";

export function loadTestData(market: string) {
  const filePath = path.join(
    __dirname,
    `../test-data/${market.toLowerCase()}.json`
  );
  if (!fs.existsSync(filePath)) {
    throw new Error(`Test data file not found for market: ${market}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
