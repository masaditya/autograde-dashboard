import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function Secret() {

  const [content, setContent] = useState("");

 

  return (
    <main>
      <div>
        <h1> Protected Page</h1>
        <p>{content}</p>
      </div>
    </main>
  );
}
