import { useState } from 'react';
import ExerciseItem from '../../components/ExerciseItem';
import { TEMPO } from '../../constants/time';
import { Exercise, Workout } from '../../interfaces';

interface TraininFormProps {
    onSubmit: (training: Workout) => void;
}

function TrainingForm({ onSubmit }: TraininFormProps) {
    const [formData, setFormData] = useState<Workout>({
        nome: '',
        warmUpDuration: TEMPO.MIN_5,
        stretchDuration: TEMPO.MIN_5,
        defaultExecutionTime: TEMPO.SEG_45,
        defaultEnrolacaoDuration: TEMPO.SEG_15,
        exercices: [],
        id: crypto.randomUUID(),
    });

    const [exercises, setExercises] = useState<Exercise[]>([
        {
            id: crypto.randomUUID(), nome: '', restTimeIntervals: [
                { name: 'Aquecimento', value: 90, repetitions: 0, weight: 0 },
                { name: 'Preparação', value: 90, repetitions: 0, weight: 0 },
                { name: 'Série válida', value: 90, repetitions: 0, weight: 0 }
            ]
        }
    ]);

    const handleInputChange = (key: keyof Workout, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: parseInt(value)
        }));
    };

    const addExercise = () => {
        setExercises([
            ...exercises,
            {
                id: crypto.randomUUID(), nome: '', restTimeIntervals: [
                    { name: 'Aquecimento', value: 90, repetitions: 0, weight: 0 },
                    { name: 'Preparação', value: 90, repetitions: 0, weight: 0 },
                    { name: 'Série válida', value: 90, repetitions: 0, weight: 0 }
                ]
            }
        ]);
    };

    const removeExercise = (id: string) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const updateExercise = (id: string, updatedExercise: Exercise) => {
        setExercises(exercises.map(ex =>
            ex.id === id ? { ...updatedExercise, id } : ex
        ));
    };
    
    const moveExerciseUp = (id: string) => {
        const index = exercises.findIndex(ex => ex.id === id);
        if (index > 0) {
            const updatedExercises = [...exercises];
            const temp = updatedExercises[index];
            updatedExercises[index] = updatedExercises[index - 1];
            updatedExercises[index - 1] = temp;
            setExercises(updatedExercises);
        }
    };
    
    const moveExerciseDown = (id: string) => {
        const index = exercises.findIndex(ex => ex.id === id);
        if (index < exercises.length - 1) {
            const updatedExercises = [...exercises];
            const temp = updatedExercises[index];
            updatedExercises[index] = updatedExercises[index + 1];
            updatedExercises[index + 1] = temp;
            setExercises(updatedExercises);
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!formData.nome) {
            alert('Por favor, informe o nome do treino.');
            return;
        }

        if (exercises.length === 0) {
            alert('Adicione pelo menos um exercício ao treino.');
            return;
        }

        const hasInvalidExercises = exercises.some(ex => !ex.nome);

        if (hasInvalidExercises) {
            alert('Por favor, preencha corretamente todos os exercícios.');
            return;
        }

        const completeFormData = {
            ...formData,
            exercices: [...exercises]
        };

        onSubmit(completeFormData);

        // Reset the form
        setFormData({
            nome: '',
            warmUpDuration: TEMPO.MIN_5,
            stretchDuration: TEMPO.MIN_5,
            defaultExecutionTime: TEMPO.SEG_45,
            defaultEnrolacaoDuration: TEMPO.SEG_15,
            exercices: [],
            id: crypto.randomUUID(),
        });

        setExercises([
            {
                id: crypto.randomUUID(), nome: '', restTimeIntervals: [
                    { name: 'Aquecimento', value: 90, repetitions: 0, weight: 0 },
                    { name: 'Preparação', value: 90, repetitions: 0, weight: 0 },
                    { name: 'Série válida', value: 90, repetitions: 0, weight: 0 },
                ]
            }
        ]);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Criar Novo Treino</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nome-treino" className="block font-semibold mb-2">Nome do Treino</label>
                    <input
                        type="text"
                        id="nome-treino"
                        value={formData.nome}
                        onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                        required
                        placeholder="Ex: Treino de Superiores"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tempo-aquecimento" className="block font-semibold mb-2">Tempo de Aquecimento (segundos)</label>
                    <input
                        type="number"
                        id="tempo-aquecimento"
                        value={formData.warmUpDuration}
                        onChange={(e) => handleInputChange('warmUpDuration', e.target.value)}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tempo-alongamento" className="block font-semibold mb-2">Tempo de Alongamento (segundos)</label>
                    <input
                        type="number"
                        id="tempo-alongamento"
                        value={formData.stretchDuration}
                        onChange={(e) => handleInputChange('stretchDuration', e.target.value)}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tempo-execucao" className="block font-semibold mb-2">Tempo Padrão de Execução por Série (segundos)</label>
                    <input
                        type="number"
                        id="tempo-execucao"
                        value={formData.defaultExecutionTime}
                        onChange={(e) => handleInputChange('defaultExecutionTime', e.target.value)}
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tempo-enrolacao" className="block font-semibold mb-2">Tempo Padrão de "Enrolação" por Série (segundos)</label>
                    <input
                        type="number"
                        id="tempo-enrolacao"
                        value={formData.defaultEnrolacaoDuration}
                        onChange={(e) => handleInputChange('defaultEnrolacaoDuration', e.target.value)}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Exercícios</h3>
                <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                        <ExerciseItem
                            key={exercise.id}
                            initialData={exercise}
                            onRemove={() => removeExercise(exercise.id)}
                            onExerciseChange={(updatedExercise) => updateExercise(exercise.id, updatedExercise)}
                            onMoveUp={index > 0 ? () => moveExerciseUp(exercise.id) : undefined}
                            onMoveDown={index < exercises.length - 1 ? () => moveExerciseDown(exercise.id) : undefined}
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

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Salvar Treino
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TrainingForm;