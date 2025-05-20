import { Request, Response } from 'express';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserController } from '../../../presentation/user/userController';
import { FindAllUsersUseCase } from '../../../domain/usecases/user/findAllUsers.usecase';
import { FindUserByIdUseCase } from '../../../domain/usecases/user/findUserById.usecase';
import { CreateUserUseCase } from '../../../domain/usecases/user/createUser.usecase';
import { UpdateUserUseCase } from '../../../domain/usecases/user/updateUser.usecase';
import { DeleteUserUseCase } from '../../../domain/usecases/user/deleteUser.usecase';

jest.mock('../../../domain/usecases/user/findAllUsers.usecase');
jest.mock('../../../domain/usecases/user/findUserById.usecase');
jest.mock('../../../domain/usecases/user/createUser.usecase');
jest.mock('../../../domain/usecases/user/updateUser.usecase');
jest.mock('../../../domain/usecases/user/deleteUser.usecase');

describe('UserController (unit)', () => {
  let mockRepo: jest.Mocked<UserRepository>;
  let controller: UserController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusSpy: jest.Mock;
  let jsonSpy: jest.Mock;

  beforeEach(() => {
    // Mock del repositorio (no se usa directamente en controller)
    mockRepo = {
      findAllUsers: jest.fn(),
      findUserById: jest.fn(),
      findUserByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn()
    } as any;
    controller = new UserController(mockRepo);
    statusSpy = jest.fn().mockReturnThis();
    jsonSpy = jest.fn().mockReturnThis();
    mockRes = {
      status: statusSpy,
      json: jsonSpy
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Helper para esperar promesas internas
  const flushPromises = () => new Promise(setImmediate);

  it('getUsers: éxito → status 200 y lista de usuarios', async () => {
    const users = [{ id: '1', name: 'Alice' }];
    (FindAllUsersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(users)
    }));

    mockReq = {};
    controller.getUsers(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith(users);
  });

  it('getUsers: error interno → status 400 y error', async () => {
    const error = new Error('DB fail');
    (FindAllUsersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error)
    }));

    mockReq = {};
    controller.getUsers(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith(error);
  });

  it('getUserById: éxito → status 200 y usuario', async () => {
    const user = { id: '1', name: 'Bob' };
    (FindUserByIdUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(user)
    }));

    mockReq = { params: { id: '1' } };
    controller.getUserById(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith(user);
  });

  it("getUserById: error interno → status 400 y error", async () => {
    const err = new Error('DB fail');
    (FindUserByIdUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(err)
    }));

    mockReq = { params: { id: '1' } };
    controller.getUserById(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith(err);
  });

  it('createUser: validación DTO falla → status 400 y mensaje', async () => {
    mockReq = { body: {} };
    controller.createUser(mockReq as Request, mockRes as Response);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith('Invalid user object.');
  });

  it('createUser: éxito → status 201 y user', async () => {
    const dto = { name: 'Carol', email: 'c@x.com', password: 'pass' };
    const user = { id: '2', name: 'Carol', email: 'c@x.com' };
    (CreateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(user)
    }));

    mockReq = { body: dto };
    controller.createUser(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(201);
    expect(jsonSpy).toHaveBeenCalledWith(user);
  });

  it('createUser: error del caso de uso → status 400 y error', async () => {
    const dto = { name: 'Carol', email: 'c@x.com', password: 'pass' };
    const err = new Error('duplicate');
    (CreateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(err)
    }));

    mockReq = { body: dto };
    controller.createUser(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith(err);
  });

  it('updateUser: validación DTO falla → status 400 y mensaje', async () => {
    mockReq = { params: { id: '1' }, body: {} };
    controller.updateUser(mockReq as Request, mockRes as Response);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith('No updates provided.');
  });

  it("updateUser: invalid dto", async () => {
    mockReq = { params: { id: '' }, body: { id: '' } };
    controller.updateUser(mockReq as Request, mockRes as Response);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith('Invalid user id.');
  });

  it('updateUser: éxito → status 200 y user', async () => {
    const dto = { name: 'Carol', email: 'c@x.com', password: 'pass' };
    const user = { id: '2', name: 'Carol', email: 'c@x.com' };
    (UpdateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(user)
    }));

    mockReq = { params: { id: '1' }, body: dto };
    controller.updateUser(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith(user);
  });

  it('updateUser: error del caso de uso → status 400 y error', async () => {
    const dto = { name: 'Carol', email: 'c@x.com', password: 'pass' };
    const err = new Error('duplicate');
    (UpdateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(err)
    }));

    mockReq = { params: { id: '1' }, body: dto };
    controller.updateUser(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith(err);
  });

  it('deleteUser: éxito → status 200 y user', async () => {
    const user = { id: '2', name: 'Carol', email: 'c@x.com' };
    (DeleteUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(user)
    }));

    mockReq = { params: { id: '1' } };
    controller.deleteUser(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith(user);
  });

  it('deleteUser: error del caso de uso → status 400 y error', async () => {
    const err = new Error('duplicate');
    (DeleteUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(err)
    }));

    mockReq = { params: { id: '1' } };
    controller.deleteUser(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith(err);
  });

  it("getUserByEmail: error interno → status 400 y error", async () => {
    const err = new Error('DB fail');
    (FindUserByIdUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(err)
    }));

    mockReq = { params: { email: 'c@x.com' } };
    controller.getUserByEmail(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith(err);
  });

  it("getUserByEmail: éxito → status 200 y user", async () => {
    const user = { id: '2', name: 'Carol', email: 'c@x.com' };
    (FindUserByIdUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(user)
    }));

    mockReq = { params: { email: 'c@x.com' } };
    controller.getUserByEmail(mockReq as Request, mockRes as Response);
    await flushPromises();

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith(user);
  });

});
