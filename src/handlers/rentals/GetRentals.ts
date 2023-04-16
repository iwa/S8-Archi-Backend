import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";

const Rentals = async (_: IRequest, headers: any) => {
    const data = await RentalsStore.all();
    const body = JSON.stringify(data);

    return new Response(body, { headers });
};

export default Rentals;