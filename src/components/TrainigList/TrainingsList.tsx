import { Workout } from '../../interfaces';
import { calcularTempoTreino } from '../../utils/time-utils';


interface TrainingsListProps {
  trainings: Array<Workout>;
  onSelect: (index: number) => void;
}

function TrainingsList({ trainings, onSelect }: TrainingsListProps) {
  if (trainings.length === 0) {
    return (
      <div className="card">
        <h2>Meus Treinos</h2>
        <p>Nenhum treino cadastrado. Crie um novo treino na aba "Novo Treino".</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Meus Treinos</h2>
      <div className="grid">
        {trainings.map((treino, index) => {
          const detalhes = calcularTempoTreino(treino);

          return (
            <div className="card" key={index}>
              <h3>{treino.nome}</h3>
              <p><strong>Tempo total:</strong> {detalhes.formatado}</p>
              <p><strong>Exercícios:</strong> {treino.exercices.length}</p>
              <div className="actions">
                <button
                  className="btn btn-sm ver-treino"
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