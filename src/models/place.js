var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment');

var placeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    label: {
        type: String,
        default: ''
    },
    direcction: {
        type: String,
        default: ''
    },
    comments:[Comment]
}, {
    timestamps: true
});

var Place = mongoose.model('Place', placeSchema);

module.exports = Place;
