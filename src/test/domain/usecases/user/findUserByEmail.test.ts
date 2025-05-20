import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { FindUserByEmailUseCase } from "../../../../domain/usecases/user/findUserByEmail";

describe('FindUserByEmailUseCase', () => {
    let findUserByEmailUseCase: FindUserByEmailUseCase;
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
        findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
    });

    it('should call userRepository.findUserByEmail with the correct email', async () => {
        const email = 'john@example.com';
        const user = new UserEntity('1', 'John Doe', 'john@example.com', 'pass');
        userRepository.findUserByEmail.mockResolvedValue(user);

        const result = await findUserByEmailUseCase.execute(email);

        expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
        expect(result).toBe(user);
    });

    it('should propagate errors from userRepository.findUserByEmail', async () => {
        const email = 'john@example.com';
        const error = new Error('User not found');
        userRepository.findUserByEmail.mockRejectedValue(error);

        await expect(findUserByEmailUseCase.execute(email)).rejects.toThrow('User not found');
    });

});