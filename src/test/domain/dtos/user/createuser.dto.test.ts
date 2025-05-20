import { CreateUserDto } from "../../../../domain/dtos/user/createuser.dto";

describe("CreateUserDto", () => {
    it("should create a valid CreateUserDto object", () => {
        const createUserDto = CreateUserDto.create({
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        });

        expect(createUserDto[0]).toBeUndefined();
        expect(createUserDto[1]).toBeInstanceOf(CreateUserDto);
        expect(createUserDto[1]!.name).toBe("tester");
        expect(createUserDto[1]!.email).toBe("tester@gmail.com");
        expect(createUserDto[1]!.password).toBe("password");
        expect(createUserDto[1]!.rol).toBe("admin");
    });

    it("should not create a valid CreateUserDto object", () => {
        const createUserDto = CreateUserDto.create({
            email: "tester@gmail.com",
            password: "password",
        });

        expect(createUserDto[0]).toBe("Invalid user object.");
        expect(createUserDto[1]).toBeUndefined();
    });

    it("should role be editor by default", () => {
        const createUserDto = CreateUserDto.create({
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
        });

        expect(createUserDto[1]!.rol).toBe("editor");
    });
});