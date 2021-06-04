import { KelasList } from "components/Kelas/KelasList";
import { EXT_API } from "constant";

export default function Kelas({ kelas }) {
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
