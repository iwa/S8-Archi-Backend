import { IRequest } from "itty-router";
import UserInterface from "../../interfaces/UserInterface";
import UsersStore from "../../stores/UsersStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const PutUser = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const userData: UserInterface = await request.json();
    const id = parseInt(request.params.id, 10);

    const user = await UsersStore.find(db, id);

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    await UsersStore.edit(db, id, userData);

    return new Response(JSON.stringify(userData), {
        status: 201,
        headers,
    });
};

export default PutUser;