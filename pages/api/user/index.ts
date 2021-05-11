import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.json({ isLogin: true });
  } else {
    res.json({ isLogin: false });
  }
};
