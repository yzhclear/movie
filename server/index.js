const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const R = require('ramda')
// const router = require('./routes/movie')
const MIDDLEWARES = ['router']

const userMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

;(async () => {

    await connect()

    initSchemas()

    // require('./tasks/movie')
    const app = new Koa()

    await userMiddlewares(app)

    app.listen(4455)
})()


// app.use(views(resolve(__dirname, './views'), {
//     extension: 'pug'
// }))
//
// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         you: 'xxj',
//         me: 'yzh'
//     })
// })
