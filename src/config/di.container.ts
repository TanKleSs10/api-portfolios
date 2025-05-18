import { BcryptAdapter } from "../infrastructure/adapters/bcript.adapter";
import { JwtAdapter } from "../infrastructure/adapters/jwt.adapter";
import { MailerAdapter } from "../infrastructure/adapters/nodemailer.adapter";
import { ImageDataSourceImpl } from "../infrastructure/datasources/image.datasource.impl";
import { PostDataSourceImpl } from "../infrastructure/datasources/post.datasource.impl";
import { ProjectDataSourceImpl } from "../infrastructure/datasources/project.datasource.impl";
import { TagDataSourceImpl } from "../infrastructure/datasources/tag.datasource.impl";
import { UserDataSourceImpl } from "../infrastructure/datasources/user.datasource.impl";
import { MailTemplateManager } from "../infrastructure/mail/mailTemplateManager";
import { AuthRepositoryImp } from "../infrastructure/repositories/auth.repository.imp";
import { ImageRepositoryImpl } from "../infrastructure/repositories/image.repository.impl";
import { PostRepositoryImpl } from "../infrastructure/repositories/post.repository.impl";
import { ProjectRepositoryImpl } from "../infrastructure/repositories/project.repository.impl";
import { TagRepositoryImpl } from "../infrastructure/repositories/tag.repository.impl";
import { UserRepositoryImpl } from "../infrastructure/repositories/user.repository.impl";
import { AuthController } from "../presentation/auth/authController";
import { ImageController } from "../presentation/image/imageController";
import { PostController } from "../presentation/post/postController";
import { ProjectController } from "../presentation/project/projectController";
import { TagController } from "../presentation/tag/tagController";
import { UserController } from "../presentation/user/userController";
import { envs } from "./envs";

// Dependdenices
    const jwtAdapter = new JwtAdapter(envs.JWT_SEED);
    const bcriptAdapter = new BcryptAdapter();
    const emailService = new MailerAdapter(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET, envs.IS_SENT_EMAIL);
    const mailTemplateManager = new MailTemplateManager();

    // Datasources
    const userDataSource = new UserDataSourceImpl();
    const projectDataSource = new ProjectDataSourceImpl();
    const postDataSource = new PostDataSourceImpl();
    const imageDataSource = new ImageDataSourceImpl();
    const tagDataSource = new TagDataSourceImpl();

    // Repositories
    const authRepository = new AuthRepositoryImp(jwtAdapter, bcriptAdapter, emailService, userDataSource, mailTemplateManager, envs.WEBSERVICE_URL);
    const userRepository = new UserRepositoryImpl(authRepository ,userDataSource);
    const projectRepository = new ProjectRepositoryImpl(projectDataSource);
    const postRepository = new PostRepositoryImpl(postDataSource);
    const imageRepository = new ImageRepositoryImpl(imageDataSource);
    const tagRepository = new TagRepositoryImpl(tagDataSource);

    // Controllers
    const authController = new AuthController(authRepository);
    const userController = new UserController(userRepository);
    const projectController = new ProjectController(projectRepository);
    const postController = new PostController(postRepository);
    const imageController = new ImageController(imageRepository);
    const tagController = new TagController(tagRepository);

    export const container = {
    authController,
    userController,
    projectController,
    postController,
    imageController,
    tagController,
    }