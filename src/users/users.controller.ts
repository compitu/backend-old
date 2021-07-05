import {Body, Controller, Delete, Param, Put, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {SettingsService} from '../settings/settings.service';
import {User} from './user.entity';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
    public constructor(
        private usersService: UsersService,
        private settingsService: SettingsService
    ) {}

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
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ok?: number; n?: number}> {
        await this.settingsService.delete(id);
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
