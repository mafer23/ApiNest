import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entity/users.entity';
import { ErrorManager } from '../utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
){}


// Crear usuario 
public async createUser(body: UserDTO): Promise<UsersEntity> {
  try {
    return await this.userRepository.save(body);
  } catch (error) {
    // Comprobamos si el error es de tipo Error
    if (error instanceof Error) {
      throw ErrorManager.createSignatureError(error.message);
    }
    throw ErrorManager.createSignatureError('Error desconocido');
    
  }

  
}

//buscar usuarios
public async findUsers(): Promise<UsersEntity[]> {
  try {
    const users: UsersEntity[] = await this.userRepository.find();
    if (users.length === 0) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No se encontro resultado',
      });
    }
    return users;
  } catch (error) {
    throw ErrorManager.createSignatureError(error.message);
  }

}

public async findUserById(@Param('id') id:number): Promise<UsersEntity> {
  try {
    // Corregimos la consulta para vincular el 'id' correctamente
      const user: UsersEntity = await this.userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', {id} )  // Convertimos id a número si es necesario
    .getOne();


  // Si no se encuentra el usuario, lanzamos un error personalizado
  if (!user) {
    throw new ErrorManager({
      type: 'BAD_REQUEST',
      message: 'No se encontró resultado',
    });
  }
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
    throw new ErrorManager.createSignatureError('Error desconocido');
  }
}

public async updateUser(
  body: UserUpdateDTO,
  id:number,
): Promise<UpdateResult | undefined> {
  try {
    const user: UpdateResult = await this.userRepository.update(id, body);
    if (user.affected === 0) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No se puede actualizar',
      });
    }
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
    throw new ErrorManager.createSignatureError('Error desconocido');
  }
}

public async deleteUser(id: number): Promise<DeleteResult> {
  try {
    const deleteResult: DeleteResult = await this.userRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No se encontró el usuario a eliminar.',
      });
    }

    return deleteResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
    throw new ErrorManager.createSignatureError('Error desconocido.');
  }
}

}
