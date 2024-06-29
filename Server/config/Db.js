const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mongodbURI = process.env.MONGOOSE_URI;

mongoose.connect(mongodbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Successfully Connected"))
.catch(err => console.log(err));

module.exports = mongoose;
