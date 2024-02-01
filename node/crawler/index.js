const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    })

    try {
        const page = await browser.newPage()
        await page.goto('https://www.bilibili.com/v/anime/information/?from_spmid=666.4.info.more#/', {
            waitUtil: 'networkidle2'
        })
        await delay(4000)
        // await page.screenshot({ path: "screenshot.png" })
        // await page.pdf({ path: 'youtube.pdf' })
        // const input = await page.$('input#search')
        // input.type('球球的前端奶茶屋')
        // const html = await page.evaluate(() =>
        //     document.body.innerHTML
        // )

        // const like = await page.$$eval('like-button-view-model .yt-spec-button-shape-next__button-text-content', divs => {
        //     return divs[0].innerText;
        // })
        // const view = await page.$$eval('#description-inner #info span', divs => {
        //     return divs[0].innerText;
        // })
        // fs.writeFileSync('data.txt', `点赞：${like}\n播放：${view}`, 'utf8')
        // await page.waitForSelector('#contents > ytd-shelf-renderer:nth-child(14)')
        // const html = await page.$eval('#app > div > div.sub-channel-m > div:nth-child(2) > div.r-con > section > div > ul', e => e.innerHTML)
        // console.log(html)
        const data = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.rank-item'));
            return items.map(item => ({
                title: item.querySelector('.ri-title').innerText,
                cover: item.querySelector('.lazy-img img').src,
            }));
        });
        
        fs.writeFile('./data.json', JSON.stringify(data), err => {
            if (err) throw err
            console.log('文件保存成功')
        })
    } catch (e) {
        console.error(e)
    } finally {
        await browser.close()
    }
})()

