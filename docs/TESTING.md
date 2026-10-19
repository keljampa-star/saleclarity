# Judge testing guide

## Hosted demo

Open https://saleclarity.keljamarco.chatgpt.site/ . No ChatGPT account is required.
Use fictional information. Please do not enter confidential property details.

A reliable example that recommends both products:

1. Select **Help with both stages**.
2. Select **Prepare my seller paperwork**.
3. Select **A lease or property concern**.
4. Answer the solicitor follow-up question, for example **Not yet**.
5. Generate guidance. Watch the visible working indicator, then read the personalised insight and three actions.
6. Both Properoute and Completia should be recommended, with an explanation.
7. Choose an app and open PayPal Sandbox checkout. Use a Sandbox **personal buyer** account, not a real PayPal account or the developer's business account.
8. Approve the test payment. Return to SaleClarity, close the confirmation and open the activated app.
9. Repeat for the other product. Each product retains one card and one Open action.

Sandbox test funds are not real money. Demo passes persist only in the current
browser session. Closing an incognito session removes them.

The submission owner must supply a dedicated Sandbox buyer email/password in
Devpost's judge testing instructions. These credentials are not yet included in
this repository. Never publish a real account password, merchant password,
OpenAI API key or PayPal client secret.

## Allowances and unrestricted testing

The public hosted demo currently allows five AI requests per network address
per UTC clock hour and 100 across the site per UTC day, shared with its embedded
Properoute review. People on a shared network share that hourly allowance.
An attempted AI call consumes a slot even if the provider subsequently fails.

For unrestricted evaluation, run this repository locally with your own API key
and set `AI_LIMITS_DISABLED=true` in `.dev.vars`. This is a server/operator setting;
visitors cannot disable limits through the form. The submission owner still
needs to arrange hosted judge access that is not blocked by the public caps.
A saved screenshot or video does not substitute for working AI.

## Local verification

Node.js 24 or later is required. No npm packages are needed for the core.
Run `npm test` for recommendation rules, missing-answer clarification, quota
behaviour, both product passes, linked app routes and the mobile loading UI.
Run `npm start` for manual browser testing.

## Scope and limitations

This repository contains SaleClarity's runnable assistant and Sandbox purchase
journey. Properoute and Completia are separate connected products, linked to
their hosted instances. Their application source is not included here. The
hosted SaleClarity deployment embeds a separately maintained Properoute version;
the public core uses a redirect instead. SaleClarity AI works locally without
opening either external app; those hosted apps require an internet connection.

Payments use PayPal's JavaScript SDK create/capture flow. Pass activation is
client-side demonstration state, not production-grade payment entitlement or
licence enforcement. There is no webhook reconciliation, server-side licence
store, durable customer account or verified multi-party messaging in this core.
