import RentalInterface from "../interfaces/RentalInterface";
import DatabaseHelper from "../utils/DatabaseHelper";

export default new class RentalsStore {

    async all(db: DatabaseHelper) {
        return db.getRentals();
    }

    async find(db: DatabaseHelper, id: number) {
        return db.getOneRental(id);
    }

    async add(db: DatabaseHelper, data: RentalInterface) {
        db.addRental(data);
        return data;
    }

    async edit(db: DatabaseHelper, id: number, data: RentalInterface) {
        return db.updateRental(data);
    }

    async delete(db: DatabaseHelper, id: number) {
        return db.deleteRental(id);
    }
}

