import AuthGuard from "./_authguard";
import { useSession } from "next-auth/client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "context/ContextWrapper";
import { useCallback } from "react";
import { useFetcher } from "lib/useFetcher";
import { Accordion } from "components/Dashboard/Accordion";

export default function Dashboard({ classes }) {
  return (
    <AuthGuard>
      <Accordion />
    </AuthGuard>
  );
}
