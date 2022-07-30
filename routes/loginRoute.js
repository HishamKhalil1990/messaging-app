'use strict'
// modules
const express = require('express');
const controller = require('../controller/LoginController')

// create and customize router
const router = express.Router();

// main routes
router.post('/',controller.login)
router.post('/Logout',controller.logout)

module.exports = router