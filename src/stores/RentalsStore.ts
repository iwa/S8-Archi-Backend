import RentalInterface from "../interfaces/RentalInterface";

const _data: RentalInterface[] = [
    {
        id: 1,
        ownerId: 1,
        address: '12 Rue Derriere',
        city: 'Ici',
        price: 800.0,
        type: "House",
        rented: false
    },
    {
        id: 2,
        ownerId: 1,
        address: '34 Rue Devant',
        city: 'La',
        price: 1200.0,
        type: "House",
        rented: true
    },
];

export default new class RentalsStore {
    async all() {
        return _data;
    }

    async find(id: number) {
        return _data.find(post => post.id.toString() === id.toString());
    }

    async add(data: RentalInterface) {
        _data.push(data);
    }

    async edit(id: number, data: RentalInterface) {
        // sql update
    }

    async delete(id: number) {
        // sql delete
    }
}

