import {Body, Controller, Delete, Param, Put, UseGuards} from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Put(':id/darkTheme')
    async updateDarkTheme(
        @Param('id') id: string,
        @Body() data: {darkTheme: boolean}
    ): Promise<{id: string; darkTheme: boolean}> {
        const updatedUser = await this.usersService.updateDarkTheme({
            id,
            darkTheme: data.darkTheme,
        });
        return {id: updatedUser._id, darkTheme: updatedUser.darkTheme};
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ok?: number; n?: number}> {
        return this.usersService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/password')
    async changePassword(
        @Param('id') id: string,
        @Body() data: {oldPass: string; newPass: string}
    ): Promise<Pick<User, 'id' | 'name' | 'email'>> {
        const updatedUser = await this.usersService.changePassword({
            userId: id,
            oldPass: data.oldPass,
            newPass: data.newPass,
        });
        return this.usersService.fromDb(updatedUser);
    }
}
