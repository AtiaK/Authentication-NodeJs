const mongoose = require ('mongoose')

const schema = new mongoose.Schema({
   userId:String,
   savedConnections:{
      type: Array,
      required:false
    }
})
const session = mongoose.model('savedConnections', schema);

module.exports = session;
