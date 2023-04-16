import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";

const PutRental = async (request: IRequest, headers: any) => {
    const rentalId = parseInt(request.params.id, 10);
    const content = await request.json();

    await RentalsStore.edit(rentalId, content).catch(() => new Response("Error while editing a new rental", { status: 500 }));

    return new Response(JSON.stringify(content), { headers, status: 201 });
};

export default PutRental;