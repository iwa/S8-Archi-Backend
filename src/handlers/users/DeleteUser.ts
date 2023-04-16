import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";

const DeleteUser = async (request: IRequest, headers: any) => {
    const id = parseInt(request.params.id);

    const user = await UsersStore.find(id);

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    await UsersStore.delete(id);

    return new Response("User deleted", { status: 204 });
};

export default DeleteUser;