import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { convertToTable } from "~/services/engine/tableGenerator";
import { Individual } from "~/services/engine/types";




export default function Index() {

  const [selectedPopulation, setSelectedPopulation] = useState<Individual | null>(null);

  useEffect(() => {
    document.title = "Jadwal Piket Dapur Subsi Sibindenma Wattar AAU";

    const selectedPopulation = localStorage.getItem('selectedPopulation');
    if (selectedPopulation === null) {
      alert("Anda belum memilih jadwal piket dapur. Silahkan pilih jadwal terlebih dahulu.");
    }

    setSelectedPopulation(selectedPopulation ? JSON.parse(selectedPopulation) : null);

    if (selectedPopulation === null) {
      return;
    }
    window.print();

  }, []);

  return (
    <>
      <h1>
        Jadwal Piket Dapur Subsi Sibindenma Wattar AAU
      </h1>

      <pre>
        {
          JSON.stringify(convertToTable(selectedPopulation?.weeklySchedule ?? []), null, 2)
        }
      </pre>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Jam</Table.Th>
            <Table.Th>Tugas</Table.Th>
            <Table.Th>Senin</Table.Th>
            <Table.Th>Selasa</Table.Th>
            <Table.Th>Rabu</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        </Table.Tbody>
      </Table>

      <div style={{ pageBreakAfter: 'always' }} />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Jam</Table.Th>
            <Table.Th>Tugas</Table.Th>
            <Table.Th>Kamis</Table.Th>
            <Table.Th>Jumat</Table.Th>
            <Table.Th>Sabtu</Table.Th>
            <Table.Th>Minggu</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
          </Table.Tr>
        </Table.Tbody>
      </Table>

    </>
  );
}