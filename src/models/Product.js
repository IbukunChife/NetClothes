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
    path:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{
    toObject: { virtuals:true},
    toJSON: { virtuals:true}
}

);

ProductSchema.virtual('url').get(function(){
    const url = process.env.URL || 'http://localhost:3000'
    
    return `${url}/Product/${encodeURIComponent(this.path)}`;

})

module.exports =mongoose.model('Product', ProductSchema);