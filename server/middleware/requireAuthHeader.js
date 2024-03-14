const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuthHeader = async (req, res, next) => {
    const { authorisation } = req.headers;

    if (!authorisation) {
        return res.status(401).json({ error: 'Authorisation Token Required' });
    }

    const token = authorisation.split(' ')[1];

    try {
       const {_id} = jwt.verify(token, process.env.JWT_SECRET)
       req.user = await User.findOne({ _id }).select(_id)
       next();
      
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorised Request' });
    }
}

module.exports = requireAuthHeader;
