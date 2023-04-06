import { Expose } from 'class-transformer';

export class FunDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  password: string;
}
