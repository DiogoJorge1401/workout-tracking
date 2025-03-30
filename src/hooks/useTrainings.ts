import { useEffect, useState } from 'react';
import { workout } from '../data/workout';
import { Workout } from '../interfaces';

export default function useTrainings() {
    const [treinos, setTreinos] = useState<Workout[]>([]);
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const treinosSalvos = localStorage.getItem('treinos');

        if (treinosSalvos && treinosSalvos !== '[]') {
            try {
                const parsedTreinos = JSON.parse(treinosSalvos);
                setTreinos(parsedTreinos);
            } catch (error) {
                console.error('Error parsing saved workouts:', error);
                setTreinos(workout);
            }
        } else {
            setTreinos(workout);
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('treinos', JSON.stringify(treinos));
        }
    }, [treinos, isInitialized]);

    const showNotification = (message: string) => {
        setNotification({ show: true, message });
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 3000);
    };

    const addTraining = (newTraining: Workout) => {
        setTreinos((prevTreinos) => [...prevTreinos, newTraining]);
        showNotification('Treino criado com sucesso!');
    };

    const deleteTraining = (index: number) => {
        setTreinos((prevTreinos) => prevTreinos.filter((_, i) => i !== index));
        showNotification('Treino excluído com sucesso!');
    };

    const clearAllTrainings = () => {
        setTreinos([]);
        showNotification('Todos os dados foram apagados!');
    };

    const importTrainings = (importedTrainings: Workout[]) => {
        setTreinos(importedTrainings);
        showNotification('Dados importados com sucesso!');
    };

    return {
        treinos,
        notification,
        addTraining,
        deleteTraining,
        clearAllTrainings,
        importTrainings,
        showNotification
    };
}