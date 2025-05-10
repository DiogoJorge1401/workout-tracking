import { useState } from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import TabNav from './components/TabNav';
import TrainingDetail from './pages/TrainingDetail';
import WorkoutRecordForm from './pages/WorkoutRecord';
import useTrainings from './hooks/useTrainings';
import useWorkoutHistory from './hooks/useWorkoutHistory';
import Settings from './pages/Settings';
import TrainingsList from './pages/TrainigList';
import TrainingForm from './pages/TrainingForm';
import WorkoutHistory from './pages/WorkoutHistory';

export type WorkoutNavigation = 'treinos' | 'novo-treino' | 'ajustes' | 'historico';
function App() {

  const [activeTab, setActiveTab] = useState<
    WorkoutNavigation
  >('treinos');
  const [selectedTraining, setSelectedTraining] = useState<number | null>(null);
  const [isRecordingWorkout, setIsRecordingWorkout] = useState(false);
  const { treinos, notification, addTraining, deleteTraining, clearAllTrainings, importTrainings, updateTraining } = useTrainings();
  const {
    addWorkoutRecord,
    importRecords,
    notification: historyNotification,
    history
  } = useWorkoutHistory();

  const handleSelectTraining = (index: number | null) => {
    setSelectedTraining(index);
  };

  const handleBackToTrainings = () => {
    setSelectedTraining(null);
    setIsRecordingWorkout(false);
  };

  const handleRecordWorkout = () => {
    setIsRecordingWorkout(true);
  };

  return (
    <>
      <Header />
      <div className="container">
        <TabNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onTabChange={() => {
            setSelectedTraining(null);
            setIsRecordingWorkout(false);
          }}
        />

        {notification.show && <Notification message={notification.message} />}
        {historyNotification.show && <Notification message={historyNotification.message} />}

        {selectedTraining !== null && !isRecordingWorkout ? (
          <TrainingDetail
            training={treinos[selectedTraining]}
            onBack={handleBackToTrainings}
            onDelete={() => {
              deleteTraining(selectedTraining);
              handleBackToTrainings();
            }}
            onUpdate={updateTraining}
            onRecordWorkout={handleRecordWorkout}
          />
        ) : selectedTraining !== null && isRecordingWorkout ? (
          <WorkoutRecordForm
            workout={treinos[selectedTraining]}
            onSave={(record) => {
              addWorkoutRecord(record);
              handleBackToTrainings();
              setActiveTab('historico');
            }}
            onCancel={handleBackToTrainings}
          />
        ) : (
          <>
            {activeTab === 'treinos' && <TrainingsList trainings={treinos} onSelect={handleSelectTraining} />}
            {activeTab === 'novo-treino' && <TrainingForm onSubmit={addTraining} />}
            {activeTab === 'historico' && <WorkoutHistory />}
            {activeTab === 'ajustes' && (
              <Settings
                onClearData={clearAllTrainings}
                onImportWorkoutTemplateData={importTrainings}
                onExportWorkoutTemplateData={() => {
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
                onImportWorkoutRecordsData={importRecords}
                onExportWorkoutRecordsData={() => {
                  const data = JSON.stringify(history);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'history.json';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  setActiveTab('historico');
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