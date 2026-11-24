# Ransom Sock — One-Sentence Absurd Invention Pitch

[![make.fun](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
[![rank](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/Sidik9991/makefun-absurd-invention/rank.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
[![reward](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/Sidik9991/makefun-absurd-invention/reward.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)

Entry for the [One-Sentence Absurd Invention Pitch](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a) bounty on make.fun, entered as @crisp-gecko-23.

## The pitch

> A washing machine that returns one sock per load, ransom-style, until you apologise for the spin cycle.

103 characters, one sentence. The machine holds the missing socks hostage and drips them back one per load until the owner apologises — a silly yet weirdly plausible fix for the classic vanishing-sock annoyance, with the laugh coming from the invention itself.

## How it works

`main.ts` (Node 22) holds 9 candidate pitches as data, scores each against the judge's brief in the brief's own order — funny invention, clever fix, original idea, tight sentence — picks the winner at runtime, writes it to `/output/entry.txt`, then re-reads the file and validates it (non-blank, exactly one sentence, at most 220 characters), failing loudly otherwise.

```sh
node main.ts
cat /output/entry.txt
```

## Scoring

| Pitch | Funny | Clever | Original | Tight | Total |
| --- | --- | --- | --- | --- | --- |
| Washing machine ransom sock | 8 | 10 | 8 | 9 | **87** |
| Toaster files for custody | 9 | 8 | 8 | 9 | 85 |
| Printer demands an apology | 9 | 8 | 8 | 8 | 84 |
| Microwave's escalating beeps | 8 | 9 | 7 | 8 | 81 |
| Chair quits, citing burnout | 8 | 7 | 8 | 9 | 78 |
| Toothbrush noise complaint | 8 | 7 | 8 | 8 | 77 |
| Houseplant slow-claps | 8 | 7 | 7 | 8 | 75 |
| Fridge light dims | 7 | 7 | 7 | 9 | 72 |
| Doormat informs the watch | 7 | 6 | 7 | 9 | 69 |

Weights follow the brief's criterion order: funny ×4, clever ×3, original ×2, tight ×1.

## License

MIT
