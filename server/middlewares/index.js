import admin from '../firebase'
import User from '../models/user'

export const findOrCreateUser = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.token)
        // save the user to db or send user res if it is already saved
        const user = await User.findOne({ email: firebaseUser.email })
        if (user) {
            // send user response
            req.currentUser = user
            next();            
        } else {
            // create new user and then send that user as response
            let newUser = await new User({
                email: firebaseUser.email,
                name: firebaseUser.name ? firebaseUser.name : firebaseUser.email.split('@')[0],
                picture: firebaseUser.picture ? firebaseUser.picture : '/avatar.png'
            }).save();
            req.currentUser = newUser
            next();            
        }
    } catch (error) {
        res.status(401).json({
            err: 'Invalid or expired token'
        })
    }
}