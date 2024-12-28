
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDTO {



  @IsNotEmpty()
  @IsString()
  name :string;

  @IsNotEmpty()
  @IsString()
  email:string;
}

export class UserUpdateDTO {
  [key: string]: any; // Permite propiedades dinámicas



  @IsOptional()
  @IsString()
  name :string;

  @IsOptional()
  @IsString()
  email:string;
}
