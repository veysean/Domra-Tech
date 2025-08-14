import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const { User } = db;

// Passport session setup
passport.serializeUser((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
    const user = await User.findByPk(userId);
    done(null, user);
});

// Configure the Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
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