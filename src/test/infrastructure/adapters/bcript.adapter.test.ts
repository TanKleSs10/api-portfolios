import { BcryptAdapter } from "../../../infrastructure/adapters/bcript.adapter";

describe("BcryptAdapter", () => {
    it("should hash passwords", async () => {
        const adapter = new BcryptAdapter();
        const hash = await adapter.hash("password");
        expect(hash).toBeDefined();
    });

    it("should compare passwords", async () => {
        const adapter = new BcryptAdapter();
        const hash = await adapter.hash("password");
        const isEqual = await adapter.compare("password", hash);
        expect(isEqual).toBeTruthy();
    });
});