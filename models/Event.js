const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
    },
    betOptions: [
        {
            name: String,
            //TODO more bet parameter
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    linkedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream'
    }
});

module.exports = mongoose.model("Event", userSchema);