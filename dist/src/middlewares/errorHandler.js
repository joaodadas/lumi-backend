"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error('💥 Erro capturado:', err);
    const statusCode = err.status || 500;
    const message = err.message || 'Erro interno no servidor';
    res.status(statusCode).json({ error: message });
}
