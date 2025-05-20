import mongoose from 'mongoose';

import { DbConfig } from '../../config/dbConfig';
import { LoggerInterface } from '../../config/winstonConfig';


jest.mock('mongoose', () => ({
    connect: jest.fn(), // Mockeamos la función connect de mongoose
}));

const mockLogger: jest.Mocked<LoggerInterface> = {
    info: jest.fn(), // Mockeamos el método info del logger
    error: jest.fn(), // Mockeamos el método error del logger
    warn: jest.fn(),
    debug: jest.fn(),
} as any;

describe('DB Config', () => {
    let dbConfig: DbConfig;
    const mockMongodbUri = 'mongodb://localhost:27017/testdb';

    beforeEach(() => {
        jest.clearAllMocks();
        dbConfig = new DbConfig({ MONGODB_URI: mockMongodbUri, logger: mockLogger });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call mongoose.connect with the provided URI', async () => {
        await dbConfig.dbConnection();
        expect(mongoose.connect).toHaveBeenCalledWith(mockMongodbUri); // Verificamos la interacción con la dependencia mockeada
    });

    it('should log a success message on successful connection', async () => {
        (mongoose.connect as jest.Mock).mockResolvedValue(undefined); // Controlamos el comportamiento de la dependencia mockeada
        await dbConfig.dbConnection();
        expect(mockLogger.info).toHaveBeenCalledWith('MongoDB connected successfully.'); // Verificamos la interacción con la dependencia mockeada
    });

    it('should log an error message on connection failure and throw an error', async () => {
        const errorMessage = ' Connection error';
        (mongoose.connect as jest.Mock).mockRejectedValue(errorMessage); // Simulamos el fallo de conexión

        // Verificamos que se loguea el error
        await dbConfig.dbConnection().catch(() => {}); // Necesitamos un .catch() para evitar el error "UnhandledPromiseRejection" en la prueba
        expect(mockLogger.error).toHaveBeenCalledWith('Error connecting to MongoDB:' + errorMessage);

        // Verificamos que se lanza el error
        await expect(dbConfig.dbConnection()).rejects.toThrow('MongoDB connection failed.');
    });
});