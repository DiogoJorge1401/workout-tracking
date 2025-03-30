import { TEMPO } from '../constants/time';
import { Exercise, Workout } from '../interfaces';

export const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;

    let resultado = '';
    if (horas > 0) resultado += `${horas}h `;
    if (minutos > 0 || horas > 0) resultado += `${minutos}m `;
    resultado += `${segs}s`;

    return resultado;
}

export const calcularTempoExercicio = (exercicio: Exercise, treino: Workout) => {
    const tempoExecucaoPorSerie = exercicio.exerciseDurationInSet || treino.defaultExecutionTime || TEMPO.SEG_45;
    const tempoExecucao = exercicio.restTimeIntervals.length * tempoExecucaoPorSerie;

    // Calcular tempo de "enrolação"
    const tempoEnrolacaoPorSerie = exercicio.enrolacaoDurationInSet || treino.defaultEnrolacaoDuration || TEMPO.SEG_15;
    const tempoEnrolacao = exercicio.restTimeIntervals.length * tempoEnrolacaoPorSerie;

    // Calcular tempo de descanso entre séries
    const tempoDescanso = exercicio.restTimeIntervals.reduce((total, tempo) => total + tempo.value, 0);

    // Tempo total do exercício
    return {
        total: tempoExecucao + tempoEnrolacao + tempoDescanso,
        execucao: tempoExecucao,
        enrolacao: tempoEnrolacao,
        descanso: tempoDescanso
    };
}

export const calcularTempoTreino = (treino: Workout) => {
    const detalhes: {
        nome: string;
        exercicios: {
            [key: string]: {
                tempoSegundos: number;
                tempoFormatado: string;
            }
        };
        tempoTotal: number;
        tempoAquecimento: number;
        tempoAlongamento: number;
        tempoRealExercicios: number;
        formatado?: string;
    } = {
        nome: treino.nome,
        exercicios: {},
        tempoTotal: 0,
        tempoAquecimento: 0,
        tempoAlongamento: 0,
        tempoRealExercicios: 0
    };

    // Adicionar tempo de aquecimento, se definido
    if (treino.warmUpDuration) {
        detalhes.tempoAquecimento = treino.warmUpDuration;
        detalhes.tempoTotal += treino.warmUpDuration;
    }

    // Calcular tempo para cada exercício
    treino.exercices.forEach((exercicio) => {
        const tempos = calcularTempoExercicio(exercicio, treino);
        detalhes.tempoRealExercicios += tempos.total;
        detalhes.tempoTotal += tempos.total;

        detalhes.exercicios[exercicio.nome] = {
            tempoSegundos: tempos.total,
            tempoFormatado: formatarTempo(tempos.total),
        };
    });

    // Adicionar tempo de alongamento, se definido
    if (treino.stretchDuration) {
        detalhes.tempoAlongamento = treino.stretchDuration;
        detalhes.tempoTotal += treino.stretchDuration;
    }

    // Formato legível
    detalhes.formatado = formatarTempo(detalhes.tempoTotal);

    return detalhes;
}