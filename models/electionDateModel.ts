import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    electionDate: {
        type: String,
        required: [true, 'Election tile is required']
    },
    date:{
        type: String,
        required: [true, 'Election tile is required']
    },
    time: {
        type: String,
        required: [true, 'Election tile is required']
    }
})

const Electiontitle = mongoose.model('elections', schema)

export default Electiontitle