import { useSession } from "next-auth/client";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "context/ContextWrapper";
import { Modal, Card, Space, Button, notification, Alert } from "antd";
import { API_KELAS, EXT_API, JOIN_CLASS } from "constant";
import { Accordion } from "components/Dashboard/Accordion";
import { useFetcher } from "lib/useFetcher";
import { DashboardDiagram } from "components/Dashboard/DashboardDiagram";
import DosenDashboard from 'components/Dashboard/DosenDashboard';


export default function Home() {
  const [session, loading] = useSession();
  const { studentClass, isDosen } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { putFetch } = useFetcher();

  useEffect(() => {
    !loading && !isDosen ? setVisible(true) : setVisible(false);
  }, [loading]);

  return <>{visible ? <DashboardDiagram /> : <DosenDashboard />}</>;
}
