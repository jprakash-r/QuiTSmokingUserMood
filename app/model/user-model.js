const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        age:
        {
            type: Number,
            required: true
        }
        ,
        userMoods:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"mood",
                required: true
            }
        ]
    }
)

const UserData = mongoose.model('user',userSchema)
module.exports = UserData
