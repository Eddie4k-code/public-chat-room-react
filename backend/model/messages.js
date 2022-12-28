const mongoose = require("mongoose");


const MessageSchema = mongoose.Schema(


    {
       
        name: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        }
        

    },

    {
        timestamps: true,
    }

);


module.exports = mongoose.model("Messages", MessageSchema);
