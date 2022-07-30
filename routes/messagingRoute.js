'use strict'
// modules
const express = require('express');
const controller = require('../controller/messagingController')

// create and customize router
const router = express.Router();

// main routes
router.get('/',controller.messagingPage)
router.get('/Sending',controller.sendingPage)
router.get('/GetMsgs',controller.messages)
router.post('/Send/:id',controller.sendMessage)
router.post('/Delete/:id',controller.deleteMessage)
router.post('/Save',controller.saveMessage)
router.get('/Contents/:page',controller.contents)
router.get('/Customers',controller.getCustomers)
router.get('/Contacts',controller.getContacts)

module.exports = router