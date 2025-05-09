import { useRef } from 'react';

interface SettingsProps {
    onClearData: () => void;
    onImportData: (data: any) => void;
    onExportData: () => void;
}

function Settings({ onClearData, onImportData, onExportData }: SettingsProps) {
    const fileInputRef = useRef(null);

    const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                onImportData(data);
            } catch (error) {
                alert('Arquivo inválido. Por favor, selecione um arquivo JSON válido.');
            }
        };

        reader.readAsText(file);

        e.target.value = '';
    };

    const handleClearData = () => {
        if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
            onClearData();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Ajustes</h2>

            <div className="mb-6">
                <button
                    onClick={handleClearData}
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Limpar Todos os Dados
                </button>
                <p className="mt-2 text-sm text-gray-600">
                    Isso irá remover todos os treinos salvos. Esta ação não pode ser desfeita.
                </p>
            </div>

            <div className="mb-6">
                <label className="block font-semibold mb-2">Exportar Dados</label>
                <button
                    onClick={onExportData}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Exportar JSON
                </button>
            </div>

            <div className="mb-6">
                <label className="block font-semibold mb-2">Importar Dados</label>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportChange}
                    accept=".json"
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
            </div>
        </div>
    );
}

export default Settings;