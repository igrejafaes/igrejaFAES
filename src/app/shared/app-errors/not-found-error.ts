// Se o status error for 404
import { AppError } from "./app-error";

export class NotFoundError extends AppError{
  message = 'o caminho não foi encontrado pelo servidor...'
  code = 'not_found'
}