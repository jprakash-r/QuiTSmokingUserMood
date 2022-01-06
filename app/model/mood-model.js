const mongoose = require('mongoose')
const moodSchema = mongoose.Schema(
    {
        // day: {
        //     type: Number,
        //     required: true
        // },
        // month:
        // {
        //     type: Number,
        //     required: true
        // },
        // year:
        // {
        //     type: Number,
        //     required: true
        // },
        date:
        {
            type: Date,
            required: true
        },
        moodType:
        {
            type: String,
            required: true
        },
        _owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }

    }
)
const moodData = mongoose.model('mood', moodSchema)
module.exports = moodData
