import { useState } from 'react';
import useWorkoutHistory from '../hooks/useWorkoutHistory';
import { WorkoutRecord } from '../interfaces';
import WorkoutRecordDetail from './WorkoutRecord/WorkoutRecordDetail';

export default function WorkoutHistory() {
    const {
        history,
        deleteWorkoutRecord,
        updateWorkoutRecord
    } = useWorkoutHistory();

    const [selectedRecord, setSelectedRecord] = useState<WorkoutRecord | null>(null);

    if (history.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Histórico de Treinos</h2>
                <p className="text-gray-600">Nenhum registro de treino encontrado. Comece registrando seu primeiro treino!</p>
            </div>
        );
    }

    const groupedByMonth: Record<string, WorkoutRecord[]> = {};

    // Agrupar registros por mês
    history.forEach(record => {
        const date = new Date(record.date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!groupedByMonth[monthYear]) {
            groupedByMonth[monthYear] = [];
        }

        groupedByMonth[monthYear].push(record);
    });

    // Ordenar registros por data
    Object.keys(groupedByMonth).forEach(month => {
        groupedByMonth[month].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // Ordenar meses do mais recente para o mais antigo
    const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => {
        const [yearA, monthA] = a.split('-');
        const [yearB, monthB] = b.split('-');
        return new Date(parseInt(yearB), parseInt(monthB) - 1).getTime() -
            new Date(parseInt(yearA), parseInt(monthA) - 1).getTime();
    });

    const formatMonth = (monthString: string) => {
        const [year, month] = monthString.split('-');
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${monthNames[parseInt(month) - 1]} de ${year}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    };

    if (selectedRecord) {
        return (
            <WorkoutRecordDetail
                record={selectedRecord}
                onBack={() => setSelectedRecord(null)}
                onUpdate={updateWorkoutRecord}
                onDelete={() => {
                    deleteWorkoutRecord(selectedRecord.id);
                    setSelectedRecord(null);
                }}
            />
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Histórico de Treinos</h2>

            {sortedMonths.map(month => (
                <div key={month} className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
                        {formatMonth(month)}
                    </h3>

                    <div className="space-y-4">
                        {groupedByMonth[month].map(record => {
                            return (
                                <div
                                    key={record.id}
                                    className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSelectedRecord(record)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center">
                                                <span className="text-lg font-medium">{record.nome}</span>
                                                <span className="text-sm text-gray-500 ml-3">{formatDate(record.date)}</span>
                                            </div>

                                            <div className="mt-2 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">Exercícios:</span> {record.exercises.length}
                                                </div>
                                                {record.startTime && record.endTime && (
                                                    <div>
                                                        <span className="font-medium">Horário:</span> {record.startTime} - {record.endTime}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-blue-600 text-sm">
                                            Ver detalhes →
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

