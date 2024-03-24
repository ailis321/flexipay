const jwt = require('jsonwebtoken');
const User = require('../models/account');

const requireAuthHeader = async (req, res, next) => {
    const { authorisation } = req.headers;

    if (!authorisation) {
        return res.status(401).json({ error: 'You are not authorised for this request' });
    }

    const token = authorisation.split(' ')[1];

    try {
       const {_id} = jwt.verify(token, process.env.JWT_SECRET)
       req.user = await User.findOne({ _id });
       next();
      
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorised Request' });
    }
}

module.exports = requireAuthHeader;
