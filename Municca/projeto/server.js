const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

// Simulação de dados em memória
let users = [];
let documents = [];

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Função para gerar token JWT
const generateToken = (user) => {
    return jwt.sign(user, 'seuSegredoJWT', { expiresIn: '1h' });
};

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(403);

    jwt.verify(token, 'seuSegredoJWT', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Rota de login para gerar o token JWT
app.post('/login', (req, res) => {
    const { email, name } = req.body;
    const user = { id: users.length + 1, name, email }; // Usuário simulado

    // Gera um token JWT com os dados do usuário
    const token = generateToken(user);
    res.json({ token });
});

// CRUD para Usuários

// Criar usuário
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email, documents: [] };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Listar todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Atualizar usuário
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        user.name = name;
        user.email = email;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Deletar usuário
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.status(204).send();
});

// CRUD para Documentos (protegido por JWT)

// Criar documento vinculado a um usuário (protegido por JWT)
app.post('/documents', authenticateToken, (req, res) => {
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

// Listar todos os documentos
app.get('/documents', (req, res) => {
    res.json(documents);
});

// Atualizar documento (protegido por JWT)
app.put('/documents/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const document = documents.find(d => d.id === parseInt(id));
    if (document) {
        document.name = name;
        document.status = status;
        res.json(document);
    } else {
        res.status(404).json({ message: 'Document not found' });
    }
});

// Deletar documento (protegido por JWT)
app.delete('/documents/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    documents = documents.filter(d => d.id !== parseInt(id));
    res.status(204).send();
});

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
