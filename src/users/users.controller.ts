import {Body, Controller, Param, Put, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {User} from './user.entity';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
    public constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() user: {id: string; name: string; email: string}
    ): Promise<Pick<User, 'id' | 'name' | 'email'>> {
        const updatedUser = await this.usersService.update(user);
        return this.usersService.fromDb(updatedUser);
    }
}
