const messagesController = require('express').Router(); 
const messagesService = require('../services/messages.service');
const usersService = require('../services/users.service'); 

messagesController
    .get('/users/:userId/conversation', async (req, res) => { 
        const currentUserId = req.user.id; 
        const otherUserId = req.params.userId; 

        const currentUserData = await usersService.getById(currentUserId).lean();
        const otherUserData = await usersService.getById(otherUserId).lean(); 
        const messagesData = await messagesService.getConversation(currentUserId, otherUserId)
            .populate('sender receiver')
            .lean(); 

        res.render('messages/conversation', { currentUserData, otherUserData, messagesData }); 
    }) 
    .post('/users/:userId/conversation', async (req, res) => { 
        const sourceUserId = req.user.id; 
        const targetUserId = req.params.userId; 
        const messageData = req.body; 

        await messagesService.add(messageData, sourceUserId, targetUserId); 

        res.redirect(`/messages/users/${targetUserId}/conversation`); 
        
    }); 

messagesController
    .get('/', async (req, res) => { 
        const messagesToGet = req.query.messagesToGet.toLowerCase(); 
        const currentUserId = req.user.id; 

        const currentUserData = await usersService.getById(currentUserId).lean(); 
        const messagesData = await messagesService.getMessages(messagesToGet, currentUserId)
            .populate('sender receiver')
            .lean(); 

        res.render('messages/index', { currentUserData, messagesData, messagesToGet }); 
    }); 

module.exports = messagesController; 
