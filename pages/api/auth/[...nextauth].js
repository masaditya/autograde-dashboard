import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { API_SIGNIN } from "constants";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      console.log("USER", {...user})
      const response = await fetch(
        "https://nostalgic-ramanujan-96cef2.netlify.app/.netlify/functions/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user }),
        }
      );
      let data = await response.json();
      response && (token.user = data);
      return token; // ...here
    },
    session: async (session, user, sessionToken) => {
      session.user = user;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
