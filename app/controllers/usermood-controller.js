const { response } = require('express')
const User = require('../model/user-model.js')
const Mood = require('../model/mood-model.js')
const userMoodService = require('../service/usermood-service')
const userMoodUtility = require('../utility/util')


var ObjectId = require('mongodb').ObjectId


const createUser = async (req, res) => {
    
    try {
        const newUserDetails = new User(req.body)
        const savedUser = await newUserDetails.save()
        res.status(200).json({ success: true, data: savedUser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const createMood = async (req, res) => {
    
    try {
        const moodDetails = new Mood(req.body)
        const moodReturnVal = await moodDetails.save()
        const userValue = await User.findById({ _id: req.params.userId })
        userValue.userMoods.push(moodDetails)
        await userValue.save()
        res.status(200).json({ success: true, data: moodReturnVal })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

const getAllUsers = async (req, res) => {

    try {
        const user = await User.find().populate({ path: 'userMoods', select: 'date moodType' })
        console.log('user details ' + user)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserById = async (req, res) => {
   
    try {
        const user = await User.findOne({ _id: new Object(req.params.userId) }).populate({ path: 'userMoods', select: 'date moodType' })
        console.log('user details ' + user)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserMood = async (req, res) => {

    let errorMsg = ""

    try {

        if (!req.params.userId) {
            errorMsg = "Please provide user id."
            res.status(500).json({ success: false, message: errorMsg })
        }
        if (!req.params.mood) {
            errorMsg = "Please provide mood to look for in user."
            res.status(500).json({ success: false, message: errorMsg })
        }

        if (!req.query.fromDate && !req.query.toDate) {
            
            const user = await userMoodService.getUserMoodDetails(req)
            const userJson = userMoodUtility.numberOfMoodDays(user)
            res.status(200).json({ success: true, data: user, mooddays: userJson })
        }
        else {
            if (!req.query.fromDate || !req.query.toDate) {
                errorMsg = "Please provide From Date & To Date"
                res.status(500).json({ success: false, message: errorMsg })
            }
            else {
                const fromDate = new Date(req.query.fromDate + "T00:00:00.000Z")
                const toDate = new Date(req.query.toDate + "T00:00:00.000Z")

                if (fromDate.getTime() > toDate.getTime()) {
                    errorMsg = "From Date should be lesser than To Date"
                    res.status(500).json({ success: false, message: errorMsg })
                }
                else {
                    const user = await userMoodService.getUserMoodDetailsPerTimeLine(req, fromDate, toDate)
                    const userJson = userMoodUtility.numberOfMoodDays(user)
                    res.status(200).json({ success: true, data: user, mooddays: userJson })
                }
            }
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



module.exports.getAllUsers = getAllUsers
module.exports.getUserById = getUserById
module.exports.CreateUser = createUser
module.exports.createMood = createMood
module.exports.getUserMood = getUserMood






