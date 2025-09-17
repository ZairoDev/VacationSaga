
import mongoose from 'mongoose';

const emailOtp = new mongoose.Schema({
    email: {type:String, required: true},
    otp: {type:String, required:true},
    createdAt: {type:Date, default:Date.now , expires: '10m'}
})

export default mongoose.models.EmailOtp || mongoose.model('EmailOtp', emailOtp);