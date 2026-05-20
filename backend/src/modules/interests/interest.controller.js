const interestService = require("./interest.service");


// POST /api/v1/interests/hackathons/:hackathonId
const addHackathonInterest = async (req, res, next) => {
    try {
        const result = await interestService.addHackathonInterest(
            req.user.userId,
            req.params.hackathonId
        );

        res.status(201).json({
            success: true,
            message: result.message,
            data: {
                //and that to make the front can update the counter easily 
                currentPoolSize: result.currentPoolSize,
                thresholdReached: result.thresholdReached,
            },
        });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/v1/interests/hackathons/:hackathonId
const removeHackathonInterest = async (req, res, next) => {
    try {
        const result = await interestService.removeHackathonInterest(
            req.user.userId,
            req.params.hackathonId
        );

        res.status(200).json({
            success: true,
            message: result.message,
            data: null,
        });
    } catch (err) {
        next(err);
    }
};


//now making the same things exaclty like hackathons but for projects 

// POST /api/v1/interests/projects/:projectId
const addProjectInterest = async (req, res, next) => {
    try {
        const result = await interestService.addProjectInterest(
            req.user.userId,
            req.params.projectId
        );

        res.status(201).json({
            success: true,
            message: result.message,
            data: {
                currentPoolSize: result.currentPoolSize,
                thresholdReached: result.thresholdReached,
            },
        });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/v1/interests/projects/:projectId
const removeProjectInterest = async (req, res, next) => {
    try {
        const result = await interestService.removeProjectInterest(
            req.user.userId,
            req.params.projectId
        );

        res.status(200).json({
            success: true,
            message: result.message,
            data: null,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addHackathonInterest,
    removeHackathonInterest,
    addProjectInterest,
    removeProjectInterest,
};