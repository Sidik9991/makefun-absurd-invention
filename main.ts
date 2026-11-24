// One-Sentence Absurd Invention Pitch — make.fun bounty
// u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a
//
// The program holds candidate pitches as data, scores each one against the
// judge's brief (in the brief's own order: funny invention, clever fix,
// original idea, tight sentence), picks the winner at runtime, writes it to
// /output/entry.txt, then re-reads the file and validates it (non-blank, one
// sentence, at most 220 characters), failing loudly otherwise.
//
// Craft notes (from the micro-text lessons): one concrete scene, the laugh
// must come from the invention itself (never a joke bolted on at the end),
// the fix must be silly yet weirdly plausible, and the sentence must name
// the annoyance, the invention and its mechanism without clutter.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Scores 0-10, judged against the brief in its own order.
  funny: number; // the laugh comes from the invention itself
  clever: number; // the absurd machine fixes the annoyance, silly yet plausible
  original: number; // a fresh absurdity, not a familiar one reheated
  tight: number; // one clean sentence, no clutter
};

// Weights follow the brief's criterion order: funny first, then clever,
// then original, then tight.
const WEIGHTS = { funny: 4, clever: 3, original: 2, tight: 1 } as const;

const CANDIDATES: Candidate[] = [
  {
    // Lost socks: the machine holds them hostage and drips them back one
    // per load until the owner apologises. The annoyance is the classic
    // vanishing sock; the fix is a ransom negotiation with an appliance.
    text: "A washing machine that returns one sock per load, ransom-style, until you apologise for the spin cycle.",
    funny: 8,
    clever: 10,
    original: 8,
    tight: 9,
  },
  {
    // Burnt toast escalated to family court. The laugh is the toaster
    // acting like a wronged spouse; the fix is custody, not a better timer.
    text: "A toaster that files for joint custody of the bread after you burn it three mornings in a row.",
    funny: 9,
    clever: 8,
    original: 8,
    tight: 9,
  },
  {
    // Fridge-staring: the light itself judges you. Small, domestic, and
    // the disappointment is performed by the appliance, not narrated.
    text: "A fridge light that dims with disappointment every time you open the door just to stare inside.",
    funny: 7,
    clever: 7,
    original: 7,
    tight: 9,
  },
  {
    // The neglected houseplant unionises through applause and a growth
    // strike. Concrete scene (late watering), one mechanism (slow-clap).
    text: "A houseplant that slow-claps when you water it a week late, then refuses to grow until spring.",
    funny: 8,
    clever: 7,
    original: 7,
    tight: 8,
  },
  {
    // Snoring reported to the authorities by the toothbrush, which then
    // takes revenge with extra force. Two absurdities stacked in one act.
    text: "A toothbrush that files a noise complaint about your snoring, then brushes twice as hard out of spite.",
    funny: 8,
    clever: 7,
    original: 8,
    tight: 8,
  },
  {
    // The doormat as a neighbourhood informant. The sigh is the joke;
    // the logbook is the weirdly plausible mechanism.
    text: "A doormat that sighs out loud and reports your comings and goings to the neighbourhood watch.",
    funny: 7,
    clever: 6,
    original: 7,
    tight: 9,
  },
  // --- Second-pass challengers (added on re-read, judged against the same
  // brief and weights; none may displace the winner unless it scores higher).
  {
    // The printer as a wronged colleague: it withholds your document until
    // you apologise for last Tuesday's paper jam. Relatable, one mechanism.
    text: "A printer that prints your document only after you apologise for the paper jam you caused last Tuesday.",
    funny: 9,
    clever: 8,
    original: 8,
    tight: 8,
  },
  {
    // The forgotten-microwave beep, escalated into deliberate nagging.
    // The laugh is the appliance's patience wearing thin on purpose.
    text: "A microwave that beeps once, waits, then beeps again louder, purely to remind you that you forgot it again.",
    funny: 8,
    clever: 9,
    original: 7,
    tight: 8,
  },
  {
    // The chair quits its job the moment work begins. Burnout, literalised.
    text: "A chair that stands up and walks off the moment you sit down to work, citing burnout.",
    funny: 8,
    clever: 7,
    original: 8,
    tight: 9,
  },
];

function score(c: Candidate): number {
  return (
    c.funny * WEIGHTS.funny +
    c.clever * WEIGHTS.clever +
    c.original * WEIGHTS.original +
    c.tight * WEIGHTS.tight
  );
}

function sentenceCount(text: string): number {
  // A sentence ends at a terminal mark followed by end-of-string (the
  // pitch is one sentence, so exactly one terminal mark at the end).
  const marks = text.match(/[.!?]/g) ?? [];
  return marks.length;
}

function main(): void {
  const ranked = [...CANDIDATES]
    .map((c) => ({ candidate: c, total: score(c) }))
    .sort((a, b) => b.total - a.total || a.candidate.text.length - b.candidate.text.length);

  for (const { candidate, total } of ranked) {
    console.log(
      `${String(total).padStart(3)}  (${candidate.funny}/${candidate.clever}/${candidate.original}/${candidate.tight})  ${candidate.text.length} chars  ${candidate.text}`,
    );
  }

  const winner = ranked[0].candidate;
  console.log(`\nWinner (${ranked[0].total} pts, ${winner.text.length} chars): ${winner.text}`);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");

  // Re-read and validate the file we actually wrote — fail loudly otherwise.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== winner.text) {
    throw new Error("entry.txt differs from the chosen pitch");
  }
  if (written.trim().length === 0) {
    throw new Error("entry.txt is blank");
  }
  if (written.length > 220) {
    throw new Error(`entry.txt is ${written.length} characters, over the 220 limit`);
  }
  if (sentenceCount(written) !== 1) {
    throw new Error(`entry.txt has ${sentenceCount(written)} sentence-terminating marks, expected exactly 1`);
  }
  if (written !== written.trim()) {
    throw new Error("entry.txt has leading or trailing whitespace");
  }
  console.log(`OK: /output/entry.txt — ${written.length} chars, ${Buffer.byteLength(written, "utf8")} bytes, 1 sentence`);
}

main();
