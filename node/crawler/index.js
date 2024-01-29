const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    })

    try {
        const page = await browser.newPage()
        await page.goto('https://www.youtube.com/watch?v=m0lztaRC8FQ', {
            waitUtil: 'networkidle2'
        })
        await page.waitForTimeout(1000)
        // await page.screenshot({ path: "screenshot.png" })
        // await page.pdf({ path: 'youtube.pdf' })
        // const input = await page.$('input#search')
        // input.type('球球的前端奶茶屋')
        // const html = await page.evaluate(() =>
        //     document.body.innerHTML
        // )
        const like = await page.$$eval('like-button-view-model .yt-spec-button-shape-next__button-text-content', divs => {
            return divs[0].textContent;
        })
        const view = await page.$$eval('#description-inner #info span', divs => {
            return divs[0].textContent;
        })
        console.log(like, view)
    } catch (e) {
        console.error(e)
    } finally {
        await browser.close()
    }
})()

