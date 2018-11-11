const puppeteer = require('puppeteer')
const { resolve } = require('path')

const base = `https://movie.douban.com/subject/`
const doubanId = '1295644'
const videoBase = `https://movie.douban.com/trailer/238802`
const chromeDir = resolve(__dirname, '../../node_modules/chrome/Chromium.app/Contents/MacOS/Chromium')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    console.log('start visit the target page')

    const browser = await puppeteer.launch({
        executablePath: chromeDir,
        args: ['--no-sanbox'],
        dumpio: false
    })

    const page = await browser.newPage()
    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    })

    await sleep(1000)

    const result = await page.evaluate(() => {
        var $ = window.$
        var it = $('.related-pic-video')
        if (it && it.length > 0) {
            var link = it.attr('href')
            var url = it.attr('style').split('url(')
            var cover = url[1].replace(')', '')
        }

        return { link, cover }
    })

    let video

    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })

        video = await page.evaluate(() => {
            var $ = window.$
            var it = $('source')

            if (it && it.length > 0) {
                return it.attr('src')
            }

            return ''
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }

    browser.close()

    process.send(data)
    process.exit(0)
})()
