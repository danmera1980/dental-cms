const { User } = require('../db')

const dashboard = async (req, res, next) => {
    try {
        // res.json(req.user)
        const user = await User.findOne({
            attributes: ['name'],
            where:{
                id: req.user
            }
        })
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
}

module.exports = {
    dashboard
}