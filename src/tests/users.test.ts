import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import UserInterface from '../interfaces/UserInterface';
import UsersStore from '../stores/UsersStore';

describe('Users', () => {
    let worker: UnstableDevWorker;

    beforeAll(async () => {
        worker = await unstable_dev('src/index.ts', {
            experimental: { disableExperimentalWarning: true },
        });
    });

    afterAll(async () => {
        await worker.stop();
    });

    it('should return all users', async () => {
        const resp = await worker.fetch('/api/users');

        if (resp) {
            const data = await resp.json();
            expect(data).toMatchObject(UsersStore.all());
        }
    });

    it('should return user by id', async () => {
        const id = 1;
        const resp = await worker.fetch(`/api/users/${id}`);

        if (resp) {
            const data = await resp.json();
            expect(data).toMatchObject(UsersStore.find(id));
        }
    });

    it('should create a new user', async () => {
        const newUser: UserInterface = {
            id: 3,
            type: 'user',
            name: 'newuser',
            email: 'newuser@noreply.com',
            password: 'motdepasse',
        };

        await worker.fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' },
        });

        const resp = await worker.fetch(`/api/users/${newUser.id}`);

        if (resp) {
            const data = await resp.json();
            expect(data).toMatchObject(newUser);
        }
    });

    it('should update a user', async () => {
        const id = 1;
        const updatedUser: UserInterface = {
            id: 1,
            type: 'user',
            name: 'updateuser',
            email: 'updateuser@noreply.com',
            password: 'motdepasse',
        };;

        await worker.fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: { 'Content-Type': 'application/json' },
        });

        const resp = await worker.fetch(`/api/users/${id}`);

        if (resp) {
            const data: any = await resp.json();
            expect(data.name).toBe(updatedUser.name);
        }
    });

    it('should delete a user', async () => {
        const id = 1;

        await worker.fetch(`/api/users/${id}`, { method: 'DELETE' });

        const resp = await worker.fetch(`/api/users/${id}`);

        expect(resp.status).toBe(404);
    });

    it('should log in a user with valid credentials', async () => {
        const credentials = {
            email: 'pierreb@noreply.com',
            password: 'motdepasse',
        };

        const resp = await worker.fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
        });

        expect(resp.status).toBe(200);
    });

    it('should fail to log in a user with invalid credentials', async () => {
        const credentials = {
            email: 'pierreb@noreply.com',
            password: 'wrongpassword',
        };

        const resp = await worker.fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
        });

        expect(resp.status).toBe(401);
    });

});
