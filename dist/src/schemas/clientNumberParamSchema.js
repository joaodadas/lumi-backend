"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientNumberParamSchema = void 0;
const zod_1 = require("zod");
exports.clientNumberParamSchema = zod_1.z.object({
    clientNumber: zod_1.z
        .string()
        .min(8, 'O número do cliente deve ter pelo menos 8 dígitos'),
});
