"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestBody = exports.validateRequestParams = void 0;
const validateRequestParams = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({
                error: 'Parâmetros inválidos',
                details: result.error.format(),
            });
            return;
        }
        req.params = result.data;
        next();
    };
};
exports.validateRequestParams = validateRequestParams;
const validateRequestBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                error: 'Body inválido',
                details: result.error.format(),
            });
            return;
        }
        req.body = result.data;
        next();
    };
};
exports.validateRequestBody = validateRequestBody;
