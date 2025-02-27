const mongoose=require('mongoose')
const { create } = require('./user.model')

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required:true,
        unique:true
    },

    createdAt:{
        type:Date,
        default: Date.now,
        expries:86400//24h in sec
    }
})

module.exports=mongoose.model('blacklistToken',blacklistTokenSchema)