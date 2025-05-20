import { UserDataSource } from "../../../domain/datasources/user.datasource";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/user.repository.impl";


describe('UserRepositoryImpl', () => {
    let userRepository: UserRepositoryImpl;
    let userDataSource: jest.Mocked<UserDataSource>;

    beforeEach(() => {
        userDataSource = {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
            findUserById: jest.fn(),
            findAllUsers: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn()
        };
        userRepository = new UserRepositoryImpl(userDataSource);
    });

    it('should call findUserByEmail on dataSource', async () => {
        const user = new UserEntity('1', 'John Doe', 'john@example.com', 'pass');
        userDataSource.findUserByEmail.mockResolvedValue(user);

        const result = await userRepository.findUserByEmail('john@example.com');

        expect(userDataSource.findUserByEmail).toHaveBeenCalledWith('john@example.com');
        expect(result).toBe(user);
    });

    it('should call createUser on dataSource', async () => {
        const dto = { name: 'John Doe', email: 'john@example.com', password: 'pass' };
        const user = new UserEntity('1', 'John Doe', 'john@example.com', 'pass');
        userDataSource.createUser.mockResolvedValue(user);

        const result = await userRepository.createUser(dto as any);

        expect(userDataSource.createUser).toHaveBeenCalledWith(dto);
        expect(result).toBe(user);
    });

    it('should call findUserById on dataSource', async () => {
        const user = new UserEntity('1', 'John Doe', 'john@example.com', 'pass');
        userDataSource.findUserById.mockResolvedValue(user);

        const result = await userRepository.findUserById('1');

        expect(userDataSource.findUserById).toHaveBeenCalledWith('1');
        expect(result).toBe(user);
    });

    it('should call findAllUsers on dataSource', async () => {
        const users = [
            new UserEntity('1', 'John Doe', 'john@example.com', 'pass'),
            new UserEntity('2', 'Jane Doe', 'jane@example.com', 'pass2')
        ];
        userDataSource.findAllUsers.mockResolvedValue(users);

        const result = await userRepository.findAllUsers();

        expect(userDataSource.findAllUsers).toHaveBeenCalled();
        expect(result).toBe(users);
    });

    it('should call updateUser on dataSource', async () => {
        const dto = { id: '1', name: 'Updated Name' };
        const user = new UserEntity('1', 'Updated Name', 'john@example.com', 'pass');
        userDataSource.updateUser.mockResolvedValue(user);

        const result = await userRepository.updateUser(dto as any);

        expect(userDataSource.updateUser).toHaveBeenCalledWith(dto);
        expect(result).toBe(user);
    });

    it('should call deleteUser on dataSource', async () => {
        const user = new UserEntity('1', 'John Doe', 'john@example.com', 'pass');
        userDataSource.deleteUser.mockResolvedValue(user);

        const result = await userRepository.deleteUser('1');

        expect(userDataSource.deleteUser).toHaveBeenCalledWith('1');
        expect(result).toBe(user);
    });
});
