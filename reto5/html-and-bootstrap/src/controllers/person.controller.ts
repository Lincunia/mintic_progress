import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getModelSchemaRef,
    patch,
    put,
    del,
    requestBody,
    response,
} from '@loopback/rest';
import {Person} from '../models';
import {PersonRepository} from '../repositories';

import {service} from '@loopback/core';
import {AuthenticationService} from '../services'
const fetch=require('node-fetch');

export class PersonController {
    constructor(
	@repository(PersonRepository)
	public personRepository : PersonRepository,
	@service(AuthenticationService)
	public authService: AuthenticationService
    ) {}

    @post('/people')
    @response(200, {
	description: 'Person model instance',
	content: {'application/json': {schema: getModelSchemaRef(Person)}},
    })
    async create(
	@requestBody({
	    content: {
		'application/json': {
		    schema: getModelSchemaRef(Person, {
			title: 'NewPerson',
			exclude: ['id'],
		    }),
		},
	    },
	})
	person: Omit<Person, 'id'>,
    ): Promise<Person> {
	// Generate key
	let key=this.authService.generator();
	person.password=this.authService.cipherKey(key);
	let p=await this.personRepository.create(person);
	// Notify the user
	let matter='Registro en la plataforma'
	let content=`Hola ${person.names} ${person.surnames}, tu siguiente contraseña es esta:<br>${key}`;
	fetch(`http://localhost:5000/email_send?email=${person.email}&message=${content}&matter=${matter}`)
	.then((data:any)=>{
	    console.log(data);
	})
	return p;
    }

    @get('/people/count')
    @response(200, {
	description: 'Person model count',
	content: {'application/json': {schema: CountSchema}},
    })
    async count(
	@param.where(Person) where?: Where<Person>,
    ): Promise<Count> {
	return this.personRepository.count(where);
    }

    @get('/people')
    @response(200, {
	description: 'Array of Person model instances',
	content: {
	    'application/json': {
		schema: {
		    type: 'array',
		    items: getModelSchemaRef(Person, {includeRelations: true}),
		},
	    },
	},
    })
    async find(
	@param.filter(Person) filter?: Filter<Person>,
    ): Promise<Person[]> {
	return this.personRepository.find(filter);
    }

    @patch('/people')
    @response(200, {
	description: 'Person PATCH success count',
	content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
	@requestBody({
	    content: {
		'application/json': {
		    schema: getModelSchemaRef(Person, {partial: true}),
		},
	    },
	})
	person: Person,
	@param.where(Person) where?: Where<Person>,
    ): Promise<Count> {
	return this.personRepository.updateAll(person, where);
    }

    @get('/people/{id}')
    @response(200, {
	description: 'Person model instance',
	content: {
	    'application/json': {
		schema: getModelSchemaRef(Person, {includeRelations: true}),
	    },
	},
    })
    async findById(
	@param.path.string('id') id: string,
	@param.filter(Person, {exclude: 'where'}) filter?: FilterExcludingWhere<Person>
    ): Promise<Person> {
	return this.personRepository.findById(id, filter);
    }

    @patch('/people/{id}')
    @response(204, {
	description: 'Person PATCH success',
    })
    async updateById(
	@param.path.string('id') id: string,
	@requestBody({
	    content: {
		'application/json': {
		    schema: getModelSchemaRef(Person, {partial: true}),
		},
	    },
	})
	person: Person,
    ): Promise<void> {
	await this.personRepository.updateById(id, person);
    }

    @put('/people/{id}')
    @response(204, {
	description: 'Person PUT success',
    })
    async replaceById(
	@param.path.string('id') id: string,
	@requestBody() person: Person,
    ): Promise<void> {
	await this.personRepository.replaceById(id, person);
    }

    @del('/people/{id}')
    @response(204, {
	description: 'Person DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
	await this.personRepository.deleteById(id);
    }
}
