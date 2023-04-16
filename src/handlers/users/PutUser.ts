import { IRequest } from "itty-router";
import UserInterface from "../../interfaces/UserInterface";
import UsersStore from "../../stores/UsersStore";

const PutUser = async (request: IRequest, headers: any) => {
    const userData: UserInterface = await request.json();
    const id = parseInt(request.params.id, 10);

    const user = await UsersStore.find(id);

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    await UsersStore.edit(id, userData);

    return new Response(JSON.stringify(userData), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
};

export default PutUser;