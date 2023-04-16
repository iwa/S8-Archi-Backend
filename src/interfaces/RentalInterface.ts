export default interface RentalInterface {
    id: number,
    ownerId: number,
    address: string,
    city: string,
    price: number,
    type: string,
    rented: boolean;
}