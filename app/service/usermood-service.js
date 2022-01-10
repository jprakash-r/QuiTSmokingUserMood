const userMoodUtility = require('../utility/util')
const User = require('../model/user-model.js')

const getUserMoodDetails = async function getUserMoodDetails(req) {
    return await User.find(
        { _id: new Object(req.params.userId) })
        .populate({ path: 'userMoods', match: { moodType: { $eq: req.params.mood } }, select: 'date moodType' })
}

const getUserMoodDetailsPerTimeLine = async function getUserMoodDetailsPerTimeLine(req, fromDate, toDate) {
    return User.find(
        { _id: new Object(req.params.userId) })
        .populate({
            path: 'userMoods', match: { date: { $gte: fromDate, $lte: toDate }, moodType: { $eq: req.params.mood } }
            , select: 'date moodType'
        })
}

const getUserDetailsPerTimeLine = async function getUserDetailsPerTimeLine(req, fromDate, toDate) {
    return User.find(
        { _id: new Object(req.params.userId) })
        .populate({
            path: 'userMoods', match: { date: { $gte: fromDate, $lte: toDate } }
            , select: 'date moodType'
        })
}

module.exports.getUserMoodDetails = getUserMoodDetails
module.exports.getUserMoodDetailsPerTimeLine = getUserMoodDetailsPerTimeLine
module.exports.getUserDetailsPerTimeLine = getUserDetailsPerTimeLine