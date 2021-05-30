import { Card, Input } from "antd";
import { Button, Modal, Form, Radio } from "antd";
import moduleName from "antd";
import AuthGuard from "./_authguard";
import { KelasList } from "components/Kelas/KelasList";

export default function Kelas() {
  return (
    <AuthGuard>
      <KelasList />
    </AuthGuard>
  );
}
