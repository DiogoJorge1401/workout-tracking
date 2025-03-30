import { useMemo, useState } from 'react';
import { calcularTempoTreino, formatarTempo } from '../utils/time-utils';
import { Exercise, Workout } from '../interfaces';
import ExerciseItem from './TrainingForm/ExerciseItem';

interface TrainingDetailProps {
    training: Workout
    onBack: () => void;
    onDelete: () => void;
    onUpdate: (updatedTraining: Workout) => void;
}

function TrainingDetail({ training, onBack, onDelete, onUpdate }: TrainingDetailProps) {
    const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTraining, setEditedTraining] = useState<Workout>({ ...training });

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

    const handleInputChange = (key: keyof Workout, value: any) => {
        setEditedTraining(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleExerciseChange = (updatedExercise: Exercise) => {
        setEditedTraining(prev => ({
            ...prev,
            exercices: prev.exercices.map(ex =>
                ex.id === updatedExercise.id ? updatedExercise : ex
            )
        }));
    };

    const removeExercise = (id: string) => {
        setEditedTraining(prev => ({
            ...prev,
            exercices: prev.exercices.filter(ex => ex.id !== id)
        }));
    };

    const addExercise = () => {
        const newExercise: Exercise = {
            id: crypto.randomUUID(),
            nome: '',
            restTimeIntervals: [{ name: 'Série válida', value: 90 }]
        };

        setEditedTraining(prev => ({
            ...prev,
            exercices: [...prev.exercices, newExercise]
        }));
    };

    const handleSave = () => {
        // Validate data
        if (!editedTraining.nome) {
            alert('Por favor, informe o nome do treino.');
            return;
        }

        if (editedTraining.exercices.length === 0) {
            alert('Adicione pelo menos um exercício ao treino.');
            return;
        }

        if (editedTraining.exercices.some(ex => !ex.nome)) {
            alert('Por favor, preencha corretamente o nome de todos os exercícios.');
            return;
        }

        onUpdate(editedTraining);

        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        if (window.confirm('Deseja cancelar a edição? Todas as alterações serão perdidas.')) {
            setEditedTraining({ ...training });
            setIsEditing(false);
        }
    };


    if (isEditing) {
        return (
            <div className="card">
                <h2>Editar Treino</h2>

                <div className="form-group">
                    <label>Nome do Treino</label>
                    <input
                        type="text"
                        value={editedTraining.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tempo de Aquecimento (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.warmUpDuration || 0}
                        onChange={(e) => handleInputChange('warmUpDuration', parseInt(e.target.value))}
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Tempo de Alongamento (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.stretchDuration || 0}
                        onChange={(e) => handleInputChange('stretchDuration', parseInt(e.target.value))}
                        min="0"
                    />
                </div>


                <div className="form-group">
                    <label>Tempo Padrão de Execução por Série (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.defaultExecutionTime || 0}
                        onChange={(e) => handleInputChange('defaultExecutionTime', parseInt(e.target.value))}
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label>Tempo Padrão de "Enrolação" por Série (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.defaultEnrolacaoDuration || 0}
                        onChange={(e) => handleInputChange('defaultEnrolacaoDuration', parseInt(e.target.value))}
                        min="0"
                    />
                </div>

                <h3>Exercícios</h3>
                <div id="exercicios-lista">
                    {editedTraining.exercices.map((exercise) => (
                        <ExerciseItem
                            key={exercise.id}
                            initialData={exercise}
                            onRemove={() => removeExercise(exercise.id)}
                            onExerciseChange={(updatedEx) => handleExerciseChange(updatedEx)}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addExercise}
                    className="btn btn-secondary"
                >
                    Adicionar Exercício
                </button>

                <div className="actions">
                    <button onClick={handleCancelEdit} className="btn btn-secondary">Cancelar</button>
                    <button onClick={handleSave} className="btn btn-success">Salvar Alterações</button>
                </div>
            </div>
        );
    }

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
                <button onClick={() => setIsEditing(true)} className="btn">Editar</button>
                <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
            </div>
        </div>
    );
}

export default TrainingDetail;