import request from "supertest";
import { Router } from "express";
import { Server } from "../../presentation/server";
import http from "http";

const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

describe('Server Escensials', () => {
  let serverInstance: Server;
  let expressApp: any;
  let currentPort: number;

  // Router de prueba simple
  const getDummyRouter = () => {
    const router = Router();
    router.get('/test-route', (_req, res) => {
      res.status(200).json({ message: 'Test successful!' });
    });
    router.post('/echo-body', (req, res) => {
      res.status(200).json(req.body); // Simplemente devuelve el cuerpo de la petición
    });
    return router;
  };

  beforeAll(async () => {
    // Es buena práctica limpiar mocks aquí si se reutilizan,
    // aunque para el logger no es estrictamente necesario si no lo vamos a testear activamente.
    jest.clearAllMocks();
    
    serverInstance = new Server({
      port: 0,
      routes: getDummyRouter(),
      logger: mockLogger,
    });

    await serverInstance.start();

    expressApp = serverInstance.getApp();

    const serverInternal = (serverInstance as any).server;
    if (serverInternal) {
      const address = serverInternal.address();
      if (typeof address === 'string') {
        currentPort = parseInt(address.split(':')[2], 10);
      } else {
        currentPort = address.port;
      }
    }
  });

  // --- afterAll: Limpieza que se ejecuta una sola vez después de todas las pruebas ---
  afterAll(async () => {
    // 1. Detenemos el servidor para liberar el puerto. CRÍTICO para evitar errores "Address already in use".
    if (serverInstance) {
      await serverInstance.stop();
    }
  });

  it('should create a server instance', () => {
    // Verificamos que la instancia de tu Server se haya creado correctamente.
    expect(serverInstance).toBeInstanceOf(Server);
  });

  it('should expose the Express app instance', () => {
    // Verificamos que `getApp()` devuelve algo que se parece a una aplicación Express.
    expect(expressApp).toBeDefined();
    expect(typeof expressApp.listen).toBe('function'); // Una app de Express tiene un método `listen`
  });

  it('should be listening on a port', () => {
    // Verificamos que se asignó un puerto (y por lo tanto el servidor intentó escuchar).
    expect(currentPort).toBeGreaterThan(0);
  });

    it('should respond to a basic test route', async () => {
    const response = await request(expressApp).get('/test-route');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Test successful!' });
  });

  it('should correctly parse JSON request bodies', async () => {
    const testData = { name: 'Alice', age: 30, city: 'New York' };
    const response = await request(expressApp)
      .post('/echo-body')
      .send(testData) // Supertest envía esto como JSON por defecto si el Content-Type es JSON
      .set('Content-Type', 'application/json'); // Establece explícitamente el tipo
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testData); // El cuerpo parseado debe ser igual a los datos enviados
  });

  it('should correctly parse URL-encoded request bodies', async () => {
    const testData = 'product=laptop&price=1200&inStock=true';
    const expectedParsedData = { product: 'laptop', price: '1200', inStock: 'true' }; // Los valores son strings
  
    const response = await request(expressApp)
      .post('/echo-body')
      .send(testData) // Envía datos URL-encoded
      .set('Content-Type', 'application/x-www-form-urlencoded'); // Establece explícitamente el tipo
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedParsedData); // El cuerpo parseado debe ser igual
  });

  it('should be able to stop a new server instance correctly', async () => {
    // Creamos una NUEVA instancia de Server para este test
    // Esto asegura que la prueba de 'stop()' sea independiente y no afecte al servidor global.
    const tempServer = new Server({
      port: 0, // Usar un puerto dinámico
      routes: getDummyRouter(), // Reutilizamos nuestro router de prueba
      logger: mockLogger, // Reutilizamos nuestro mock logger
    });

    // Iniciar el servidor temporalmente para poder detenerlo
    await tempServer.start();

    // Verificamos que la promesa de `stop()` se resuelve sin errores (es decir, el servidor se detiene).
    await expect(tempServer.stop()).resolves.toBeUndefined();

    // Opcional: Podrías intentar hacer una petición aquí para verificar que el servidor ya no responde,
    // pero eso es más complejo ya que implicaría manejar errores de conexión.
    // Para una prueba "esencial" de stop, el `resolves.toBeUndefined()` es suficiente.
  });

  it('should handle stop() gracefully when the server was never started', async () => {
    // Creamos una NUEVA instancia de Server, pero NO llamamos a `start()`.
    // Esto simula el escenario donde `this.server` sería `undefined`.
    const srvWithoutStart = new Server({
      port: 0,
      routes: getDummyRouter(),
      logger: mockLogger,
    });

    // Llamamos a `stop()` directamente.
    // Esperamos que la promesa se resuelva sin errores, ya que `stop()` debería
    // simplemente retornar si `this.server` es `undefined`.
    await expect(srvWithoutStart.stop()).resolves.toBeUndefined();
  });

  it('should reject if the underlying HTTP server close() method returns an error', async () => {
    const tempServer = new Server({
      port: 0,
      routes: getDummyRouter(),
      logger: mockLogger,
    });
    await tempServer.start(); // Iniciamos para tener un servidor HTTP interno que podamos mockear

    const simulatedError = new Error('Simulated HTTP server close error');

    const internalHttpServer = (tempServer as any).server as http.Server;
    // Captura el método 'close' original antes de mockearlo
    const originalClose = internalHttpServer.close; 

    // Sobreescribimos su método `close` con un mock que llama al callback con un error
    internalHttpServer.close = jest.fn((cb: (err?: Error) => void) => {
        cb(simulatedError); // Llama al callback con un error
        // AHORA LLAMA AL MÉTODO CLOSE ORIGINAL PARA QUE EL SERVIDOR REAL SE CIERRE
        // Esto es crucial para liberar el handle.
        originalClose.call(internalHttpServer, () => {}); // Llama al original sin pasarle el error al Jest
        return internalHttpServer;
    });

    await expect(tempServer.stop()).rejects.toThrow(simulatedError);
    expect(internalHttpServer.close).toHaveBeenCalledTimes(1);

    // No es necesario un afterEach o afterAll para este tempServer,
    // ya que el mock `close` asegura el cierre real del servidor.
  });

});