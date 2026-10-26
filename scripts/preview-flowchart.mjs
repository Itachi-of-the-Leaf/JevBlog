import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
for (const width of [320, 390, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.locator('#day').scrollIntoViewIfNeeded();
  const metrics = await page.evaluate(() => ({
    viewport: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    flowWidth: document.querySelector('.hackathon-flow').getBoundingClientRect().width,
    flowScrollWidth: document.querySelector('.hackathon-flow').scrollWidth,
    outcomeCards: [...document.querySelectorAll('.flow-outcome .flow-node')].map(node => ({
      top: node.getBoundingClientRect().top,
      bottom: node.getBoundingClientRect().bottom,
      height: node.getBoundingClientRect().height,
    })),
    eventTop: document.querySelector('.flow-event').getBoundingClientRect().top,
    eventMerge: getComputedStyle(document.querySelector('.flow-event-merge')).display,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  }));
  await page.screenshot({ path: `/home/soham/.hermes/cache/scratch/flowchart-${width}.png` });
  console.log(JSON.stringify({ ...metrics, pageErrors: errors }));
  await page.close();
}
await browser.close();
