import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          accessToken,
        };
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
