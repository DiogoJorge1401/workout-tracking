import { useState } from 'react';
import { WorkoutRecord } from '../../interfaces';

interface WorkoutRecordDetailProps {
  record: WorkoutRecord;
  onBack: () => void;
  onUpdate: (record: WorkoutRecord) => void;
  onDelete: () => void;
}

function WorkoutRecordDetail({ record, onBack, onUpdate, onDelete }: WorkoutRecordDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState<WorkoutRecord>({...record});
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este registro de treino?')) {
      onDelete();
    }
  };
  
  const handleExerciseSetChange = (
    exerciseIndex: number,
    setIndex: number,
    field: string,
    value: any
  ) => {
    setEditedRecord(prev => {
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
  
  const handleSaveEdit = () => {
    onUpdate(editedRecord);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedRecord({...record});
    setIsEditing(false);
  };
  
  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Editar Registro: {record.nome} - {formatDate(record.date)}
        </h2>
        
        <div className="mb-4">
          <label className="block font-semibold mb-2">Data</label>
          <input
            type="date"
            value={editedRecord.date}
            onChange={(e) => setEditedRecord({...editedRecord, date: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Horário de início</label>
            <input
              type="time"
              value={editedRecord.startTime || ''}
              onChange={(e) => setEditedRecord({...editedRecord, startTime: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block font-semibold mb-2">Horário de término</label>
            <input
              type="time"
              value={editedRecord.endTime || ''}
              onChange={(e) => setEditedRecord({...editedRecord, endTime: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block font-semibold mb-2">Observações</label>
          <textarea
            value={editedRecord.notes || ''}
            onChange={(e) => setEditedRecord({...editedRecord, notes: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-4">Exercícios</h3>
        
        {editedRecord.exercises.map((exercise, exerciseIndex) => (
          <div key={exercise.id} className="mb-8 border-b pb-6">
            <h4 className="text-lg font-medium mb-3">{exercise.nome}</h4>
            
            <div className="mb-3">
              <label className="block text-sm mb-1">Observações do exercício:</label>
              <textarea
                value={exercise.notes || ''}
                onChange={(e) => {
                  const newExercises = [...editedRecord.exercises];
                  newExercises[exerciseIndex] = {
                    ...newExercises[exerciseIndex],
                    notes: e.target.value,
                  };
                  setEditedRecord({...editedRecord, exercises: newExercises});
                }}
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
            onClick={handleCancelEdit}
            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveEdit}
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {record.nome} - {formatDate(record.date)}
        </h2>
        
        <div className="flex gap-2">
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
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          {record.startTime && (
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Horário de início:</span>
              <span>{record.startTime}</span>
            </div>
          )}
          
          {record.endTime && (
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Horário de término:</span>
              <span>{record.endTime}</span>
            </div>
          )}
        </div>
        
        {record.notes && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Observações:</h4>
            <p className="text-gray-700">{record.notes}</p>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Exercícios</h3>
      
      {record.exercises.map((exercise) => (
        <div key={exercise.id} className="mb-8 border-b pb-6">
          <h4 className="text-lg font-medium mb-3">{exercise.nome}</h4>
          
          {exercise.notes && (
            <div className="mb-3 bg-gray-50 p-3 rounded">
              <p className="text-sm italic text-gray-700">{exercise.notes}</p>
            </div>
          )}
          
          <table className="w-full border-collapse mb-4">
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
                  <td className="p-2 border border-gray-300">{set.repetitions}</td>
                  <td className="p-2 border border-gray-300">{set.weight}</td>
                  <td className="p-2 border border-gray-300">{set.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      
      <div className="flex justify-start mt-6">
        <button
          onClick={onBack}
          className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default WorkoutRecordDetail;
