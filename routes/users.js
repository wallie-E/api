const users = require('../controllers/users');
const express = require("express")


const router = express.Router();

router.put('/:id', users.updateUser);
router.delete('/:id', users.deleteUser);
router.get("/:id", users.getUser);

module.exports = router;