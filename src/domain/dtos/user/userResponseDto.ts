import { UserEntity } from "../../entities/user.entity";

export class UserResponseDto {
    static fromEntity(user: UserEntity) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        emailValidated: user.emailValidated,
        rol: user.rol,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
  }
  