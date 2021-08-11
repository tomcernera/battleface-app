const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validator = require('../helpers/validators');

router.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    if (validator.isValidUsername(username) && validator.isValidPassword(password)) {
        const token = auth.generateToken(username);
        const payload = {
            loggedIn: true,
            token: token
        };
        res.status(200).send(payload);
    } else {
        const payload = {
            loggedIn: false,
            token: "",
        }
      res.status(401).send(payload);
    }  
  } catch (error) {
      console.log(error);
      const payload = {
          loggedIn: false,
          message: "Something went wrong."
      }
    res.status(500).send(payload);
  }
});

module.exports = router;