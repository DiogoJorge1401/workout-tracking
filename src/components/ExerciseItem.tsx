import { useState } from 'react';
import { Exercise } from '../interfaces';

interface ExerciseItemProps {
  onRemove: () => void;
  onExerciseChange: (exercise: Exercise) => void;
  initialData?: Exercise | null;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

function ExerciseItem({ onRemove, onExerciseChange, initialData = null, onMoveUp, onMoveDown }: ExerciseItemProps) {
  const [exercise, setExercise] = useState<Exercise>(
    initialData || {
      id: crypto.randomUUID(),
      nome: '',
      restTimeIntervals: [
        {
          name: 'Série válida',
          value: 90,
          repetitions: 0,
          weight: 0,
        }]
    }
  );

  const handleExerciseChange = (updatedExercise: Exercise) => {
    setExercise(updatedExercise);
    onExerciseChange(updatedExercise);
  };

  const handleRestChange = (index: number, value: string,) => {
    const newTempoDescanso = [...exercise.restTimeIntervals];
    newTempoDescanso[index] = {
      ...newTempoDescanso[index],
      value: parseInt(value),
    }
    handleExerciseChange({ ...exercise, restTimeIntervals: newTempoDescanso });
  };

  const handleRestNameChange = (index: number, value: string) => {
    const newTempoDescanso = [...exercise.restTimeIntervals];
    newTempoDescanso[index] = {
      ...newTempoDescanso[index],
      name: value,
    }
    handleExerciseChange({ ...exercise, restTimeIntervals: newTempoDescanso });
  };

  const handleAddRestTimeInterval = () => {
    const newRestTimeIntervals = [
      ...exercise.restTimeIntervals,
      {
        name: 'Série válida',
        value: 90,
        repetitions: 0,
        weight: 0,
      },
    ];
    handleExerciseChange({ ...exercise, restTimeIntervals: newRestTimeIntervals });
  };
   const handleRemoveRestTimeInterval = (index: number) => {
    const newRestTimeIntervals = exercise.restTimeIntervals.filter((_, i) => i !== index);
    handleExerciseChange({ ...exercise, restTimeIntervals: newRestTimeIntervals });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="mb-4">
        <label className="block font-semibold mb-2">Nome do Exercício</label>
        <input
          type="text"
          value={exercise.nome}
          onChange={(e) => handleExerciseChange({ ...exercise, nome: e.target.value })}
          required
          placeholder="Ex: Supino Reto"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Tempos de Descanso</label>
        <div className="flex flex-col gap-3">
          {exercise.restTimeIntervals.map((tempo, i) => (
            <div key={i} className="border border-gray-300 rounded bg-gray-50 p-3">
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Descanso {i + 1}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-sm text-gray-600 mb-1">Nome:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={tempo.name}
                    onChange={(e) => handleRestNameChange(i, e.target.value)}
                    placeholder="Tipo de série"
                  />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-sm text-gray-600 mb-1">Tempo (s):</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={tempo.value}
                    onChange={(e) => handleRestChange(i, e.target.value)}
                    min="0"
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveRestTimeInterval(i)}
                className="mt-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-xs"
              >
                Remover Série
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 text-sm"
          onClick={handleAddRestTimeInterval}
        >
          Adicionar Série
        </button>

        {onMoveUp && (
          <button
            type="button"
            className="px-3 py-1.5 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
            onClick={onMoveUp}
            title="Mover para cima"
          >
            ▲
          </button>
        )}
        
        {onMoveDown && (
          <button
            type="button"
            className="px-3 py-1.5 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
            onClick={onMoveDown}
            title="Mover para baixo"
          >
            ▼
          </button>
        )}
        
        <button
          type="button"
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
          onClick={() => onRemove()}
        >
          Remover Exercício
        </button>
      </div>
    </div>
  );
}

export default ExerciseItem;