import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { CreateUserUseCase } from "../../../../domain/usecases/user/createUser.usecase";


describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepository = {
            createUser: jest.fn(),
            findUserByEmail: jest.fn(),
            findUserById: jest.fn(),
            findAllUsers: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        };
        createUserUseCase = new CreateUserUseCase(userRepository);
    });

    it('should call userRepository.createUser with the correct DTO', async () => {
        const dto = { name: 'John Doe', email: 'john@example.com', password: 'pass' };
        const user = new UserEntity('1', 'John Doe', 'john@example.com', 'pass');
        userRepository.createUser.mockResolvedValue(user);

        const result = await createUserUseCase.execute(dto as any);

        expect(userRepository.createUser).toHaveBeenCalledWith(dto);
        expect(result).toBe(user);
    });

    it('should propagate errors from userRepository.createUser', async () => {
        const dto = { name: 'John Doe', email: 'john@example.com', password: 'pass' };
        const error = new Error('User already exists');
        userRepository.createUser.mockRejectedValue(error);

        await expect(createUserUseCase.execute(dto as any)).rejects.toThrow('User already exists');
    });
});
