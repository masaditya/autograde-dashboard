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
      return token;
    },
    session: async (session, user, sessionToken) => {
      const response = await fetch(
        "https://nostalgic-ramanujan-96cef2.netlify.app/.netlify/functions/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user, id: parseInt(user.sub) }),
        }
      );
      let data = await response.json();
      response && (session.user = data);
      // session.user = user;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
