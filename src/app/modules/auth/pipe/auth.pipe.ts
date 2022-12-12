import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { getRandomInt } from 'src/app/common/helpers/randomNumber.helper';

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // INFO: gelen json objesindeki keylerin isimlendirmesini ve objenin son halini pipe ile modify edebiliriz.
    return {
      userName: value.userName || ('Anonymous' + getRandomInt(100)),
      password: value.password,
    };
  }
}