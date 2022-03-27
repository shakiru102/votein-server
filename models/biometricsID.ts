import mongoose from 'mongoose';

const schema = new mongoose.Schema({
     templateID: String
})

const FingerprintID = mongoose.model('fingerprints', schema)

export default FingerprintID