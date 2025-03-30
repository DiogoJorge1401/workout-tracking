import { useState } from 'react';
import ExerciseItem from './ExerciseItem';
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
                { name: 'Aquecimento', value: 90 },
                { name: 'Preparação', value: 90 },
                { name: 'Série válida', value: 90 }
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
                    { name: 'Aquecimento', value: 90 },
                    { name: 'Preparação', value: 90 },
                    { name: 'Série válida', value: 90 }
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
                    { name: 'Aquecimento', value: 90 },
                    { name: 'Preparação', value: 90 },
                    { name: 'Série válida', value: 90 }
                ]
            }
        ]);
    };

    return (
        <div className="card">
            <h2>Criar Novo Treino</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome-treino">Nome do Treino</label>
                    <input
                        type="text"
                        id="nome-treino"
                        value={formData.nome}
                        onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                        required
                        placeholder="Ex: Treino de Superiores"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tempo-aquecimento">Tempo de Aquecimento (segundos)</label>
                    <input
                        type="number"
                        id="tempo-aquecimento"
                        value={formData.warmUpDuration}
                        onChange={(e) => handleInputChange('warmUpDuration', e.target.value)}
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tempo-alongamento">Tempo de Alongamento (segundos)</label>
                    <input
                        type="number"
                        id="tempo-alongamento"
                        value={formData.stretchDuration}
                        onChange={(e) => handleInputChange('stretchDuration', e.target.value)}
                        min="0"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="tempo-execucao">Tempo Padrão de Execução por Série (segundos)</label>
                    <input
                        type="number"
                        id="tempo-execucao"
                        value={formData.defaultExecutionTime}
                        onChange={(e) => handleInputChange('defaultExecutionTime', e.target.value)}
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tempo-enrolacao">Tempo Padrão de "Enrolação" por Série (segundos)</label>
                    <input
                        type="number"
                        id="tempo-enrolacao"
                        value={formData.defaultEnrolacaoDuration}
                        onChange={(e) => handleInputChange('defaultEnrolacaoDuration', e.target.value)}
                        min="0"
                    />
                </div>

                <h3>Exercícios</h3>
                <div id="exercicios-lista">
                    {exercises.map(exercise => (
                        <ExerciseItem
                            key={exercise.id}
                            initialData={exercise}
                            onRemove={() => removeExercise(exercise.id)}
                            onExerciseChange={(updatedExercise) => updateExercise(exercise.id, updatedExercise)}
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
                    <button type="submit" className="btn btn-success">Salvar Treino</button>
                </div>
            </form>
        </div>
    );
}

export default TrainingForm;