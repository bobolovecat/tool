const puppeteer = require('puppeteer-core')

test()

async function test() {
    // console.log(puppeteer.executablePath('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'))
    const browser = puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        // channel: 'stable', //  this will launch the binary installed on the system (might not detect the installation everywhere).
        // args: [
        //     // `--proxy-server=http://${message.proxy}`,
        //     '--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
        //     '--flag-switches-begin --disable-site-isolation-trials --flag-switches-end',
        //     `--window-size=1920,1080`,
        //     "--window-position=000,000",
        //     "--disable-dev-shm-usage",
        //     "--no-sandbox",
        //   ]
    })
    console.log(1)
    await browser.close()
}

