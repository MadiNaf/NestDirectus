import { Injectable } from '@nestjs/common';
import { directus } from './main';

@Injectable()
export class AppService {
  authUser(): Promise<string> {
    return this.directusAuth()
        .then( value => {
          console.log('auth_res: ', value.data.expires)
          return 'directus connected'
        })
        .catch(err => {
          console.log('auth_err: ', err)
          return 'fail_directus_auth'
        });
  }

  async directusAuth(): Promise<any> {
    return  await directus.auth.login({email: 'madi@dev.fr', password: 'Madi!976'});
  }
}
