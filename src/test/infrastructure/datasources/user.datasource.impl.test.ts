import { CreateUserDto } from "../../../domain/dtos/user/createuser.dto";
import { UpdateUserDto } from "../../../domain/dtos/user/updateuser.dto";
import { BcryptAdapter } from "../../../infrastructure/adapters/bcript.adapter";
import { UserDataSourceImpl } from "../../../infrastructure/datasources/user.datasource.impl";
import { userModel } from "../../../infrastructure/models/user/userModel";


jest.mock('../../../infrastructure/models/user/userModel');

describe('UserDataSourceImpl', () => {
    let dataSource: UserDataSourceImpl;
    let bcryptAdapterMock: jest.Mocked<BcryptAdapter>;

    beforeEach(() => {
        bcryptAdapterMock = {
            hash: jest.fn(),
            compare: jest.fn()
        } as unknown as jest.Mocked<BcryptAdapter>;

        dataSource = new UserDataSourceImpl(bcryptAdapterMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should hash the password and create a user', async () => {
            const createUserDto = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'plainpassword'
            };

            const hashedPassword = 'hashedpassword';

            bcryptAdapterMock.hash.mockResolvedValue(hashedPassword);

            const mockUser = {
                _id: 'user123',
                name: 'Test User',
                email: 'test@example.com',
                password: hashedPassword,
                toObject: function() {
                    return this;
                }
            };

            (userModel.create as jest.Mock).mockResolvedValue(mockUser);

            const result = await dataSource.createUser(createUserDto as CreateUserDto );

            expect(bcryptAdapterMock.hash).toHaveBeenCalledWith('plainpassword');
            expect(userModel.create).toHaveBeenCalledWith({
                name: 'Test User',
                email: 'test@example.com',
                password: hashedPassword
            });
            expect(result).toMatchObject({
                id: 'user123',
                name: 'Test User',
                email: 'test@example.com'
            });
        });
    });

    describe('findUserById', () => {
      const userId = '507f1f77bcf86cd799439011';
  
      const mockUser = {
          _id: userId,
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashedpassword',
          rol: 'editor',
          createdAt: new Date(),
          updatedAt: new Date(),
          toObject: function() {
              return {
                  _id: this._id,
                  name: this.name,
                  email: this.email,
                  password: this.password,
                  rol: this.rol,
                  createdAt: this.createdAt,
                  updatedAt: this.updatedAt
              };
          }
      };
  
      it('should find a user by id', async () => {
          (userModel.findById as jest.Mock).mockResolvedValue(mockUser);
  
          const result = await dataSource.findUserById(userId);
  
          expect(userModel.findById).toHaveBeenCalledWith(userId);
          expect(result).toMatchObject({
              id: userId,
              name: 'Test User',
              email: 'test@example.com',
              password: 'hashedpassword',
              rol: 'editor'
          });
      });
  
      it('should throw an error if user is not found', async () => {
        (userModel.findById as jest.Mock).mockResolvedValue(null);
    
        await expect(dataSource.findUserById(userId)).rejects.toThrow('User not found.');
        expect(userModel.findById).toHaveBeenCalledWith(userId);
    });
  
      it('should throw an error if id is invalid', async () => {
          const invalidId = 'user123';
          await expect(dataSource.findUserById(invalidId)).rejects.toThrow('Invalid user ID.');
      });
  
      it('should throw an error if an exception occurs', async () => {
          (userModel.findById as jest.Mock).mockRejectedValue(new Error('Database error'));
  
          await expect(dataSource.findUserById(userId)).rejects.toThrow('Database error');
          expect(userModel.findById).toHaveBeenCalledWith(userId);
      });
  });

  describe('findUserByEmail', () => {
    const email = 'test@example.com';

    const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        rol: 'editor',
        createdAt: new Date(),
        updatedAt: new Date(),
        toObject: function() {
            return {
                _id: this._id,
                name: this.name,
                email: this.email,
                password: this.password,
                rol: this.rol,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            };
        }
    };

    it('should find a user by email', async () => {
        (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);

        const result = await dataSource.findUserByEmail(email);

        expect(userModel.findOne).toHaveBeenCalledWith({ email });
        expect(result).toMatchObject({
            id: '507f1f77bcf86cd799439011',
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashedpassword',
            rol: 'editor'
        });
    });

    it('should return null if user is not found', async () => {
        (userModel.findOne as jest.Mock).mockResolvedValue(null);

        await expect(dataSource.findUserByEmail(email)).rejects.toThrow('User not found.');
        expect(userModel.findOne).toHaveBeenCalledWith({ email });

    });

    it('should throw an error if an exception occurs', async () => {
        (userModel.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(dataSource.findUserByEmail(email)).rejects.toThrow('Database error');
        expect(userModel.findOne).toHaveBeenCalledWith({ email });
    }); 
  });

  describe('findAllUsers', () => {  
    const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        rol: 'editor',
        createdAt: new Date(),
        updatedAt: new Date(),
        toObject: function() {
            return {
                _id: this._id,
                name: this.name,
                email: this.email,
                password: this.password,
                rol: this.rol,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            };
        }
    };

    it('should find all users', async () => {
        (userModel.find as jest.Mock).mockResolvedValue([mockUser]);

        const result = await dataSource.findAllUsers();

        expect(userModel.find).toHaveBeenCalled();
        expect(result).toMatchObject([
            {
                id: '507f1f77bcf86cd799439011',
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashedpassword',
                rol: 'editor'
            }
        ]);
    });

    it('should throw an error if an exception occurs', async () => {
        (userModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(dataSource.findAllUsers()).rejects.toThrow('Database error');
        expect(userModel.find).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        rol: 'editor',
        createdAt: new Date(),
        updatedAt: new Date(),
        toObject: function() {
            return {
                _id: this._id,
                name: this.name,
                email: this.email,
                password: this.password,
                rol: this.rol,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            };
        }
    };
    it('should update a user', async () => {
        const userId = '507f1f77bcf86cd799439011';
        const updateUserDto = new UpdateUserDto(
            userId,
            'New Name',
            'new@example.com',
            'newplainpassword',
            'editor'
        );
    
        const mockUpdatedUser = {
            _id: userId,
            name: 'New Name',
            email: 'new@example.com',
            password: 'hashedpassword', // asumimos que en BD ya está hasheada
            rol: 'editor',
            createdAt: new Date(),
            updatedAt: new Date(),
            toObject: function() {
                return {
                    _id: this._id,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    rol: this.rol,
                    createdAt: this.createdAt,
                    updatedAt: this.updatedAt
                };
            }
        };
    
        (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);
    
        const result = await dataSource.updateUser(updateUserDto);
    
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
            userId,
            { $set: updateUserDto.values },
            { new: true, runValidators: true }
        );
    
        expect(result).toMatchObject({
            id: userId,
            name: 'New Name',
            email: 'new@example.com',
            password: 'hashedpassword',
            rol: 'editor'
        });
    });
    it('should throw an error if user is not found', async () => {
        (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    
        const updateUserDto = new UpdateUserDto(
            '507f1f77bcf86cd799439011',
            'New Name',
            'new@example.com',
            'plainpassword',
            'editor'
        );
    
        await expect(dataSource.updateUser(updateUserDto)).rejects.toThrow('User not found.');
    });
    
    it('should throw an error if an exception occurs', async () => {
        (userModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database error'));
    
        const updateUserDto = new UpdateUserDto(
            '507f1f77bcf86cd799439011',
            'New Name',
            'new@example.com',
            'plainpassword',
            'editor'
        );
    
        await expect(dataSource.updateUser(updateUserDto)).rejects.toThrow('Database error');
    });

    it('should throw an error if id is invalid', async () => {
        const invalidId = 'user123';
        const updateUserDto = new UpdateUserDto(
            invalidId,
            'New Name',
            'new@example.com',
            'plainpassword',
            'editor'
        );

        await expect(dataSource.updateUser(updateUserDto)).rejects.toThrow('Invalid user ID.');
    });
  });

  describe('deleteUser', () => {
      const userId = '507f1f77bcf86cd799439011';
      const mockUser = {
          _id: userId,
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashedpassword',
          rol: 'editor',
          createdAt: new Date(),
          updatedAt: new Date(),
          toObject: function() {
              return {
                  _id: this._id,
                  name: this.name,
                  email: this.email,
                  password: this.password,
                  rol: this.rol,
                  createdAt: this.createdAt,
                  updatedAt: this.updatedAt
              };
          }
      };

      it('should delete a user', async () => {
          (userModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockUser);

          const result = await dataSource.deleteUser(userId);

          expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
          expect(result).toMatchObject({
              id: userId,
              name: 'Test User',
              email: 'test@example.com',
              password: 'hashedpassword',
              rol: 'editor'
          });
      });

      it('should throw an error if user is not found', async () => {
          (userModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

          await expect(dataSource.deleteUser(userId)).rejects.toThrow('User not found.');
          expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
      });

      it('should throw an error if an exception occurs', async () => {
          (userModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));

          await expect(dataSource.deleteUser(userId)).rejects.toThrow('Database error');
          expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
      });

      it('should throw an error if id is invalid', async () => {
          const invalidId = 'user123';
          await expect(dataSource.deleteUser(invalidId)).rejects.toThrow('Invalid user ID.');
      });
    });
});
