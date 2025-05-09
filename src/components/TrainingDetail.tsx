import { useMemo, useState } from 'react';
import { calcularTempoTreino, formatarTempo } from '../utils/time-utils';
import { Exercise, Workout } from '../interfaces';
import ExerciseItem from './ExerciseItem';

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

    const moveExerciseUp = (id: string) => {
        const exercices = [...editedTraining.exercices];
        const index = exercices.findIndex(ex => ex.id === id);
        if (index > 0) {
            const temp = exercices[index];
            exercices[index] = exercices[index - 1];
            exercices[index - 1] = temp;
            setEditedTraining(prev => ({
                ...prev,
                exercices
            }));
        }
    };

    const moveExerciseDown = (id: string) => {
        const exercices = [...editedTraining.exercices];
        const index = exercices.findIndex(ex => ex.id === id);
        if (index < exercices.length - 1) {
            const temp = exercices[index];
            exercices[index] = exercices[index + 1];
            exercices[index + 1] = temp;
            setEditedTraining(prev => ({
                ...prev,
                exercices
            }));
        }
    };

    const addExercise = () => {
        const newExercise: Exercise = {
            id: crypto.randomUUID(),
            nome: '',
            restTimeIntervals: [{ name: 'Série válida', value: 90, repetitions: 0, weight: 0 }]
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
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Editar Treino</h2>

                <div className="mb-4">
                    <label className="block font-semibold mb-2">Nome do Treino</label>
                    <input
                        type="text"
                        value={editedTraining.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-2">Tempo de Aquecimento (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.warmUpDuration || 0}
                        onChange={(e) => handleInputChange('warmUpDuration', parseInt(e.target.value))}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-2">Tempo de Alongamento (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.stretchDuration || 0}
                        onChange={(e) => handleInputChange('stretchDuration', parseInt(e.target.value))}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>


                <div className="mb-4">
                    <label className="block font-semibold mb-2">Tempo Padrão de Execução por Série (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.defaultExecutionTime || 0}
                        onChange={(e) => handleInputChange('defaultExecutionTime', parseInt(e.target.value))}
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-2">Tempo Padrão de "Enrolação" por Série (segundos)</label>
                    <input
                        type="number"
                        value={editedTraining.defaultEnrolacaoDuration || 0}
                        onChange={(e) => handleInputChange('defaultEnrolacaoDuration', parseInt(e.target.value))}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Exercícios</h3>
                <div className="space-y-4">
                    {editedTraining.exercices.map((exercise, index) => (
                        <ExerciseItem
                            key={exercise.id}
                            initialData={exercise}
                            onRemove={() => removeExercise(exercise.id)}
                            onExerciseChange={(updatedEx) => handleExerciseChange(updatedEx)}
                            onMoveUp={index > 0 ? () => moveExerciseUp(exercise.id) : undefined}
                            onMoveDown={index < editedTraining.exercices.length - 1 ? () => moveExerciseDown(exercise.id) : undefined}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addExercise}
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4"
                >
                    Adicionar Exercício
                </button>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={handleCancelEdit}
                        className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">{training.nome}</h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span>Tempo de exercícios</span>
                    <span>{formatarTempo(detalhes.tempoRealExercicios)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span>Aquecimento</span>
                    <span>{formatarTempo(detalhes.tempoAquecimento)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span>Alongamento</span>
                    <span>{formatarTempo(detalhes.tempoAlongamento)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span>Tempo de enrolação por série</span>
                    <span>{formatarTempo(training.defaultEnrolacaoDuration!)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span>Tempo de duração por série</span>
                    <span>{formatarTempo(training.defaultExecutionTime!)}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                    <span>Tempo total</span>
                    <span>{detalhes.formatado}</span>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Exercícios</h3>

            <div className="mb-6">
                {Object.keys(detalhes.exercicios).map(nome => {
                    const tempoExercicio = detalhes.exercicios[nome];
                    const percentual = (tempoExercicio.tempoSegundos / maiorTempo) * 100;

                    return (
                        <div key={nome} className="mb-2">
                            <p className="mb-1">{nome} ({tempoExercicio.tempoFormatado})</p>
                            <div
                                className="h-6 bg-blue-500 rounded relative"
                                style={{ width: `${percentual}%` }}
                            >
                                <span className="absolute right-2 top-0 text-white text-xs">
                                    {tempoExercicio.tempoFormatado}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <table className="w-full border-collapse mb-4">
                <thead>
                    <tr>
                        <th className="text-left py-3 px-4 bg-gray-100 font-semibold">Exercício</th>
                        <th className="text-left py-3 px-4 bg-gray-100 font-semibold">Séries</th>
                        <th className="text-left py-3 px-4 bg-gray-100 font-semibold">Tempo</th>
                    </tr>
                </thead>
                <tbody>
                    {training.exercices.map((ex) => (
                        <>
                            <tr
                                key={ex.id}
                                className={expandedExercise === ex.id ? 'bg-blue-50' : ''}
                            >
                                <td
                                    className="py-3 px-4 border-b border-gray-200 text-blue-600 font-medium cursor-pointer"
                                    onClick={() => toggleExerciseDetails(ex.id)}
                                >
                                    <span className="inline-block mr-2 text-xs">
                                        {expandedExercise === ex.id ? '▼' : '►'}
                                    </span>
                                    {ex.nome}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    {ex.restTimeIntervals.length}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    {formatarTempo(detalhes.exercicios[ex.nome]?.tempoSegundos || 0)}
                                </td>
                            </tr>
                            {expandedExercise === ex.id && (
                                <tr className="bg-gray-50">
                                    <td colSpan={3} className="p-0">
                                        <div className="py-3 px-4">
                                            <table className="w-full border-collapse text-sm">
                                                <thead>
                                                    <tr>
                                                        <th className="text-left py-2 px-3 bg-gray-200 font-semibold">Série</th>
                                                        <th className="text-left py-2 px-3 bg-gray-200 font-semibold">Nome</th>
                                                        <th className="text-left py-2 px-3 bg-gray-200 font-semibold">Tempo de Descanso</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ex.restTimeIntervals.map((set, idx) => (
                                                        <tr key={idx}>
                                                            <td className="py-2 px-3 border-b border-gray-300">{idx + 1}</td>
                                                            <td className="py-2 px-3 border-b border-gray-300">{set.name}</td>
                                                            <td className="py-2 px-3 border-b border-gray-300">
                                                                {formatarTempo(set.value)}
                                                            </td>
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

            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={onBack}
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Voltar
                </button>
                <button
                    onClick={() => setIsEditing(true)}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Editar
                </button>
                <button
                    onClick={handleDelete}
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default TrainingDetail;