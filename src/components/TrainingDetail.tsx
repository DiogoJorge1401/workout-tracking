import { useMemo, useState } from 'react';
import { calcularTempoTreino, formatarTempo } from '../utils/time-utils';
import { Workout } from '../interfaces';

interface TrainingDetailProps {
    training: Workout
    onBack: () => void;
    onDelete: () => void;
}

function TrainingDetail({ training, onBack, onDelete }: TrainingDetailProps) {
    const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
    const detalhes = useMemo(() => calcularTempoTreino(training), [training]);

    const maiorTempo = useMemo(() => {
        let max = 0;
        Object.keys(detalhes.exercicios).forEach(nome => {
            if (detalhes.exercicios[nome].tempoSegundos > max) {
                max = detalhes.exercicios[nome].tempoSegundos;
            }
        });
        return max;
    }, [detalhes]);

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir o treino "${training.nome}"?`)) {
            onDelete();
        }
    };


    const toggleExerciseDetails = (exerciseId: string) => {
        if (expandedExercise === exerciseId) {
            setExpandedExercise(null);
        } else {
            setExpandedExercise(exerciseId);
        }
    };

    return (
        <div className="card">
            <h2>{training.nome}</h2>

            <div className="summary">

                <div className="summary-item">
                    <span>Tempo de exercícios</span>
                    <span>{formatarTempo(detalhes.tempoRealExercicios)}</span>
                </div>
                <div className="summary-item">
                    <span>Aquecimento</span>
                    <span>{formatarTempo(detalhes.tempoAquecimento)}</span>
                </div>
                <div className="summary-item">
                    <span>Alongamento</span>
                    <span>{formatarTempo(detalhes.tempoAlongamento)}</span>
                </div>
                <div className="summary-item">
                    <span>Tempo de enrolação por série</span>
                    <span>{formatarTempo(training.defaultEnrolacaoDuration!)}</span>
                </div>
                <div className="summary-item">
                    <span>Tempo de duração por série</span>
                    <span>{formatarTempo(training.defaultExecutionTime!)}</span>
                </div>
                <div className="summary-item">
                    <span>Tempo total</span>
                    <span>{detalhes.formatado}</span>
                </div>
            </div>

            <h3>Exercícios</h3>

            <div className="barras-container">
                {Object.keys(detalhes.exercicios).map(nome => {
                    const tempoExercicio = detalhes.exercicios[nome];
                    const percentual = (tempoExercicio.tempoSegundos / maiorTempo) * 100;

                    return (
                        <div key={nome}>
                            <p>{nome} ({tempoExercicio.tempoFormatado})</p>
                            <div className="time-bar" style={{ width: `${percentual}%` }}>
                                <span className="time-label">{tempoExercicio.tempoFormatado}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Exercício</th>
                        <th>Séries</th>
                        <th>Tempo</th>
                    </tr>
                </thead>
                <tbody>
                    {training.exercices.map((ex) => (
                        <>
                            <tr key={ex.id} className={expandedExercise === ex.id ? 'expanded' : ''}>
                                <td
                                    className="exercise-name"
                                    onClick={() => toggleExerciseDetails(ex.id)}
                                >
                                    <span className="exercise-toggle">
                                        {expandedExercise === ex.id ? '▼' : '► '}
                                    </span>
                                    {ex.nome}
                                </td>
                                <td>{ex.restTimeIntervals.length}</td>
                                <td>{formatarTempo(detalhes.exercicios[ex.nome]?.tempoSegundos || 0)}</td>
                            </tr>
                            {expandedExercise === ex.id && (
                                <tr className="sets-row">
                                    <td colSpan={3}>
                                        <div className="sets-detail">
                                            <table className="sets-table">
                                                <thead>
                                                    <tr>
                                                        <th>Série</th>
                                                        <th>Nome</th>
                                                        <th>Tempo de Descanso</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ex.restTimeIntervals.map((set, idx) => (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>{set.name}</td>
                                                            <td>{formatarTempo(set.value)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>

            <div className="actions">
                <button onClick={onBack} className="btn btn-secondary">Voltar</button>
                <button onClick={() => alert('Funcionalidade de edição será implementada em uma versão futura.')} className="btn">Editar</button>
                <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
            </div>
        </div>
    );
}

export default TrainingDetail;