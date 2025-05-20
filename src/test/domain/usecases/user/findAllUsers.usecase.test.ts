import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { FindAllUsersUseCase } from "../../../../domain/usecases/user/findAllUsers.usecase";

describe('FindAllUsersUseCase', () => {
        let findAllUsersUseCase: FindAllUsersUseCase;
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
            findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
        });
    
        it('should call userRepository.findAllUsers', async () => {
            const users = [
                new UserEntity('1', 'John Doe', 'john@example.com', 'pass'),
                new UserEntity('2', 'Jane Doe', 'jane@example.com', 'pass2')
            ];
            userRepository.findAllUsers.mockResolvedValue(users);
    
            const result = await findAllUsersUseCase.execute();
    
            expect(userRepository.findAllUsers).toHaveBeenCalled();
            expect(result).toBe(users);
        });

        it('should propagate errors from userRepository.findAllUsers', async () => {
            const error = new Error('Database error');
            userRepository.findAllUsers.mockRejectedValue(error);
    
            await expect(findAllUsersUseCase.execute()).rejects.toThrow('Database error');
        });
});