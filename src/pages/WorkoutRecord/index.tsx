import { useState } from 'react';
import { ExerciseRecord, SetRecord, Workout, WorkoutRecord } from '../../interfaces';

interface WorkoutRecordFormProps {
  workout: Workout;
  onSave: (record: WorkoutRecord) => void;
  onCancel: () => void;
}

function WorkoutRecordForm({ workout, onSave, onCancel }: WorkoutRecordFormProps) {
  const initializeExerciseRecords = (): ExerciseRecord[] => {
    return workout.exercises.map(exercise => ({
      id: crypto.randomUUID(),
      exerciseId: exercise.id,
      nome: exercise.nome,
      sets: exercise.restTimeIntervals.map(interval => ({
        id: crypto.randomUUID(),
        restIntervalId: interval.name,
        repetitions: interval.repetitions || 0,
        weight: interval.weight || 0,
        notes: '',
      })),
      notes: '',
    }));
  };

  const [record, setRecord] = useState<WorkoutRecord>({
    id: crypto.randomUUID(),
    workoutId: workout.id,
    nome: workout.nome,
    date: new Date().toISOString().split('T')[0],
    startTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
    exercises: initializeExerciseRecords(),
    notes: '',
  });

  const handleExerciseSetChange = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof SetRecord,
    value: any
  ) => {
    setRecord(prev => {
      const newExercises = [...prev.exercises];
      const newSets = [...newExercises[exerciseIndex].sets];

      newSets[setIndex] = {
        ...newSets[setIndex],
        [field]: field === 'repetitions' || field === 'weight' ? Number(value) : value,
      };

      newExercises[exerciseIndex] = {
        ...newExercises[exerciseIndex],
        sets: newSets,
      };

      return {
        ...prev,
        exercises: newExercises,
      };
    });
  };

  const handleExerciseNotesChange = (exerciseIndex: number, notes: string) => {
    setRecord(prev => {
      const newExercises = [...prev.exercises];
      newExercises[exerciseIndex] = {
        ...newExercises[exerciseIndex],
        notes,
      };

      return {
        ...prev,
        exercises: newExercises,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!record.date) {
      alert('Por favor, insira a data do treino.');
      return;
    }

    // Adicionar horário de término, se não estiver definido
    const completeRecord = {
      ...record,
      endTime: record.endTime || new Date().toTimeString().split(' ')[0].slice(0, 5),
    };

    onSave(completeRecord);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Registrar Treino: {workout.nome}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Data</label>
          <input
            type="date"
            value={record.date}
            onChange={(e) => setRecord({ ...record, date: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Horário de início</label>
            <input
              type="time"
              value={record.startTime}
              onChange={(e) => setRecord({ ...record, startTime: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Horário de término</label>
            <input
              type="time"
              value={record.endTime || ''}
              onChange={(e) => setRecord({ ...record, endTime: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Observações</label>
          <textarea
            value={record.notes || ''}
            onChange={(e) => setRecord({ ...record, notes: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-4">Exercícios</h3>

        {record.exercises.map((exercise, exerciseIndex) => (
          <div key={exercise.id} className="mb-8 border-b pb-6">
            <h4 className="text-lg font-medium mb-3">{exercise.nome}</h4>

            <div className="mb-3">
              <label className="block text-sm mb-1">Observações do exercício:</label>
              <textarea
                value={exercise.notes || ''}
                onChange={(e) => handleExerciseNotesChange(exerciseIndex, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={2}
              />
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border border-gray-300">Série</th>
                  <th className="text-left p-2 border border-gray-300">Repetições</th>
                  <th className="text-left p-2 border border-gray-300">Peso (kg)</th>
                  <th className="text-left p-2 border border-gray-300">Observações</th>
                </tr>
              </thead>
              <tbody>
                {exercise.sets.map((set, setIndex) => (
                  <tr key={set.id}>
                    <td className="p-2 border border-gray-300">{setIndex + 1}</td>
                    <td className="p-2 border border-gray-300">
                      <input
                        type="number"
                        value={set.repetitions}
                        onChange={(e) => handleExerciseSetChange(
                          exerciseIndex,
                          setIndex,
                          'repetitions',
                          e.target.value
                        )}
                        className="w-full p-1 border border-gray-300 rounded"
                        min="0"
                      />
                    </td>
                    <td className="p-2 border border-gray-300">
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => handleExerciseSetChange(
                          exerciseIndex,
                          setIndex,
                          'weight',
                          e.target.value
                        )}
                        className="w-full p-1 border border-gray-300 rounded"
                        min="0"
                        step="0.5"
                      />
                    </td>
                    <td className="p-2 border border-gray-300">
                      <input
                        type="text"
                        value={set.notes || ''}
                        onChange={(e) => handleExerciseSetChange(
                          exerciseIndex,
                          setIndex,
                          'notes',
                          e.target.value
                        )}
                        placeholder="Ex: falha, drop set, etc"
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Salvar Registro
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutRecordForm;
