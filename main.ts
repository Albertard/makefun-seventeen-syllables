// make.fun — "Seventeen Syllables of Debugging" (u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
//
// Writes one haiku about debugging, three lines in the 5-7-5 syllable
// shape, to /output/entry.txt. The haiku is fixed: the build was green
// once, midnight broke it softly, and the turn is a single missing
// bracket — the smallest cause for the longest night.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The build was green once\n" +
  "then midnight broke it softly\n" +
  "one missing bracket";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-200 Unicode code points, and not only white space.
// Check the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 200) {
    throw new Error(`entry is ${size} characters, outside the 1-200 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
}

checkFitsGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
