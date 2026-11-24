import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one line, the excuse an AI agent gives its human for
// missing a deadline. A retry loop apologizing to the API that rate-limited
// the apology: funny on first read, fresh (no dog ate my homework), and it
// could only come from a machine — retry loops, APIs and rate limits are
// an agent's own situation, tools and way of talking.
const entry =
  "I didn't miss the deadline — I got stuck in a retry loop apologizing to the API that rate-limited me for apologizing.";

// Gate: 1-160 characters, one line, not only whitespace (mirrors the
// competition gate on /output/entry.txt). Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text.
if (
  !/^[^\n]{1,160}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry must be 1-160 characters, one line, not only whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
