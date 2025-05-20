import { UserEntity } from "../../../domain/entities/user.entity";

describe("UserEntity", () => {

    const validUserData = {
        id: "123",
        name: "Test User",
        email: "test@example.com",
        password: "securepassword",
        rol: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    it("should create an instance via constructor", () => {
        const user = new UserEntity(
            validUserData.id,
            validUserData.name,
            validUserData.email,
            validUserData.password,
            validUserData.rol,
            validUserData.createdAt,
            validUserData.updatedAt
        );

        expect(user).toBeInstanceOf(UserEntity);
        expect(user.name).toBe("Test User");
        expect(user.rol).toBe("admin");
        expect(user.createdAt).toBeInstanceOf(Date);
    });

    it("should create an instance from object", () => {
        const user = UserEntity.fromObject(validUserData);
        expect(user).toBeInstanceOf(UserEntity);
        expect(user.email).toBe("test@example.com");
    });

    it("should assign default role if not provided", () => {
        const { rol, ...dataWithoutRol } = validUserData;
        const user = UserEntity.fromObject(dataWithoutRol);
        expect(user.rol).toBe("editor");
    });

    it("should undefine createdAt and updatedAt if not provided", () => {
        const { createdAt, updatedAt, ...dataWithoutCreatedAt } = validUserData;
        const user = UserEntity.fromObject(dataWithoutCreatedAt);
        expect(user.createdAt).toBeUndefined();
        expect(user.updatedAt).toBeUndefined();
    });

    it("should invalidate object",  () => {
        expect(() => UserEntity.fromObject({} as any)).toThrow("Invalid user object.");
    });

    it("should convert date strings to Date instances", () => {
        const user = UserEntity.fromObject({
            ...validUserData,
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-02T00:00:00.000Z"
        });

        expect(user.createdAt).toBeInstanceOf(Date);
        expect(user.updatedAt).toBeInstanceOf(Date);
        expect(user.createdAt?.toISOString()).toBe("2023-01-01T00:00:00.000Z");
    });
});
