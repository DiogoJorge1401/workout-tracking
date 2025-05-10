import { useEffect, useState } from 'react';
import { WorkoutRecord } from '../interfaces';

export default function useWorkoutHistory() {
    const [history, setHistory] = useState<WorkoutRecord[]>([]);
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedHistory = localStorage.getItem('workout-history');

        if (savedHistory && savedHistory !== '[]') {
            try {
                const parsedHistory = JSON.parse(savedHistory);
                setHistory(parsedHistory);
            } catch (error) {
                console.error('Error parsing saved workout history:', error);
                setHistory([]);
            }
        } else {
            setHistory([]);
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('workout-history', JSON.stringify(history));
        }
    }, [history, isInitialized]);

    const showNotification = (message: string) => {
        setNotification({ show: true, message });
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 3000);
    };

    const addWorkoutRecord = (newRecord: WorkoutRecord) => {
        setHistory((prevHistory) => [...prevHistory, newRecord]);
        showNotification('Treino registrado com sucesso!');
    };

    const updateWorkoutRecord = (updatedRecord: WorkoutRecord) => {
        setHistory((prevHistory) =>
            prevHistory.map((record) =>
                record.id === updatedRecord.id ? updatedRecord : record
            )
        );
        showNotification('Registro de treino atualizado com sucesso!');
    };

    const deleteWorkoutRecord = (id: string) => {
        setHistory((prevHistory) => prevHistory.filter((record) => record.id !== id));
        showNotification('Registro de treino excluído com sucesso!');
    };

    const getRecordsForWorkout = (workoutId: string) => {
        return history.filter(record => record.workoutId === workoutId);
    };

    const getRecentSetDataForExercise = (exerciseId: string) => {
        // Encontra os registros mais recentes para um exercício específico
        const exerciseRecords = history
            .flatMap(workoutRecord =>
                workoutRecord.exercises.filter(exercise => exercise.exerciseId === exerciseId)
            )
            .sort((a, b) => {
                const dateA = history.find(record =>
                    record.exercises.some(ex => ex.id === a.id))?.date || '';
                const dateB = history.find(record =>
                    record.exercises.some(ex => ex.id === b.id))?.date || '';
                return new Date(dateB).getTime() - new Date(dateA).getTime();
            });

        return exerciseRecords.length > 0 ? exerciseRecords[0] : null;
    };

    const importRecords = (importedRecords: WorkoutRecord[]) => {
        setHistory(importedRecords);
        showNotification('Dados importados com sucesso!');
    }

    return {
        history,
        notification,
        addWorkoutRecord,
        deleteWorkoutRecord,
        updateWorkoutRecord,
        getRecordsForWorkout,
        getRecentSetDataForExercise,
        importRecords,
        showNotification
    };
}
