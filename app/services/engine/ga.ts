import { Individual, DailyShift, Personel } from "./types";

export class GAEngine {
    mutationRate: number;
    crossoverRate: number;
    constructor(mutationRate: number = 0.1, crossoverRate: number = 0.7) {
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
    }

    selectParents(population: Individual[]): Individual[] {
        return [...population].sort((a, b) => (b.fitness || 0) - (a.fitness || 0)).slice(0, population.length * 0.1);
    }

    crossover(parent1: Individual, parent2: Individual): Individual {
        const childSchedule = parent1.weeklySchedule.map((day, dayIndex) => ({
            shifts: day.shifts.map((shift, shiftIndex) => Math.random() < this.crossoverRate
                ? parent2.weeklySchedule[dayIndex].shifts[shiftIndex]
                : shift)
        }));
        return { weeklySchedule: childSchedule };
    }

    mutate(individual: Individual, shiftEntries: DailyShift[], mutationRate: number): Individual {
        const mutatedSchedule = individual.weeklySchedule.map((day, dayIndex) => ({
            shifts: day.shifts.map((shift, shiftIndex) => {
                // Check if mutation should occur based on mutation rate
                if (Math.random() < mutationRate) {
                    return this.mutationOperation(individual, shiftEntries, dayIndex, shiftIndex);
                } else {
                    return shift; // No mutation
                }
            })
        }));
        return { weeklySchedule: mutatedSchedule };
    }


    /***
     * Mutation operation for a single shift
     * 
     * @param individual: Individual
     * 
     */
    private mutationOperation(individual: Individual, shiftEntries: DailyShift[], dayIndex: number, shiftIndex: number): DailyShift {
        if (Math.random() < this.mutationRate) {
            const swapDayIndex = Math.floor(Math.random() * individual.weeklySchedule.length);
            const swapShiftIndex = Math.floor(Math.random() * individual.weeklySchedule[dayIndex].shifts.length);
            return individual.weeklySchedule[swapDayIndex].shifts[swapShiftIndex];
        }
        return this.getRandomShift(shiftEntries);
    }

    getRandomShift(shiftEntries: DailyShift[]): DailyShift {
        return shiftEntries[Math.floor(Math.random() * shiftEntries.length)];
    }
}


