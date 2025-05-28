// tests/envs.test.ts
// NO importes envs y isProd aquí directamente al inicio del archivo
// import { envs, isProd } from "../../config/envs"; // ¡Quita estas líneas!

describe("envs", () => {

    // Guarda una copia del process.env original para restaurar después
    const originalEnv = process.env;

    // Todas las variables de entorno que el archivo envs.ts requiere para funcionar
    // Deben estar definidas para los tests que no esperan errores.
    const mockEnv = {
        ENV: 'test',
        PORT: '3000', // Como string, env-var lo parsea
        MONGODB_URI: 'mongodb://quantumTest:quantumTest@quantum-db-test:27017',
        WEBSERVICE_URL: 'http://localhost:3000',
        IS_SENT_EMAIL: 'false', // Como string, env-var lo parsea

        CLOUDINARY_CLOUD_NAME: "test_cloud",
        CLOUDINARY_API_KEY: "test_key",
        CLOUDINARY_API_SECRET: "test_secret",

        JWT_SEED: "SEEDTEST",

        MAILER_EMAIL: "test@test.com",
        MAILER_SECRET: "test_secret",
        MAILER_SERVICE: "test_service"
    };

    // --- beforeEach: Se ejecuta antes de CADA test ---
    beforeEach(() => {
        // Reinicia process.env a la configuración original en cada test
        // Esto previene que un test afecte a otro.
        jest.resetModules(); // Borra la caché de módulos de Jest
        process.env = { ...originalEnv, ...mockEnv }; // Carga un mockEnv predeterminado
    });

    // --- afterEach: Se ejecuta después de CADA test ---
    afterEach(() => {
        // Restaura process.env a su estado original del sistema.
        process.env = originalEnv;
    });

    // --- Test 1: Verificar que envs carga correctamente con valores por defecto ---
    it("should return the correct environment variables when all are defined", () => {
        // Necesitamos importar el módulo AQUÍ para que lea las variables de process.env
        // después de que beforeEach las ha establecido.
        const { envs } = require("../../config/envs");

        expect(envs).toEqual({
            ENV: 'test',
            PORT: 3000,
            MONGODB_URI: 'mongodb://quantumTest:quantumTest@quantum-db-test:27017',
            WEBSERVICE_URL: 'http://localhost:3000',
            IS_SENT_EMAIL: false,

            CLOUDINARY_CLOUD_NAME: "test_cloud",
            CLOUDINARY_API_KEY: "test_key",
            CLOUDINARY_API_SECRET: "test_secret",

            JWT_SEED: "SEEDTEST",

            MAILER_EMAIL: "test@test.com",
            MAILER_SECRET: "test_secret",
            MAILER_SERVICE: "test_service"
        });
    });

    // --- Test 2: Verificar errores cuando una variable es requerida y no está o es inválida ---
    it("should throw error if a required environment variable is missing", async () => {
        // Limpiamos una variable específica para este test
        delete process.env.PORT; 

        // Usamos un try...catch para capturar el error de env-var
        try {
            // Importamos de nuevo el módulo para que env-var intente leer el env modificado
            require("../../config/envs");
            // Si llega aquí, significa que NO lanzó el error, lo cual es un fallo
            fail('Expected an error for missing PORT variable, but none was thrown.'); 
        } catch (error) {
            // Verificamos que el error sea el esperado
            expect(error).toBeInstanceOf(Error);
            if (error instanceof Error) {
                expect(error.message).toContain('"PORT" is a required variable, but it was not set'); // Mensaje de env-var para requerido
            } else {
                fail('Error is not an instance of Error.');
            }
        }
    });

    it("should throw error if a required environment variable has an invalid type", async () => {
        // Establecemos PORT con un valor inválido para su tipo (asPortNumber)
        process.env.PORT = 'invalid-port';

        try {
            require("../../config/envs");
            fail('Expected an error for invalid PORT type, but none was thrown.');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toContain('"PORT" should be a valid integer'); // Mensaje de env-var para tipo inválido
            }
            expect(error).toBeInstanceOf(Error);
        }
    });

    // --- Test 3: Verificar la variable isProd ---
    it("isProd should be false if ENV is not 'prod'", () => {
        // process.env.ENV ya está en 'test' por el beforeEach
        const { envs, isProd } = require("../../config/envs");

        expect(envs.ENV).toEqual("test"); // Aseguramos que es 'test'
        expect(isProd).toBeFalsy();
    });

    it("isProd should be true if ENV is 'prod'", () => {
        // Modificamos ENV solo para este test
        process.env.ENV = "prod";
        
        // Importamos de nuevo para que lea el nuevo valor de ENV
        const { envs, isProd } = require("../../config/envs");

        expect(envs.ENV).toEqual("prod");
        expect(isProd).toBeTruthy();
    });

    // --- Test adicional: Verificar IS_SENT_EMAIL ---
    it("IS_SENT_EMAIL should be true when set to 'true'", () => {
        process.env.IS_SENT_EMAIL = 'true';
        const { envs } = require("../../config/envs");
        expect(envs.IS_SENT_EMAIL).toBeTruthy();
    });

    it("IS_SENT_EMAIL should be false when set to 'false' or not defined (default)", () => {
        process.env.IS_SENT_EMAIL = 'false';
        const { envs: envsFalse } = require("../../config/envs");
        expect(envsFalse.IS_SENT_EMAIL).toBeFalsy();
        
        jest.resetModules();
        delete process.env.IS_SENT_EMAIL; // Eliminar para que tome el default
        process.env = { ...originalEnv, ...mockEnv }; // Restaurar con mockEnv por defecto
        
        const { envs: envsDefault } = require("../../config/envs");
        expect(envsDefault.IS_SENT_EMAIL).toBeFalsy();
    });

});