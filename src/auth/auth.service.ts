import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(
        email: string,
        pass: string
    ): Promise<{id: string; email: string} | null> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const passwordMatch = await bcrypt.compare(pass, user?.password);
            if (passwordMatch) {
                const {id, email} = user;
                return {id, email};
            }
        }
        return null;
    }
}
