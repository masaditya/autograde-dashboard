import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    jwt: async (token) => {
      return token;
    },
    session: async (session, user) => {
      const response = await fetch(
        "http://autograde-services.herokuapp.com/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user, id: parseInt(user.sub) }),
        }
      );
      let data = await response.json();
      response && (session.user = {...session.user, ...data});
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
