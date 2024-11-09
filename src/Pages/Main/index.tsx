import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.scss"

interface User {
    first_name: string;
}

interface Result {
    result_id: number;
    score: number;
    created_at: string;
    users: User;
}

export function Main() {

    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get<Result[]>('http://localhost:3000/results');
                setResults(response.data);
                console.log("wyniki to " + JSON.stringify(response.data));
                setLoading(false);
            } catch (err) {
                setError('Wystąpił błąd podczas ładowania wyników');
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return <p>Ładowanie wyników...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const exampleResults: Result[] = [
        { result_id: 1, score: 95, created_at: '2024-11-01T12:00:00Z', users: { first_name: 'Jan' } },
        { result_id: 2, score: 88, created_at: '2024-11-02T12:00:00Z', users: { first_name: 'Anna' } },
        { result_id: 3, score: 76, created_at: '2024-11-03T12:00:00Z', users: { first_name: 'Piotr' } },
        { result_id: 1, score: 95, created_at: '2024-11-01T12:00:00Z', users: { first_name: 'Jan' } },
        { result_id: 2, score: 88, created_at: '2024-11-02T12:00:00Z', users: { first_name: 'Anna' } },
        { result_id: 3, score: 76, created_at: '2024-11-03T12:00:00Z', users: { first_name: 'Piotr' } },
        { result_id: 1, score: 95, created_at: '2024-11-01T12:00:00Z', users: { first_name: 'Jan' } },
        { result_id: 2, score: 88, created_at: '2024-11-02T12:00:00Z', users: { first_name: 'Anna' } },
        { result_id: 3, score: 76, created_at: '2024-11-03T12:00:00Z', users: { first_name: 'Piotr' } },
        { result_id: 1, score: 95, created_at: '2024-11-01T12:00:00Z', users: { first_name: 'Jan' } },
        { result_id: 2, score: 88, created_at: '2024-11-02T12:00:00Z', users: { first_name: 'Anna' } },
        { result_id: 3, score: 76, created_at: '2024-11-03T12:00:00Z', users: { first_name: 'Piotr' } },
        
    ];

    return (
        <div id="table_result">
            <h1>Results !</h1>
            <table >
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Wynik</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
            {results.concat(exampleResults).map((result) => (
                    <tr key={result.result_id}>
                        <td>{result.users.first_name}</td>
                        <td>{result.score}</td>
                        <td>{new Date(result.created_at).toLocaleDateString()}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
        </div>
        
    );
}