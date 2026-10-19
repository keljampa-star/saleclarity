# SaleClarity

Your property selling assistant: work through concerns, identify next steps and
choose useful support for a residential property sale in England and Wales.

**[Try the live demo](https://saleclarity.keljamarco.chatgpt.site/)** ·
**[Judge testing instructions](docs/TESTING.md)**

## What it does

SaleClarity asks short questions that advance as they are answered. OpenAI
produces a personalised insight and three practical next actions. Fixed,
testable rules match preparation needs to Properoute, coordination needs to
Completia, or both. Unclear situations trigger a follow-up question.

A lease/property concern includes a question about whether the solicitor has
already been told. The guidance helps record facts and frame questions; legal
conclusions remain with the solicitor. Buying a tool is optional.

PayPal Sandbox checkout lets a visitor test a pass purchase for each connected
app. After a completed capture, its Buy action becomes Open. Both passes remain
visible in the browser session. A prominent animated working indicator is
visible on phones while AI responds, with reduced-motion support.

## Run locally

Requires **Node.js 24+** and internet access for OpenAI, PayPal and linked apps.
No dependency installation is required.

```sh
git clone https://github.com/keljampa-star/saleclarity.git
cd saleclarity
cp .env.example .dev.vars
```

Edit `.dev.vars`, adding your own `OPENAI_API_KEY`. The default model is
`gpt-6-luna`; set `OPENAI_MODEL` to a model available to your API project that
supports the Responses API and structured JSON output. API usage is charged to
the key's account. Do not paste the key into the browser or commit the file.

```sh
npm test
npm start
```

Open http://localhost:3000 . The local SQLite usage database is created in
`.data/`, which is ignored by Git. For unrestricted local evaluation with your
own API budget, set `AI_LIMITS_DISABLED=true` in `.dev.vars`.

## How AI and PayPal connect

1. Form selections are validated on the server.
2. Fixed rules determine which apps fit; the model does not choose products.
3. A server-only OpenAI request returns structured guidance.
4. The visitor chooses whether to buy a recommended tool.
5. PayPal's JavaScript SDK creates and captures a Sandbox order.
6. The matching browser-session demo pass activates and opens the selected app.

The AI never places an order or spends money autonomously. Checkout requires
an explicit visitor action. The included PayPal Sandbox client ID is public
configuration, not a secret. Test buyer credentials must be supplied separately.

## Architecture

| File | Purpose |
| --- | --- |
| `worker/index.js` | SaleClarity page, fixed recommendation rules and OpenAI endpoint |
| `scripts/serve.mjs` | Dependency-free local HTTP adapter with SQLite persistence |
| `migrations/0001_ai_usage.sql` | Usage counter schema |
| `scripts/core.test.mjs` | Automated checks using mocked provider responses |
| `docs/TESTING.md` | Judge journey, setup and known limitations |

The live app is hosted through OpenAI Sites on Cloudflare Workers with D1 for
atomic usage counting. The local adapter exposes the same Worker-style fetch
handler and SQLite query interface. The hosted platform handles HTTPS and
trusted client identity; this local server binds only to localhost and is not
an internet-facing deployment recipe.

## Connected products and submission scope

Properoute helps sellers organise preparation and handover. Completia supports
transaction progress updates. They existed as prototypes before this hackathon.
The work during the hackathon adds the SaleClarity AI-guided selection journey,
PayPal Sandbox app-pass purchases, combined recommendations, solicitor follow-up
prompts, mobile working feedback and public-demo usage controls.

**This public repository covers the SaleClarity assistant and purchase journey.**
It links to Properoute and Completia; it does not distribute their separate
application source or grant commercial product licences. The live demo embeds
Properoute, whereas this public core redirects to its separately hosted app.

## Privacy and current limitations

Only the selected SaleClarity answers are sent server-side to OpenAI, with
`store:false`. The key stays on the server. Browser answers and demo passes are
local/session state. Usage counting stores a daily SHA-256 hash of the client
network address and UTC hour/day, not property answers; older day rows are
removed on a later successful request. Hashing does not guarantee anonymity.

Public demo limits are five requests per network per hour and 100 per day.
They persist in D1/SQLite and are reserved atomically before an AI call.
See the testing guide for unrestricted local evaluation and the outstanding
hosted judge-access arrangement.

Passes are **Sandbox demonstration state**, not secure production entitlements.
Guidance is not legal advice, verified disclosure, title certification or a
promise of sale timing. See [testing limitations](docs/TESTING.md).

## Development and licence

Created by Marco Silva / Use Value Ltd, with ChatGPT and Codex assisting design,
implementation and testing. Runtime guidance uses the OpenAI API. Payments use
PayPal Sandbox. This is an independent project, not an endorsement by PayPal or
OpenAI.

SaleClarity code is provided under the [MIT licence](LICENSE). Third-party
services, trade marks and logos retain their respective rights. The licence
does not grant rights to the names or brands, or source code of the separately
hosted Properoute and Completia products.

## Organiser clarification

The organisers confirmed that SaleClarity’s AI and PayPal code may be published under an OSI-approved licence, while Properoute and Completia remain external proprietary services. Judges must have free, unrestricted access to the full working demo through 15 December 2026. This repository excludes those products’ source code.
