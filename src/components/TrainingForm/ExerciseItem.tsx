import { useState } from 'react';
import { Exercise } from '../../interfaces';

interface ExerciseItemProps {
  onRemove: () => void;
  onExerciseChange: (exercise: Exercise) => void;
  initialData?: Exercise | null;
}

function ExerciseItem({ onRemove, onExerciseChange, initialData = null }: ExerciseItemProps) {
  const [exercise, setExercise] = useState<Exercise>(
    initialData || {
      id: crypto.randomUUID(),
      nome: '',
      restTimeIntervals: [
        //   {
        //   name: 'Aquecimento',
        //   value: 90
        // },
        // {
        //   name: 'Preparação',
        //   value: 90
        // },
        // {
        //   name: 'Preparação',
        //   value: 90
        // },
        {
          name: 'Série válida',
          value: 90
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

  return (
    <div className="card exercicio-item" style={{ marginBottom: '1rem' }}>
      <div className="form-group">
        <label>Nome do Exercício</label>
        <input
          type="text"
          value={exercise.nome}
          onChange={(e) => handleExerciseChange({ ...exercise, nome: e.target.value })}
          required
          placeholder="Ex: Supino Reto"
        />
      </div>

      <div className="form-group">
        <label>Tempos de Descanso</label>
        <div className="rest-inputs-container">
          {exercise.restTimeIntervals.map((tempo, i) => (
            <div key={i} className="rest-input-group">
              <div className="rest-header">
                <span className="rest-number">Descanso {i + 1}</span>
              </div>
              <div className="rest-details">
                <div className="input-labeled-group">
                  <label>Nome:</label>
                  <input
                    type="text"
                    className="rest-name-input"
                    value={tempo.name}
                    onChange={(e) => handleRestNameChange(i, e.target.value)}
                    placeholder="Tipo de série"
                  />
                </div>
                <div className="input-labeled-group">
                  <label>Tempo (s):</label>
                  <input
                    type="number"
                    className="rest-time-input"
                    value={tempo.value}
                    onChange={(e) => handleRestChange(i, e.target.value)}
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => onRemove()}
      >
        Remover Exercício
      </button>
    </div>
  );
}

export default ExerciseItem;