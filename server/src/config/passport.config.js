import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../models/index.js';

const { User } = db;

// Passport session setup
// ...
// Configure the Google strategy
passport.use(new GoogleStrategy({
    // rely on process.env being loaded by server.js
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/api/auth/google/callback" 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const [firstName, lastName] = profile.displayName.split(' ');

        let user = await User.findOne({ where: { email } });
        
        if (!user) {
            user = await User.create({
                firstName,
                lastName,
                email,
                role: 'user',
                googleId: profile.id
            });
        }
        
        return done(null, user);

    } catch (error) {
        return done(error, null);
    }
  }
));

export default passport;