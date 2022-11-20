import {Entity, model, property} from '@loopback/repository';

@model()
export class Person extends Entity {
    @property({
	type: 'string',
	id: true,
	generated: true,
    })
    id?: string;

    @property({
	type: 'string',
	required: true,
    })
    names: string;

    @property({
	type: 'string',
	required: true,
    })
    surnames: string;

    @property({
	type: 'string',
	required: true,
    })
    email: string;

    @property({
	type: 'string',
	required: true,
    })
    gender: string;

    @property({
	type: 'string',
	required: true,
    })
    comment: string;

    @property({
	type: 'string',
	required: true,
    })
    typeOfComment: string;

    @property({
	type: 'string',
	required: true,
    })
    file: string;

    @property({
	type: 'string',
    })
    url?: string;

    @property({
	type: 'string',
    })
    password?: string;


    constructor(data?: Partial<Person>) {
	super(data);
    }
}

export interface PersonRelations {
    // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
