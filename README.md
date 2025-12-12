# ai-sdk-bug

Repro for https://github.com/vercel/ai/issues/10915

1. add a vercel AI gateway api key to .env
2. run `pnpm test`
3. observe the log on line 13 is not executed
