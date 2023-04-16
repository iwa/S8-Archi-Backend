import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const DeleteUser = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const id = parseInt(request.params.id);

    const user = await UsersStore.find(db, id);

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    await UsersStore.delete(db, id);

    return new Response("User deleted", { status: 204, headers });
};

export default DeleteUser;