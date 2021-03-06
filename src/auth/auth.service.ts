import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {ProjectType} from '../projects/project-type';
import {Project} from '../projects/project.entity';
import {ProjectsService} from '../projects/projects.service';
import {SettingsService} from '../settings/settings.service';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';
import {TokenService} from './token.service';
import {UserPayload} from './user-payload';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
        private settingsService: SettingsService,
        private projectService: ProjectsService
    ) {}

    async validateUser(
        email: string,
        pass: string
    ): Promise<UserPayload | null> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const passwordMatch = await bcrypt.compare(pass, user?.password);
            if (passwordMatch) {
                const {id, email, name} = user;
                return {id, email, name};
            }
        }
        return null;
    }

    async register(
        name: string,
        email: string,
        password: string
    ): Promise<UserPayload> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        } as User);

        const settings = await this.settingsService.create({
            userId: user._id,
            darkTheme: false,
            timezone: 'UTC',
        });

        const project = await this.projectService.create({
            name: 'Inbox',
            type: ProjectType.BUILT_IN,
            userId: user._id,
            icon: 'inbox',
        } as Project);

        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    }

    async generateTokens(
        user: UserPayload
    ): Promise<{access: string; refresh: string}> {
        const access = await this.tokenService.generateAccessToken(user);
        const refresh = await this.tokenService.generateRefreshToken(user);
        return {access, refresh};
    }
}
