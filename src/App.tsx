import { useState } from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import Settings from './components/Settings/Settings';
import TabNav from './components/TabNav';
import TrainingDetail from './components/TrainingDetail';
import TrainingForm from './components/TrainingForm/TrainingForm';
import TrainingsList from './components/TrainigList/TrainingsList';
import useTrainings from './hooks/useTrainings';

export type WorkoutNavigation = 'treinos' | 'novo-treino' | 'ajustes';
function App() {

  const [activeTab, setActiveTab] = useState<
    WorkoutNavigation
  >('treinos');
  const [selectedTraining, setSelectedTraining] = useState<number | null>(null);
  const { treinos, notification, addTraining, deleteTraining, clearAllTrainings, importTrainings } = useTrainings();

  const handleSelectTraining = (index: number | null) => {
    setSelectedTraining(index);
  };

  const handleBackToTrainings = () => {
    setSelectedTraining(null);
  };

  return (
    <>
      <Header />
      <div className="container">
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {notification.show && <Notification message={notification.message} />}

        {selectedTraining !== null ? (
          <TrainingDetail
            training={treinos[selectedTraining]}
            onBack={handleBackToTrainings}
            onDelete={() => {
              deleteTraining(selectedTraining);
              handleBackToTrainings();
            }}
          />
        ) : (
          <>
            {activeTab === 'treinos' && <TrainingsList trainings={treinos} onSelect={handleSelectTraining} />}
            {activeTab === 'novo-treino' && <TrainingForm onSubmit={addTraining} />}
            {activeTab === 'ajustes' && (
              <Settings
                onClearData={clearAllTrainings}
                onImportData={importTrainings}
                onExportData={() => {
                  const data = JSON.stringify(treinos);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'treinos.json';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  setActiveTab('treinos');
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;