import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { FindUserByIdUseCase } from "../../../../domain/usecases/user/findUserById.usecase";

describe('FindUserByIdUseCase', () => {
    let findUserByIdUseCase: FindUserByIdUseCase;
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
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
    });

    it('should call userRepository.findUserById with the correct ID', async () => {
        const id = '123';
        const user = new UserEntity(id, 'John Doe', 'john@example.com', 'pass');
        userRepository.findUserById.mockResolvedValue(user);

        const result = await findUserByIdUseCase.execute(id);

        expect(userRepository.findUserById).toHaveBeenCalledWith(id);
        expect(result).toBe(user);
    });

    it('should propagate errors from userRepository.findUserById', async () => {
        const id = '123';
        const error = new Error('User not found');
        userRepository.findUserById.mockRejectedValue(error);

        await expect(findUserByIdUseCase.execute(id)).rejects.toThrow('User not found');
    });
});