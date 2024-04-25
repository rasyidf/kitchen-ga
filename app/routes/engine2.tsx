import { AppShell, Button, Progress, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Individual } from "~/services/engine/types";
import { ScheduleTable } from "../components/ScheduleTable";
import { genetic } from "../services/engine/genetic";


const MyGAScheduler = () => {
  const [population, setPopulation] = useState<Individual[]>([]);
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalGenerations] = useState(100);

  useEffect(() => {
    if (isRunning) {

      genetic.start();

    }
  }, [isRunning]);
  // Add a reset functionality
  const handleReset = () => {
    setIsRunning(false);
    setGeneration(0);
    setPopulation([]);
  };
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "xl",
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <Stack p="md">
          <Title order={1}>Penjadwalan Shift Dapur</Title>
          <Title order={2}>dengan Algoritma Genetik</Title>
          <Button onClick={handleStart} disabled={isRunning}>
            Start
          </Button>
          <Button onClick={handleStop} disabled={!isRunning}>
            Stop
          </Button>
          <Button onClick={handleReset} disabled={isRunning}>
            Reset
          </Button>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <h2>Genetic Algorithm Scheduler</h2>
        <p>
          This is a simple example of a genetic algorithm scheduler. It uses a
          genetic algorithm to schedule individuals to tasks based on their
          fitness.
        </p>
        <Progress value={(generation / totalGenerations) * 100} />
        <h2>Generation: {generation}</h2>
        <ScheduleTable population={population} />
      </AppShell.Main>
    </AppShell>
  );
};

export default MyGAScheduler;
