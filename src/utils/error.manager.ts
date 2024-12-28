import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorManager extends Error {
  constructor({ type, message }: { type: keyof typeof HttpStatus, message: string }) {
    super(`${type}:: ${message}`);
  }

  public static createSignatureError(message: string) {
    // Extraer la primera parte del mensaje antes de '::' (el tipo de error)
    const name = message.split('::')[0]?.toUpperCase();  // Asegúrate de que esté en mayúsculas

    // Verificar si el nombre es un estado válido dentro de HttpStatus
    if (name && HttpStatus[name as keyof typeof HttpStatus]) {
      throw new HttpException(message, HttpStatus[name as keyof typeof HttpStatus]);
    } else {
      // Si no es válido, lanzar el error con un estado por defecto (INTERNAL_SERVER_ERROR)
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
