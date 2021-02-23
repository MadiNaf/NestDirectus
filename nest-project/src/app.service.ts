import { Injectable } from '@nestjs/common';
import { directus } from './main';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello world!'
  }

}
