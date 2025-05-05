// tests/server.test.ts
import request from 'supertest';
import express, { Router } from 'express';
import { Server } from '../../presentation/server';
import { WinstonLogger } from '../../infrastructure/logger/winstonLogger.adapter';

describe('Server (light integration)', () => {
  let serverInstance: Server;

  beforeAll(async () => {
    const mockLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() };
    // 1) Creamos un router trivial
    const dummyRouter = Router();
    dummyRouter.get('/ping', (req, res) => {
      res.status(200).json({ pong: true });
    });

    serverInstance = new Server({
      port: 0,
      routes: dummyRouter,
      logger: mockLogger as unknown as WinstonLogger
    });
    await serverInstance.start();
  });

  afterAll(async () => {
    // si implementas .stop() en Server, llámalo aquí
    // await serverInstance.stop();
  });

  it('should respond 200 on /ping', async () => {
    const res = await request(serverInstance.getApp()).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ pong: true });
  });

  it('should respond 404 on /no-existe', async () => {
    const res = await request(serverInstance.getApp()).get('/no-existe');
    expect(res.status).toBe(404);
  });

  it('should close the server', async () => {
    
    // inyectamos manualmente un http.Server falso
    const fakeServer = { close: jest.fn(cb => cb(/* sin error */)) };
    ;(serverInstance as any).server = fakeServer;
    await expect(serverInstance.stop()).resolves.toBeUndefined();
    expect(fakeServer.close).toHaveBeenCalled();
  });

  it('should reject with the error passed to close()', async () => {
    
    const boom = new Error('boom');
    const fakeServer = { close: jest.fn(cb => cb(boom)) };
    (serverInstance as any).server = fakeServer;
    await expect(serverInstance.stop()).rejects.toThrow('boom');
    expect(fakeServer.close).toHaveBeenCalled();
  });

  it("should call return the express app", async () => {
    const dummyRouter = Router();
    const mockLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() };
    const srv = new Server({ port: 0, routes: dummyRouter, logger: mockLogger });
    // ¡Nunca hacemos srv.start()!
    // Como this.server es undefined, debe entrar en el `if (!this.server) return;`
    await expect(srv.stop()).resolves.toBeUndefined();
    srv.stop();
});

});
