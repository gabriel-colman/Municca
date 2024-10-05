const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Simulação de dados em memória
let users = [];
let documents = [];

app.use(bodyParser.json());

// CRUD para Usuários

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email, documents: [] };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.json(users);
});

// Testes para a rota de Usuários

describe('POST /users', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('John Doe');
        expect(res.body.email).toBe('john.doe@example.com');
    });
});

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});

// Testes para a rota de Documentos

app.post('/documents', (req, res) => {
    const { name, status, userId } = req.body;
    const user = users.find(u => u.id === parseInt(userId));
    if (user) {
        const newDocument = { id: documents.length + 1, name, status, userId };
        documents.push(newDocument);
        user.documents.push(newDocument);
        res.status(201).json(newDocument);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/documents', (req, res) => {
    res.json(documents);
});

describe('POST /documents', () => {
    it('should create a new document for a user', async () => {
        const userRes = await request(app)
            .post('/users')
            .send({
                name: 'Jane Doe',
                email: 'jane.doe@example.com'
            });
        
        const userId = userRes.body.id;
        
        const res = await request(app)
            .post('/documents')
            .send({
                name: 'Document 1',
                status: 'active',
                userId: userId
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Document 1');
        expect(res.body.status).toBe('active');
    });
});

describe('GET /documents', () => {
    it('should return all documents', async () => {
        const res = await request(app).get('/documents');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
