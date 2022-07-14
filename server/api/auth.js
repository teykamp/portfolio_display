const express = require('express');
const router = express.Router();

function generateAPIAccessToken(numOfDigits) {
  const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let token = ''
  for (let i = 0; i < numOfDigits; i++) {
    let digit = nums[Math.floor(Math.random() * nums.length)];
    token += digit;
  }
  return token;
}

router.get('/:user', async (req, res) => {
  const token = generateAPIAccessToken(6);
  const timeIssued = Date.now();
  try {
    res.json({ token, timeIssued, user: req.params.user, numOfInteractions: 0 });
  } catch (error) {
    res.json({ message: error });
  }
})

module.exports = router;