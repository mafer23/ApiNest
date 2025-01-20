import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @Get('all')
  public async findAllUsers(){
    return await this.usersService.findUsers();
  }

  @Get(':id')
  public async findUserById(@Param('id') id: string) {
    const numericId = parseInt(id, 10); // Convertimos 'id' de string a number
    if (isNaN(numericId)) {
      throw new NotFoundException('El ID proporcionado no es válido.');
    }
  
    const user = await this.usersService.findUserById(numericId);
  
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  
    return user;
  }

  
  @Put('edit/:id')
  public async updateUser(
    @Param('id') id:string,
    @Body() body: UserUpdateDTO,
  ){
    const numericId1 = parseInt(id, 10);
    if (isNaN(numericId1)) {
      throw new NotFoundException('El ID proporcionado no es válido.');
    }

    const user = await this.usersService.updateUser(body,numericId1);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    return user;

  }

  @Delete('delete/:id')
   // Respuesta 204 para eliminaciones exitosas
  public async deleteUser(@Param('id') id: string) {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      throw new Error('El ID proporcionado no es válido.');
    }

   return await this.usersService.deleteUser(numericId);

  }

}
