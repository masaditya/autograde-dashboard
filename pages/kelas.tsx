import { Card, Input } from "antd";
import { Button, Modal, Form, Radio } from "antd";
import { KelasList } from "components/Kelas/KelasList";
import { useFetcher } from "lib/useFetcher";
import { EXT_API } from "constant";

export default function Kelas({ kelas }) {
  console.log(kelas);
  return (
    <>
      <KelasList classes={kelas} />
    </>
  );
}

export async function getStaticProps() {
  const kelas = await (await fetch(`${EXT_API}/class`)).json();
  return {
    props: { kelas },
  };
}
