import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [documents, setDocuments] = useState([]);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios.get('/users');
            setUsers(result.data);
        };
        fetchUsers();
    }, []);

    // Fetch documents
    useEffect(() => {
        const fetchDocuments = async () => {
            const result = await axios.get('/documents');
            setDocuments(result.data);
        };
        fetchDocuments();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>

            <h1>Documents</h1>
            <ul>
                {documents.map(doc => (
                    <li key={doc.id}>
                        {doc.name} - Status: {doc.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
