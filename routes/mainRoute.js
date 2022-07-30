'use strict'
// modules
const express = require('express');
const controller = require('../controller/mainController')

// create and customize router
const router = express.Router();

// main routes
router.get('/',controller.loginPage)
router.post('/Logout',controller.logout)

module.exports = router