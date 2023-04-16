import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const PutRental = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const rentalId = parseInt(request.params.id, 10);
    const content = await request.json();

    await RentalsStore.edit(db, rentalId, content).catch(() => new Response("Error while editing a new rental", { status: 500 }));

    return new Response(JSON.stringify(content), { headers, status: 201 });
};

export default PutRental;