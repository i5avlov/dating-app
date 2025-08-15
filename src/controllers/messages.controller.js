const messagesController = require('express').Router(); 
const messagesService = require('../services/messages.service');
const usersService = require('../services/users.service'); 

messagesController
    .get('/users/:userId/conversation', async (req, res) => { 
        const currentUserId = req.user.id; 
        const otherUserId = req.params.userId; 

        if (currentUserId === otherUserId) { 
            return res
                .status(401)
                .send('You are trying to send message to yourself'); 
        }

        const currentUserData = await usersService.getById(currentUserId);
        const otherUserData = await usersService.getById(otherUserId); 

        // console.log(otherUserData.age); 

        await messagesService.updateReadDate(currentUserId, otherUserId); 
        const messagesData = await messagesService.getConversation(currentUserId, otherUserId)
            .populate('sender receiver'); 

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
        const { messagesToGet, pageNumber, messagesPerPageCount } = req.query; 
        const currentUserId = req.user.id; 

        const currentUserData = await usersService.getById(currentUserId).lean(); 
        const messagesData = await messagesService.getMessages(messagesToGet, currentUserId, pageNumber, messagesPerPageCount); 
        messagesData.onPageElements = await messagesData.onPageElements
            .populate('sender receiver')
            .lean(); 

        res.render('messages/index', { currentUserData, messagesData, messagesToGet }); 
    }) 
    .post('/', async (req, res) => { 
        let { messagesToGet, messagesPerPageCount } = req.body; 
        // let messagesData = await messagesService.getPaginated(1, messagesPerPageCount); 

        res.redirect(`/messages?messagesToGet=${messagesToGet}&pageNumber=1&messagesPerPageCount=${messagesPerPageCount}`); 
    }); 

module.exports = messagesController; 
