import mongoose from 'mongoose';
import { DbConfig } from '../../config/dbConfig'; // Ajusta la ruta si es necesario
import { LoggerInterface } from '../../config/winstonConfig'; // Ajusta la ruta si es necesario

// ===============================================================
// MOCKS
// ===============================================================

// Mock de Mongoose
// Nota: Jest.mock es a nivel de módulo, por lo que su configuración es global para este archivo.
// Se recomienda colocarlo al inicio del archivo o en un archivo de mock separado.
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(), // También mockeamos disconnect para probar dbDisconnect
  // Puedes añadir otros métodos de mongoose que uses si los necesitas testear
  // Por ejemplo, .connection para eventos, pero para este caso no es necesario.
}));

// Mock del Logger
// Usamos `jest.Mocked<LoggerInterface>` para obtener autocompletado y tipado correcto de los métodos mockeados.
const mockLogger: jest.Mocked<LoggerInterface> = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(), // Aunque tu logger no tiene debug opcional, es bueno incluirlo si el contrato lo permite.
};

// ===============================================================
// TESTS
// ===============================================================

describe('DbConfig', () => {
  let dbConfig: DbConfig;
  const mockMongodbUri = 'mongodb://localhost:27017/testdb';

  beforeEach(() => {
    // Restablece el estado de los mocks antes de cada prueba.
    // Esto es crucial para asegurar que cada prueba tenga un "estado limpio".
    jest.clearAllMocks();
    dbConfig = new DbConfig({ MONGODB_URI: mockMongodbUri, logger: mockLogger });
  });

  // Test 1: Conexión exitosa
  it('should call mongoose.connect with the provided URI and log success', async () => {
    // Controlamos el comportamiento del mock de mongoose.connect para que simule una conexión exitosa.
    (mongoose.connect as jest.Mock).mockResolvedValue(undefined); // Mongoose.connect resuelve sin valor específico en éxito.

    await dbConfig.dbConnection();

    // Verificamos que mongoose.connect fue llamado con la URI correcta.
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenCalledWith(mockMongodbUri);

    // Verificamos que el logger.info fue llamado con el mensaje correcto.
    expect(mockLogger.info).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledWith('MongoDB connected successfully.', {}, "dbConfig");
  });

  // Test 2: Falla de conexión
  it('should log an error message and throw an error on connection failure', async () => {
    const connectionError = new Error('Simulated connection error');
    // Simulamos que mongoose.connect rechaza la promesa, como si fallara la conexión.
    (mongoose.connect as jest.Mock).mockRejectedValue(connectionError);

    // Usamos un try-catch para capturar el error lanzado por dbConnection y poder asertar sobre él.
    // Opcional: Si solo te interesa que lance el error, puedes usar expect(...).rejects.toThrow()
    // pero aquí queremos verificar tanto el log de error como el lanzamiento del error.
    await expect(dbConfig.dbConnection()).rejects.toThrow('MongoDB connection failed.');

    // Verificamos que mongoose.connect fue llamado.
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenCalledWith(mockMongodbUri);

    // Verificamos que el logger.error fue llamado con el mensaje y el contexto del error.
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
    // Asegúrate de que el segundo argumento coincida con lo que tu `normalizeContext` genera
    expect(mockLogger.error).toHaveBeenCalledWith(
      'Error connecting to MongoDB:',
      {
        error: {
          message: connectionError.message,
          stack: connectionError.stack,
        }
      },
      "dbConfig"
    );
  });

  // Test 3: Desconexión exitosa
  it('should call mongoose.disconnect and log success on successful disconnection', async () => {
    // Simulamos una desconexión exitosa.
    (mongoose.disconnect as jest.Mock).mockResolvedValue(undefined);

    await dbConfig.dbDisconnect();

    // Verificamos que mongoose.disconnect fue llamado.
    expect(mongoose.disconnect).toHaveBeenCalledTimes(1);
    expect(mongoose.disconnect).toHaveBeenCalledWith(); // Sin argumentos

    // Verificamos que el logger.info fue llamado con el mensaje de desconexión.
    expect(mockLogger.info).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledWith('MongoDB disconnected successfully.', {}, "dbConfig");
  });

  // Test 4: Falla de desconexión
  it('should log an error message and throw an error on disconnection failure', async () => {
    const disconnectionError = new Error('Simulated disconnection error');
    // Simulamos que mongoose.disconnect rechaza la promesa.
    (mongoose.disconnect as jest.Mock).mockRejectedValue(disconnectionError);

    // Verificamos que se lanza el error esperado.
    await expect(dbConfig.dbDisconnect()).rejects.toThrow('MongoDB disconnection failed.');

    // Verificamos que mongoose.disconnect fue llamado.
    expect(mongoose.disconnect).toHaveBeenCalledTimes(1);
    expect(mongoose.disconnect).toHaveBeenCalledWith();

    // Verificamos que el logger.error fue llamado.
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
    // Asegúrate de que el segundo argumento coincida con lo que tu `normalizeContext` genera
    expect(mockLogger.error).toHaveBeenCalledWith(
      'Error disconnecting from MongoDB:',
      {
        error: {
          message: disconnectionError.message,
          stack: disconnectionError.stack,
        }
      },
      "dbConfig"
    );
  });
});