import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Person} from '../models';

const generator=require('password-generator'),
    cipher=require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
    constructor() {}
    generator(){
	return generator(8, false);
    }
    cipherKey(key: string){
	return cipher.MD5(key).toString();
    }
}
