const jwt = require('jsonwebtoken');

const tokenValidation = async (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verified)
    res.status(200).json({ success: true, user: verified });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = {
  tokenValidation
};
