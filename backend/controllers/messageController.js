const Message = require("../model/messages");

//Gets all messages.
module.exports.getAllMessage = async (req, res) => {
    let messages;

    try {
        messages = await Message.find();

        if (!messages) {
            return res.status(400).json({ msg: "No Messages Found" });
        }


        return res.status(200).json({ all_messages: messages });

    } catch (err) {
        console.log(err);
    }
};



//Adds Message to mongo db collection
module.exports.addMessage = async (req, res) => {

    try {


        const { message, name } = req.body;

        const data = await Message.create({
            message: message,
            name: name
        });

        if (data) {
            data.save();
            return res.status(200).json({ msg: "Message Sent!" });
        } else {
            return res.status(400).json({ msg: "Message Failed to Send!" });
        }

    } catch (err) {
        console.log(err);
        }

}