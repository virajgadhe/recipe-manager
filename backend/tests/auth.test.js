"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const prisma_1 = require("../src/lib/prisma");
describe('Authentication API', () => {
    const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
    };
    beforeAll(async () => {
        // Clean database before tests
        await prisma_1.prisma.user.deleteMany({
            where: { email: testUser.email },
        });
    });
    afterAll(async () => {
        // Cleanup after tests
        await prisma_1.prisma.user.deleteMany({
            where: { email: testUser.email },
        });
        await prisma_1.prisma.$disconnect();
    });
    it('should register a new user', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/register').send(testUser);
        expect(res.status).toBe(201);
        expect(res.body.email).toBe(testUser.email);
        expect(res.body).not.toHaveProperty('passwordHash');
    });
    it('should login successfully and return token', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email: testUser.email,
            password: testUser.password,
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
    it('should return 401 for protected route without token', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/auth/me');
        expect(res.status).toBe(401);
    });
});
