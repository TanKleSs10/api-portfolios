import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { UpdateUserUseCase } from "../../../../domain/usecases/user/updateUser.usecase";

describe('UpdateUserUseCase', () => {
    let updateUserUseCase: UpdateUserUseCase;
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
        updateUserUseCase = new UpdateUserUseCase(userRepository);
    });

    it('should call userRepository.updateUser with the correct DTO', async () => {
        const dto = { id: '123', name: 'Updated Name' };
        const user = new UserEntity('123', 'Updated Name', 'john@example.com', 'pass');
        userRepository.updateUser.mockResolvedValue(user);

        const result = await updateUserUseCase.execute(dto as any);

        expect(userRepository.updateUser).toHaveBeenCalledWith(dto);
        expect(result).toBe(user);
    });

    it('should propagate errors from userRepository.updateUser', async () => {
        const dto = { id: '123', name: 'Updated Name' };
        const error = new Error('User not found');
        userRepository.updateUser.mockRejectedValue(error);

        await expect(updateUserUseCase.execute(dto as any)).rejects.toThrow('User not found');
    });     


});