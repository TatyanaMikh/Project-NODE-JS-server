const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patent_schema = new Schema({

    patent_id : {
        type: Number,
        required:true,
        unique:true
    },

    patent_name : {
        type:String,
        required:true,
        unique:true
    },
    patent_creator : {
        type:String,
        required:true
    },

    patent_description: {
        type:String,
        required:true,
    },

    patent_category : {
        type: String,
        //required:true
    },

    patent_status: {
        type:Boolean,
        default:false
    }
});



module.exports = mongoose.model('patents', patent_schema);