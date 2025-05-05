import { CreateUserDto } from "../../../domain/dtos/user/createuser.dto";
import { UpdateUserDto } from "../../../domain/dtos/user/updateuser.dto";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

describe("User Repository", () => {
    
    const newUser = new UserEntity(
        "680696f279fe2020cb5b6373",
        "tester",
        "tester@gmail.com",
        "password",
    );

    class MockUserRepository implements UserRepository {
         async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
            return newUser;
        }
         async findUserById(id: string): Promise<UserEntity> {
            return newUser;
        }
         async findUserByEmail(email: string): Promise<UserEntity> {
            return newUser;
        }
        async findAllUsers(): Promise<UserEntity[]> {
            return [newUser];
        }
         async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
            return newUser;
        }
         async deleteUser(id: string): Promise<UserEntity> {
            return newUser;
        }
        
    }
    
    it("should test the abstract class", async () => {
        const mockUserRepository = new MockUserRepository();
        expect(mockUserRepository).toBeInstanceOf(MockUserRepository);
        expect(mockUserRepository).toHaveProperty("createUser");
        expect(mockUserRepository.findAllUsers).toBeInstanceOf(Function);
        expect(mockUserRepository.findUserByEmail).toBeInstanceOf(Function);
        expect(mockUserRepository.findUserById).toBeInstanceOf(Function);
        expect(mockUserRepository.updateUser).toBeInstanceOf(Function);
        expect(mockUserRepository.deleteUser).toBeInstanceOf(Function);
        
        await mockUserRepository.createUser({
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        });
        const users = await mockUserRepository.findAllUsers();
        await mockUserRepository.updateUser({
            id: "680696f279fe2020cb5b6373",
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        } as UpdateUserDto);
        await mockUserRepository.deleteUser("680696f279fe2020cb5b6373");
        await mockUserRepository.findUserById("680696f279fe2020cb5b6373");
        await mockUserRepository.findUserByEmail("tester@gmail.com");
    });
});