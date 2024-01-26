const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    })

    try {
        const page = await browser.newPage()
        await page.goto('https://www.youtube.com/watch?v=qo_fUjb02ns', {
            waitUtil: 'networkidle2'
        })
        // await page.screenshot({ path: "screenshot.png" })
        await page.pdf({ path: 'youtube.pdf' })
    } catch (e) {
        console.error(e)
    } finally {
        await browser.close()
    }
})()

