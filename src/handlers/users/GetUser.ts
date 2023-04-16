import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const GetUser = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const user = await UsersStore.find(db, parseInt(request.params.id, 10));

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { headers });
};

export default GetUser;