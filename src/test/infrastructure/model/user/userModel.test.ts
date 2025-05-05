import { envs } from "../../../../config/envs";
import { userModel } from "../../../../infrastructure/models/user/userModel";
import mongoose from "mongoose";

describe("User Model", () => {
     beforeAll( async () => {
        await mongoose. connect(envs.MONGODB_URI);
    });

    afterAll( async () => { 
        await mongoose.disconnect();
    });

    beforeEach( async () => {
        await userModel.deleteMany({});
    });
  
    it("should return the correct user model", async() => {
        const userData = {
            name: "Diego Meza",
            email: "diegomeza@example.com",
            password: "password",
        };

        const user = await userModel.create(userData);
        // console.log(user);
        
        expect(user).toBeDefined();
        expect(user.name).toBe(userData.name.toLowerCase());
        expect(user.email).toBe(userData.email);
        expect(user.rol).toBe("editor");
        expect(user._id).toBeDefined();
        expect(typeof user._id).toBe("object"); // _id es un objeto ObjectId
  });
});