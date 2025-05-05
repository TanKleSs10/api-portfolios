import { envs } from "../../../../config/envs";
import { tagModel } from "../../../../infrastructure/models/tag/tagModel";
import mongoose from "mongoose";

describe("User Model", () => {
     beforeAll( async () => {
        await mongoose. connect(envs.MONGODB_URI);
    });

    afterAll( async () => { 
        await mongoose.disconnect();
    });

    beforeEach( async () => {
        await tagModel.deleteMany({});
    });
  
    it("should return the correct user model", async() => {
        const tagData = {
            name: "Diego Meza",
            email: "diegomeza@example.com",
            password: "password",
        };

        const tag = await tagModel.create(tagData);
        // console.log(tag);
        
        expect(tag).toBeDefined();
        expect(tag.name).toBe(tagData.name.toLowerCase());
        expect(tag._id).toBeDefined();
        expect(typeof tag._id).toBe("object"); // _id es un objeto ObjectId
  });
});