import { Workout } from '../../interfaces';
import { calcularTempoTreino } from '../../utils/time-utils';

interface TrainingsListProps {
  trainings: Array<Workout>;
  onSelect: (index: number) => void;
}

function TrainingsList({ trainings, onSelect }: TrainingsListProps) {
  if (trainings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Meus Treinos</h2>
        <p className="text-gray-600">Nenhum treino cadastrado. Crie um novo treino na aba "Novo Treino".</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Meus Treinos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((treino, index) => {
          const detalhes = calcularTempoTreino(treino);

          return (
            <div className="bg-white rounded-lg shadow border border-gray-100 p-4 hover:shadow-md transition-shadow" key={index}>
              <h3 className="text-xl font-semibold mb-2">{treino.nome}</h3>
              <p className="text-gray-700 mb-1"><span className="font-medium">Tempo total:</span> {detalhes.formatado}</p>
              <p className="text-gray-700 mb-3"><span className="font-medium">Exercícios:</span> {treino.exercices.length}</p>
              <div className="flex justify-end">
                <button
                  className="py-1.5 px-3 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  onClick={() => onSelect(index)}
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrainingsList;