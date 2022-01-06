const numberOfMoodDays = function numberOfMoodDays(user) {
    const userJson = JSON.parse(JSON.stringify(user))
    return userJson[0].userMoods.length
}
module.exports.numberOfMoodDays = numberOfMoodDays
