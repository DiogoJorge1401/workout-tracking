import { WorkoutNavigation } from '../App';

interface TabNavProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<WorkoutNavigation>>;
}

function TabNav({ activeTab, setActiveTab }: TabNavProps) {
  const tabs: {
    id: WorkoutNavigation;
    label: string;
  }[]
    = [
      { id: 'treinos', label: 'Meus Treinos' },
      { id: 'novo-treino', label: 'Novo Treino' },
      { id: 'ajustes', label: 'Ajustes' }
    ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default TabNav;