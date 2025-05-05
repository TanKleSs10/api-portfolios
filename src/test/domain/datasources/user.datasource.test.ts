import { UserDataSource } from "../../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../../domain/dtos/user/createuser.dto";
import { UpdateUserDto } from "../../../domain/dtos/user/updateuser.dto";
import { UserEntity } from "../../../domain/entities/user.entity";


describe("User DataSource", () => {

    const newUser = new UserEntity(
        "680696f279fe2020cb5b6373",
        "tester",
        "tester@gmail.com",
        "password",
    );
    
    class MockUserDataSource implements UserDataSource {
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
        
        const mockUserDataSource = new MockUserDataSource();

        expect(mockUserDataSource).toBeInstanceOf(MockUserDataSource);
        expect(mockUserDataSource).toHaveProperty("createUser");
        expect(mockUserDataSource.findAllUsers).toBeInstanceOf(Function);
        expect(mockUserDataSource.findUserByEmail).toBeInstanceOf(Function);
        expect(mockUserDataSource.findUserById).toBeInstanceOf(Function);
        expect(mockUserDataSource.updateUser).toBeInstanceOf(Function);
        expect(mockUserDataSource.deleteUser).toBeInstanceOf(Function);
        

        await mockUserDataSource.createUser({
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        });
        const users = await mockUserDataSource.findAllUsers();
        await mockUserDataSource.updateUser({
            id: "680696f279fe2020cb5b6373",
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        } as UpdateUserDto);
        await mockUserDataSource.deleteUser("680696f279fe2020cb5b6373");
        await mockUserDataSource.findUserById("680696f279fe2020cb5b6373");
        await mockUserDataSource.findUserByEmail("tester@gmail.com");
        

    });
});