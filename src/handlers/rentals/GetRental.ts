import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const GetRental = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const rentalId = parseInt(request.params.id, 10);
    const data = await RentalsStore.find(db, rentalId);

    if (data != undefined) {
        const body = JSON.stringify(data);
        return new Response(body, { headers });
    }

    return new Response('{}', { status: 404 });
};

export default GetRental;