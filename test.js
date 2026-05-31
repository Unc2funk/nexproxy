import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER PAGE ERROR:', error.message));
  page.on('requestfailed', request => {
    console.log(`BROWSER REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText}`);
  });

  page.on('response', async response => {
    if (response.status() === 500) {
      console.log(`BROWSER 500 ERROR URL: ${response.url()}`);
      try {
        const text = await response.text();
        console.log(`BROWSER 500 ERROR BODY: ${text}`);
      } catch(e) {}
    }
  });

  await page.goto('http://localhost:8080/?reset=true');
  console.log("Navigating to reset URL...");
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("Typing URL...");
  
  // type a url and go
  await page.type('#url-input', 'https://google.com');
  await page.click('#go-btn');

  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("Test finished.");
  
  await browser.close();
})();
