const passport = require("passport");
const bcrypt = require("bcryptjs");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const dbConnection = require("./utils/dbConnection");

passport.use(
    new GoogleStrategy(
        {
            clientID:
                "21668859866-94rlpvadk9shdjfcdavsljo00einit47.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth/google/callback",
            scope: ["email", "profile"],
        },
        async function (accessToken, refreshToken, profile, done) {
            const [row] = await dbConnection.execute(
                "SELECT * FROM `users`WHERE `email`=?",
                [profile.email]
            );
            console.log(row[0]);
            console.log(row == null);
            if (row[0] == undefined) {
                await dbConnection.execute(
                    "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
                    [
                        profile.displayName,
                        profile.email,
                        await bcrypt.hash(accessToken, 12),
                    ]
                );
            }
            done(null, profile);
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: "441151b930bba157aa7a",
            clientSecret: "ce8fda12bd36905a364b3aa6dccce4e9684a037f",
            callbackURL: "http://localhost:3000/auth/github/callback",
            scope: ["email", "profile"],
        },
        async function (accessToken, refreshToken, profile, done) {
            const [row] = await dbConnection.execute(
                "SELECT * FROM `users`WHERE `email`=?",
                [profile.username]
            );

            if (row[0] == undefined) {
                await dbConnection.execute(
                    "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
                    [
                        profile.displayName,
                        profile.username,
                        await bcrypt.hash(accessToken, 12),
                    ]
                );
            }
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
