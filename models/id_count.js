const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const count_schema = new Schema({
    _id : {
        type: String,
        required:true
    },
    last_used : {
        type: Number,
        required:true
    }
});



module.exports = mongoose.model('count_id', count_schema);