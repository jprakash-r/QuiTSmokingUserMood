function validateRequestBody(req , type) {
    let errorMsg = ""
    if (Object.keys(req.body).length === 0) {
        errorMsg = "Please provide " + type + " information"
    }
    if (errorMsg) {
        throw errorMsg
    }
}

function defaultDataRequested(req) {
    return !req.query.fromDate && !req.query.toDate
}

function validateDateRange(req) {
    let errorMsg = ""
    if (!req.query.fromDate || !req.query.toDate) {
        errorMsg = "Please provide From Date & To Date"
    }
    if (req.query.fromDate > req.query.toDate) {
        errorMsg = "From Date should be lesser than To Date"
    }
    if (errorMsg) {
        throw errorMsg
    }
}

function validateRequest(req, res) {
    let errorMsg = ""
    if (!req.params.userId) {
        errorMsg = "Please provide user id."
    }
    if (!req.params.mood) {
        errorMsg = "Please provide mood to look for in user."
    }
    if (errorMsg) {
        throw errorMsg
    }
}

module.exports.validateRequestBody = validateRequestBody
module.exports.validateDateRange = validateDateRange
module.exports.validateRequest = validateRequest
module.exports.defaultDataRequested = defaultDataRequested