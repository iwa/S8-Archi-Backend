import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";

const GetUser = async (request: IRequest, headers: any) => {
    const user = await UsersStore.find(parseInt(request.params.id, 10));

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
    });
};

export default GetUser;