const express = require('express');
const router = express.Router();

/*
    @route  GET api/postss/test
    @desc   Tests posts route
    @access public
*/
router.get('/test', (req, res) => res.json({ msg: 'posts test route' }));

module.exports = router;
