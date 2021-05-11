import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// export default NextAuth({
//   // Configure one or more authentication providers
//   ,

//   // // A database is optional, but required to persist accounts in a database
//   // database: process.env.DATABASE_URL,
// });

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};

export default (req, res) => NextAuth(req, res, options);
