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
        <div className="card">
            <h2>Ajustes</h2>

            <div className="form-group">
                <button onClick={handleClearData} className="btn btn-danger">Limpar Todos os Dados</button>
                <p><small>Isso irá remover todos os treinos salvos. Esta ação não pode ser desfeita.</small></p>
            </div>

            <div className="form-group">
                <label>Exportar Dados</label>
                <button onClick={onExportData} className="btn">Exportar JSON</button>
            </div>

            <div className="form-group">
                <label>Importar Dados</label>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportChange}
                    accept=".json"
                />
            </div>
        </div>
    );
}

export default Settings;