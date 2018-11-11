const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://127.0.0.1:27017/douban-trailer'

mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }

        mongoose.connect(db, { useNewUrlParser: true })

        mongoose.connection.on('disconnected', () => {
            maxConnectTimes ++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库挂了')
            }
        })

        mongoose.connection.on('error', err => {
            maxConnectTimes ++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库挂了')
            }
        })

        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected Successful')
            // const Dog = mongoose.model('Dog', { name: String})
            // const doga = new Dog({ name: '张赛军'})

            // doga.save().then(() => {
            //     console.log('wang');
            // })
            resolve()
        })
    })
}
