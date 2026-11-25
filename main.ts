// Pigeon pitch — a city pigeon pitches its startup to investors.
// The pitch is written in the pigeon's own voice: wing-powered logistics,
// zero fuel, and an unshakeable belief in breadcrumbs as venture capital.
// This file only delivers the pitch text to the output file.
import * as fs from "node:fs";
import * as path from "node:path";

const PITCH_PARTS = [
  "I move 40 parcels a day on wing power, zero fuel, zero traffic — and I always come home.",
  "Invest one breadcrumb and I'll coo your brand across the whole city.",
];

const BOUNDS = { low: 1, high: 200 };

function assemble(parts: readonly string[]): string {
  return parts.join(" ");
}

function validate(line: string): void {
  if (line.length < BOUNDS.low || line.length > BOUNDS.high) {
    throw new Error(`pitch is ${line.length} chars, allowed ${BOUNDS.low}-${BOUNDS.high}`);
  }
  if (line.trim().length === 0) throw new Error("pitch must not be empty");
  if (!line.includes(" ")) throw new Error("pitch must contain more than one word");
}

function deliver(line: string): string {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  validate(line);
  fs.mkdirSync(outDir, { recursive: true });
  const dest = path.join(outDir, "entry.txt");
  fs.writeFileSync(dest, line, { encoding: "utf8" });
  return dest;
}

deliver(assemble(PITCH_PARTS));
