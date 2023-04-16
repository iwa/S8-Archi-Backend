import { RequestLike, Router } from 'itty-router';

import { Env } from '.';

import GetRentals from './handlers/rentals/GetRentals';
import GetRental from './handlers/rentals/GetRental';
import PostRentals from './handlers/rentals/PostRentals';
import PutRental from './handlers/rentals/PutRental';
import DeleteRental from './handlers/rentals/DeleteRental';

import GetUsers from './handlers/users/GetUsers';
import GetUser from './handlers/users/GetUser';
import PostUsers from './handlers/users/PostUsers';
import PutUser from './handlers/users/PutUser';
import DeleteUser from './handlers/users/DeleteUser';
import LoginUser from './handlers/users/LoginUser';


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
};

const router = Router();

// Rentals Routes
router
    .get('/api/rentals', GetRentals)
    .get('/api/rentals/:id', GetRental)
    .post('/api/rentals', PostRentals)
    .put('/api/rentals/:id', PutRental)
    .delete('/api/rentals/:id', DeleteRental);

// Users Routes
router
    .get('/api/users', GetUsers)
    .get('/api/users/:id', GetUser)
    .post('/api/users', PostUsers)
    .put('/api/users/:id', PutUser)
    .delete('/api/users/:id', DeleteUser)
    .post('/api/users/login', LoginUser);


// 404
router.all('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: RequestLike, env: Env) => router.handle(request, headers, env);