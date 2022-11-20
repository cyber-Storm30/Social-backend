import User from "../models/user.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  const { sender, content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(404).json("Invalid content or chat id doest not exist");
  }

  var newMessage = {
    sender,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate(
      "sender",
      "firstname lastname image email"
    );

    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chats.users",
      select: "firstname lastname image email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstname lastname image email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
