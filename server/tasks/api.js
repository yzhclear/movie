// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')

async function fetchMovie (item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res
}

;(async () => {
    let movies = [
        {
            doubanId: 1291546,
            title: '霸王别姬',
            rate: 9.6,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p1910813120.jpg'
        },
        {
            doubanId: 1292720,
            title: '阿甘正传',
            rate: 9.4,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p510876377.jpg'
        },
    ]

    movies.map(async movie => {
        let movieData = await fetchMovie(movie)

        try {
            movieData = JSON.parse(movieData)
            console.log(movieData.tags)
            console.log(movieData.summary)
        } catch (err) {
            console.log(err)
        }
    })
})()
