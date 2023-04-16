import { RequestLike, Router } from 'itty-router';

import { Env } from '.';

import GetRentals from './handlers/rentals/GetRentals';
import GetRental from './handlers/rentals/GetRental';
import PostRentals from './handlers/rentals/PostRentals';
import PutRental from './handlers/rentals/PutRental';
import DeleteRental from './handlers/rentals/DeleteRental';


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
};

const router = Router();

router
    .get('/api/rentals', GetRentals)
    .get('/api/rentals/:id', GetRental)
    .post('/api/rentals', PostRentals)
    .put('/api/rentals/:id', PutRental)
    .delete('/api/rentals/:id', DeleteRental)
    .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: RequestLike, env: Env) => router.handle(request, headers, env);