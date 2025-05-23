import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const DeleteRental = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const rentalId = parseInt(request.params.id, 10);
    const data = await RentalsStore.find(rentalId);

    if (data != undefined) {
        return new Response('Not Found', { headers, status: 404 });
    }

    await RentalsStore.delete(db, rentalId);

    return new Response('', { status: 200 });
};

export default DeleteRental;