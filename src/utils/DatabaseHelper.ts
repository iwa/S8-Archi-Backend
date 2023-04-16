import RentalInterface from '../interfaces/RentalInterface';
import UserInterface from '../interfaces/UserInterface';

export default class DatabaseHelper {

    private _db: D1Database;

    constructor(db: D1Database) {
        this._db = db;
    }

    async getRentals() {
        const { results } = await this._db.prepare(`SELECT * FROM rentals`)
            .all();

        return results;
    }

    async getOneRental(id: number) {
        const { results } = await this._db.prepare(`SELECT * FROM rentals WHERE id = ?`)
            .bind(id)
            .all();

        return results;
    }

    async addRental(rental: RentalInterface) {
        const { results } = await this._db.prepare(`INSERT INTO rentals (ownerId, address, city, price, type, rented) VALUES (?, ?, ?, ?, ?, ?)`)
            .bind(rental.ownerId, rental.address, rental.city, rental.price, rental.type, rental.rented)
            .run();

        return results;
    }

    async updateRental(rental: RentalInterface) {
        const { results } = await this._db.prepare(`UPDATE rentals SET ownerId = ?, address = ?, city = ?, price = ?, type = ?, rented = ? WHERE id = ?`)
            .bind(rental.ownerId, rental.address, rental.city, rental.price, rental.type, rental.rented, rental.id)
            .run();

        return results;
    }

    async deleteRental(id: number) {
        const { results } = await this._db.prepare(`DELETE FROM rentals WHERE id = ?`)
            .bind(id)
            .run();

        return results;
    }

    async getUsers() {
        const { results } = await this._db.prepare(`SELECT * FROM users`).all();

        return results;
    }

    async getOneUser(id: number) {
        const { results } = await this._db.prepare(`SELECT * FROM users WHERE id = ?`)
            .bind(id)
            .all();

        return results;
    }

    async addUser(user: UserInterface) {
        const { results } = await this._db.prepare(`INSERT INTO users (type, email, name, password) VALUES (?, ?, ?, ?)`)
            .bind(user.type, user.email, user.name, user.password)
            .run();

        return results;
    }

    async updateUser(user: UserInterface) {
        const { results } = await this._db.prepare(`UPDATE users SET type = ?, email = ?, name = ?, password = ? WHERE id = ?`)
            .bind(user.type, user.email, user.name, user.password, user.id)
            .run();

        return results;
    }

    async deleteUser(id: number) {
        const { results } = await this._db.prepare(`DELETE FROM users WHERE id = ?`)
            .bind(id)
            .run();

        return results;
    }

};