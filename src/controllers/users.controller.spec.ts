import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entity/users.entity';


// Pruebas para saber si cada controller esta bien
describe('UsersController', () => {
  let controller: UsersController;
  
  const mockUserServices ={  }


  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService)
    .useValue(mockUserServices)
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

it('should be defined',()=>{
  expect(controller).toBeDefined();
});
});
