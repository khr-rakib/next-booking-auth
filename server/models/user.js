import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    picture: String,
    stripe_account_id: '',
    stripe_sellter: {},
    stripe_session: {}
}, {timestamps: true})

export default mongoose.model('User', userSchema);