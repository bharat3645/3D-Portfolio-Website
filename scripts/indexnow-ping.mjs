/**
 * IndexNow ping — notifies Bing, Yandex & the IndexNow network that the site's
 * URLs changed, so they recrawl in minutes/hours instead of waiting for a
 * scheduled crawl. Runs as `postbuild` (see package.json).
 *
 * No-ops unless this is a Vercel PRODUCTION build, so local `npm run build`
 * never spams the endpoint. Google does not consume IndexNow — for Google you
 * still must use Search Console → Request Indexing (only the owner can do that).
 */

const KEY = '055f17684b75cd34ffbd747c29dec8b2';
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://bharat3645.vercel.app').replace(/\/$/, '');

// Only ping from a real Vercel PRODUCTION deploy. Local/preview builds no-op,
// so `npm run build` on your machine never touches the network.
if (process.env.VERCEL_ENV !== 'production') {
    console.log(`[indexnow] skipped — not a production deploy (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'})`);
    process.exit(0);
}

const host = new URL(SITE).host;
const urlList = [
    `${SITE}/`,
    `${SITE}/blog`,
    `${SITE}/work/genai-assistant`,
    `${SITE}/work/federated-learning`,
    `${SITE}/work/gigx`,
];

const body = {
    host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
};

try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
    });
    console.log(`[indexnow] ${res.status} ${res.statusText} — pinged ${urlList.length} URLs`);
} catch (err) {
    // Never fail the build over a best-effort SEO ping.
    console.log(`[indexnow] skipped — ${err?.message ?? err}`);
}
