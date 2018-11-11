const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const userSchema = new Schema({
    username: {
        unique: true,
        type: String,
    },
    email: {
        unique: true,
        type: String
    },
    password: {
        unique: true,
        type: String,
    },
    meta: {
        createdAt: {
            type: Number,
            default: Date.now()
        },
        updatedAt: {
            type: Number,
            default: Date.now()
        }
    }
})

userSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('User', userSchema)
