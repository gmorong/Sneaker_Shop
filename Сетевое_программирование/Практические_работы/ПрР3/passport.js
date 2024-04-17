const passport = require("passport");
const bcrypt = require("bcryptjs");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const dbConnection = require("./utils/dbConnection");

passport.use(
    new GoogleStrategy(
        {
            clientID:"667426422941-4gcg5sqtjos8jbagaktb2ti4bvp077tp.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:4000/auth/google/callback",
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
            clientID: "9e4d3572dbc07c66e466",
            clientSecret: "6aaf104f992ceeec6425a04effe9815098cb9817",
            callbackURL: "http://localhost:4000/auth/github/callback",
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
                        profile.displayName? profile.displayName:"none",
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
