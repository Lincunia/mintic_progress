import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PersonRepository} from '../repositories';
import {Person} from '../models';
import {Keys} from '../config/keys';

const generator=require('password-generator'),
    cipher=require('crypto-js'),
    jwt=require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
    constructor(
	@repository(PersonRepository)
	public perRepository: PersonRepository
    ) {}
    generator(){
	return generator(8, false);
    }
    cipherKey(key: string){
	return cipher.MD5(key).toString();
    }
    identifyPer(user: string, key: string){
	try{
	    let perry=this.perRepository.findOne({where: {email: user, key: key}});
	    if(perry) return perry;
	    return false;
	}
	catch{
	    return false;
	}
    }
    generateTokenJWT(person: Person){
	return jwt.sign({
	    data: {
		id: person.id,
		email: person.email,
		name: person.name
	    }
	}, Keys.keyJWT)
    }
    checkTokenJWT(token: string){
	try{
	    return jwt.verify(token, Keys.keyJWT);
	}
	catch{
	    return false;
	}
    }
}
