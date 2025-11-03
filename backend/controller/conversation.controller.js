const { createError } = require("../utils/createError");
const Conversation = require("../models/Conversation");

exports.createConversations = async (req, res, next) => {
  try {
    const isSeller = req.user.isSeller;
    const userId = req.user._id;
    const toId = req.body.to;

    const conversationId = isSeller ? userId + toId : toId + userId;

    const newConversation = new Conversation({
      id: conversationId,
      sellerId: isSeller ? userId : toId,
      buyerId: isSeller ? toId : userId,
      readBySeller: isSeller,
      readByBuyer: !isSeller,
    });

    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    console.error("Error in createConversation:", err);
    next(createError(500, "مشکلی در ایجاد گفتگو پیش آمد"));
  }
};

exports.getConversations = async (req, res, next) => {
  try {
    const isSeller = req.user.isSeller;
    const userId = req.user._id;
    const key = isSeller ? "sellerId" : "buyerId";
    const conversations = await Conversation.find({ [key]: userId }).sort({
      updatedAt: -1,
    });
    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};
exports.getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Conversation Not Found!"));
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};
exports.updateConversations = async (req, res, next) => {
  try {
    const isSeller = req.user.isSeller;
    const key = isSeller ? "readBySeller" : "readByBuyer";

    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: { [key]: true },
      },
      { new: true }
    );
    res.status(200).json(updatedConversation);
  } catch (err) {
    next(err);
  }
};
