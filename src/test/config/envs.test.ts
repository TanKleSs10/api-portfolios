import { envs } from "../../config/envs";

describe("envs", () => {
    
    it("should return the correct environment", () => {
        expect( envs ).toEqual(
            {
                MONGODB_URI: 'mongodb://quantumTest:quantumTest@quantum-db-test:27017',
                PORT: 3000,
                ENV: 'test',
                CLOUDINARY_CLOUD_NAME: "test_cloud",
                CLOUDINARY_API_KEY: "test_key",
                CLOUDINARY_API_SECRET: "test_secret"
              }
        )
    });
    
    it("should return error if not found env", async () => {
        jest.resetModules();
        process.env.PORT = 'test';
        
        try {
            await import("../../config/envs");
            expect(true).toBeFalsy();
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer'); 
        }

        
    });
});