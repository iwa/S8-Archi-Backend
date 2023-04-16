import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const Rentals = async (_: IRequest, headers: any, db: DatabaseHelper) => {
    const data = await RentalsStore.all(db);
    const body = JSON.stringify(data);

    return new Response(body, { headers });
};

export default Rentals;