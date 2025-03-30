import { TEMPO } from '../constants/time';
import { Workout } from '../interfaces';

export const workout: Workout[] = [
    {
        id: crypto.randomUUID(),
        nome: "Treino de Superiores",
        defaultExecutionTime: TEMPO.SEG_45,
        defaultEnrolacaoDuration: TEMPO.SEG_15,
        stretchDuration: TEMPO.MIN_10,
        exercices: [
            {
                id: crypto.randomUUID(),
                nome: "Supino Inclinado",
                restTimeIntervals: [
                    {
                        name: "Aquecimento",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Aquecimento",
                        value: TEMPO.MIN_2
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Supino Reto",
                restTimeIntervals: [
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Serrote",
                restTimeIntervals: [
                    {
                        name: "Aquecimento",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Aquecimento",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    }

                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Remada Pronada Polia",
                restTimeIntervals: [
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Elevação Lateral",
                restTimeIntervals: [
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Bíceps Polia",
                restTimeIntervals: [
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Tríceps Polia",
                restTimeIntervals: [
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    }
                ]
            }
        ]
    },
    {
        id: crypto.randomUUID(),
        nome: "Treino de Pernas",
        defaultExecutionTime: TEMPO.MIN_1,
        defaultEnrolacaoDuration: TEMPO.SEG_15,
        warmUpDuration: TEMPO.MIN_5,
        stretchDuration: TEMPO.MIN_10,
        exercices: [
            {
                id: crypto.randomUUID(),
                nome: "Agachamento",
                restTimeIntervals: [
                    {
                        name: "Aquecimento",
                        value: TEMPO.MIN_1_30
                    },
                    {
                        name: "Aquecimento",
                        value: TEMPO.MIN_2
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Cadeira Extensora",
                restTimeIntervals: [
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Stiff",
                restTimeIntervals: [
                    {
                        name: "Aquecimento",
                        value: TEMPO.MIN_2
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_3
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                nome: "Cadeira Flexora",
                restTimeIntervals: [
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Preparação",
                        value: TEMPO.MIN_3
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    },
                    {
                        name: "Série válida",
                        value: TEMPO.MIN_2_30
                    }
                ]
            }

        ]
    }
]