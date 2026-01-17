import express from 'express';
import {
  getAllMessagesController,
  sendMessageController,
} from '../controllers/message.controller.js';

const messageRouter = express.Router();

messageRouter.get('/sendMessage', sendMessageController);
messageRouter.get('/getAllMessages', getAllMessagesController);

export default messageRouter;
