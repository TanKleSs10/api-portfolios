import { UpdateUserDto } from "../../../../domain/dtos/user/updateuser.dto";

describe("UpdateUserDto", () => {
    it("should create a valid UpdateUserDto object", () => {
        const updateUserDto = UpdateUserDto.create({
            id: "680696f279fe2020cb5b6373",
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        });

        expect(updateUserDto[0]).toBeUndefined();
        expect(updateUserDto[1]).toBeInstanceOf(UpdateUserDto);
        expect(updateUserDto[1]!.name).toBe("tester");
        expect(updateUserDto[1]!.email).toBe("tester@gmail.com");
        expect(updateUserDto[1]!.password).toBe("password");
        expect(updateUserDto[1]!.rol).toBe("admin");
    });

    it("should not create a valid UpdateUserDto object without id", () => {
        const updateUserDto = UpdateUserDto.create({
            email: "tester@gmail.com",
            password: "password",
        });

        expect(updateUserDto[0]).toBe("Invalid user id.");
        expect(updateUserDto[1]).toBeUndefined();
    });

    it("should invalidate object if no updates provided", () => {
        const updateUserDto = UpdateUserDto.create({
            id: "680696f279fe2020cb5b6373",
        });

        expect(updateUserDto[0]).toBe("No updates provided.");
        expect(updateUserDto[1]).toBeUndefined();
    });

    it("should return only provided values", () => {
        const [, dto] = UpdateUserDto.create({
            id: "680696f279fe2020cb5b6373",
            name: "tester",
        });

        expect(dto!.values).toEqual({ name: "tester" });
    });

    it("should return all provided values", () => {
        const [, dto] = UpdateUserDto.create({
            id: "680696f279fe2020cb5b6373",
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        });

        expect(dto!.values).toEqual({
            name: "tester",
            email: "tester@gmail.com",
            password: "password",
            rol: "admin",
        });
    });
});
