import { WorkoutNavigation } from '../App';

interface TabNavProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<WorkoutNavigation>>;
  onTabChange?: () => void; // Callback adicional quando uma aba é alterada
}

function TabNav({ activeTab, setActiveTab, onTabChange }: TabNavProps) {
  const tabs: {
    id: WorkoutNavigation;
    label: string;
  }[] = [
      { id: 'treinos', label: 'Meus Treinos' },
      { id: 'novo-treino', label: 'Novo Treino' },
      { id: 'ajustes', label: 'Ajustes' }
    ];

  const handleTabClick = (tabId: WorkoutNavigation) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange();
    }
  };

  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`px-4 py-3 cursor-pointer border-b-2 transition-colors ${activeTab === tab.id
            ? 'border-blue-500 font-semibold text-blue-600'
            : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default TabNav;