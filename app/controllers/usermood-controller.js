const { response } = require('express')
const User = require('../model/user-model.js')
const Mood = require('../model/mood-model.js')
const userMoodService = require('../service/usermood-service')
const userMoodUtility = require('../utility/util')
const validationUtil = require('../utility/validation')
const applicationConstants = require('../constant/constants')


var ObjectId = require('mongodb').ObjectId


const createUser = async (req, res) => {
    try {
        validationUtil.validateRequestBody(req, applicationConstants.PERSON)
        const newUserDetails = new User(req.body)
        const savedUser = await newUserDetails.save()
        res.status(200).json({ success: true, data: savedUser })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

const createMood = async (req, res) => {

    try {
        validationUtil.validateRequestBody(req, applicationConstants.MOOD)
        const user = await userMoodService.getUserDetailsPerTimeLine(req, req.body.date + applicationConstants.ISOTIMEZONE, req.body.date + applicationConstants.ISOTIMEZONE)
        if (user) {
            const moodType = userMoodUtility.numberOfMoodDays(user)
            if (moodType > 0) {
                throw "Mood for this User for this day  already exists."
            }
        }
        else {
            throw "User doesnot exist."
        }
        const moodDetails = new Mood(req.body)
        const moodReturnVal = await moodDetails.save()
        const userValue = await User.findById({ _id: req.params.userId })
        userValue.userMoods.push(moodDetails)
        await userValue.save()
        res.status(200).json({ success: true, data: moodReturnVal })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }

}

const getAllUsers = async (req, res) => {

    try {
        const user = await User.find().populate({ path: 'userMoods', select: 'date moodType' })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserById = async (req, res) => {

    try {
        const user = await User.findOne({ _id: new Object(req.params.userId) }).populate({ path: 'userMoods', select: 'date moodType' })
        if (user) {
            res.status(200).json(user)
        }
        else {
            const errorMsg = "No user found with id :" + req.params.userId
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserMood = async (req, res) => {

    try {
        validationUtil.validateRequest(req, res)
        if (validationUtil.defaultDataRequested(req)) {
            const user = await userMoodService.getUserMoodDetails(req)
            const userJson = userMoodUtility.numberOfMoodDays(user)
            res.status(200).json({ success: true, data: user, mooddays: userJson })
        }
        else {
            validationUtil.validateDateRange(req)
            const fromDate = req.query.fromDate + applicationConstants.ISOTIMEZONE
            const toDate = req.query.toDate + applicationConstants.ISOTIMEZONE

            const user = await userMoodService.getUserMoodDetailsPerTimeLine(req, fromDate, toDate)
            const userJson = userMoodUtility.numberOfMoodDays(user)
            res.status(200).json({ success: true, data: user, mooddays: userJson })

        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}



module.exports.getAllUsers = getAllUsers
module.exports.getUserById = getUserById
module.exports.CreateUser = createUser
module.exports.createMood = createMood
module.exports.getUserMood = getUserMood


