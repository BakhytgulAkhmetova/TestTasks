import { authenticate } from '../postRequest/user';

module.exports = function (server) {
    server.post('/auth/login', async (req, res) => {
        const { login, password } = req.body;
        const result = await authenticate({ login, password });
        result? res.status(200).json(result) 
        :res.status(200).json({ status: 401, message: 'Incorrect login or password' })
    });
    
}
