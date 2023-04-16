import UserInterface from "../interfaces/UserInterface";
import DatabaseHelper from "../utils/DatabaseHelper";

export default new class UsersStore {

    async all(db: DatabaseHelper) {
        return db.getUsers();
    }

    async find(db: DatabaseHelper, id: number) {
        return db.getOneUser(id);
    }

    async add(db: DatabaseHelper, data: UserInterface) {
        await db.addUser(data);
        return data;
    }

    async edit(db: DatabaseHelper, id: number, data: UserInterface) {
        await db.updateUser(data);
        return true;
    }

    async delete(db: DatabaseHelper, id: number) {
        await db.deleteUser(id);
        return true;
    }
}

