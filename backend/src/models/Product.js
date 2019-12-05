const mongoose = require('mongoose');

//Schema
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    categoria: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        defaut: 1
    },
    images: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}
// ,{
//     timestamps:true
// }
);

// File.virtual('url').get(function(){
//     return
// })

module.exports =mongoose.model('Product', ProductSchema);