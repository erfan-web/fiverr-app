const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { createError } = require("../utils/createError");
exports.createMessage = async (req, res, next) => {
  try {
    const newMessage = new Message({
      conversationId: req.body.conversationId,
      userId: req.user._id,
      description: req.body.description,
    });

    const savedMsg = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.user.isSeller,
          readByBuyer: !req.user.isSeller,
          lastMessage: req.body.description,
        },
      },
      { new: true }
    );
    res.status(201).json(savedMsg);
  } catch (err) {
    next(err);
  }
};
exports.getMessages = async (req, res, next) => {
  const messages = await Message.find({ conversationId: req.params.id });
  console.log(messages);
  res.status(200).json(messages);
  try {
  } catch (err) {
    next(err);
  }
};
