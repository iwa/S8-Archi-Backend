import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";

const PostRentals = async (request: IRequest, headers: any) => {
    const content = await request.json();

    await RentalsStore.add(content).catch(() => new Response("Error while adding a new rental", { status: 500 }));

    return new Response(JSON.stringify(content), { headers, status: 201 });
};

export default PostRentals;