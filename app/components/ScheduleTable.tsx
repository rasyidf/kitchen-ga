import { Button, Grid, Group, List, ScrollArea, SimpleGrid, Stack, Table, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import { PersonelNames } from "~/constants/Personel";
import { Individual, Personel, ShiftTask, shiftTaskName } from "~/services/engine/types";
const dayName = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
export const ScheduleTable = ({ population }: { population: Individual[]; }) => {
  const [selectedPopulation, setSelectedPopulation] = useState(0);

  const selectedPop = population[selectedPopulation];
  const selectedShiftLen = selectedPop?.weeklySchedule?.[0].shifts.length ?? 0;
  return (<Grid>
    <Grid.Col span={2}>
      <Text p="md">Populasi</Text>
      <ScrollArea h="70vh">
        <Stack gap={2} mr={16}>
          {population.map((individual, i) => (
            <Button key={i} variant="subtle" onClick={() => setSelectedPopulation(i)}
              color={individual?.fitness && individual.fitness > 70 ? "blue" :
                individual?.fitness && individual.fitness > 50 ? "green" :
                  individual?.fitness && individual.fitness > 30 ? "orange" :
                    individual?.fitness && individual.fitness < 0 ? "red" : "gray"
              }
            >
              Jadwal {i + 1} - Fitness: {(individual?.fitness ?? 0).toFixed(2)}
            </Button>
          ))}
        </Stack>
      </ScrollArea>
    </Grid.Col>
    <Grid.Col span={10}>
      <Group>
        {
          selectedPopulation < 0 && <Text c="gray.6">Pilih jadwal untuk melihat detail</Text>
        }
        {
          selectedPop && (
            <Tabs defaultValue="0" w="100%">
              <Tabs.List>
                {Array.from({ length: selectedShiftLen }).map((_, i) => (
                  <Tabs.Tab key={i} value={i.toString()} >
                    Sesi {i + 1}
                  </Tabs.Tab>
                ))}
              </Tabs.List>

              {
                Array.from({ length: selectedShiftLen }).map((_, i) => (
                  <Tabs.Panel key={i} value={i.toString()} >
                    <Table>
                      <thead>
                        <tr>
                          {
                            dayName.map((day, i) => (
                              <th key={i}>{day}</th>
                            ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {
                            selectedPop?.weeklySchedule?.map((day, x) => (
                              <td key={x}>
                                <Stack>
                                  {
                                    day.shifts?.[i]?.personels?.map((personel: Personel, j) => (
                                      <div key={j}>
                                        <Text >
                                          {PersonelNames[personel?.id - 1]?.name ?? ' '}
                                        </Text>
                                        <Text c="gray"  >
                                          {shiftTaskName[personel?.task]}
                                        </Text>
                                      </div>
                                    ))
                                  }
                                </Stack>
                              </td>
                            ))
                          }
                        </tr>
                      </tbody>
                    </Table>
                  </Tabs.Panel>
                ))
              }
            </Tabs>)
        }
      </Group>
    </Grid.Col>
  </Grid>
  );
};