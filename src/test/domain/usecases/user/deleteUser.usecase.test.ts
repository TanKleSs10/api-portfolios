import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { DeleteUserUseCase } from "../../../../domain/usecases/user/deleteUser.usecase";

describe('DeleteUserUseCase', () => {
    let deleteUserUseCase: DeleteUserUseCase;
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
        deleteUserUseCase = new DeleteUserUseCase(userRepository);
    });

    it('should call userRepository.deleteUser with the correct ID', async () => {
        const id = '123';
        const user = new UserEntity(id, 'John Doe', 'john@example.com', 'pass');
        userRepository.deleteUser.mockResolvedValue(user);

        const result = await deleteUserUseCase.execute(id);

        expect(userRepository.deleteUser).toHaveBeenCalledWith(id);
        expect(result).toBe(user);
    });

    it('should propagate errors from userRepository.deleteUser', async () => {
        const id = '123';
        const error = new Error('User not found');
        userRepository.deleteUser.mockRejectedValue(error);

        await expect(deleteUserUseCase.execute(id)).rejects.toThrow('User not found');
    });
});
