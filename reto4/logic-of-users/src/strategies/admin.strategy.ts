import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';

import {AuthenticationService} from '../services'

export class adminStrategy implements AuthenticationStrategy{
    name: string='admin';
    constructor(
	@service(AuthenticationService)
	public authService: AuthenticationService
    ){}
    async authenticate(request: Request): Promise<UserProfile | undefined>{
	let token=parseBearerToken(request);
	if(token){
	    let data=this.authService.checkTokenJWT(token);
	    if(data){
		let profile:UserProfile=Object.assign({
		    name: data.data.name
		});
		return profile;
	    }
	    throw new HttpErrors[401]('Wrong token')
	}
	throw new HttpErrors[401]('It hasn\'t been included a token in the request')
    }
}
