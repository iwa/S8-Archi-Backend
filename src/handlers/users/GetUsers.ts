import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";
import DatabaseHelper from "../../utils/DatabaseHelper";

const GetUsers = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const searchParams = new URL(request.url).searchParams;
    const type = searchParams.get("type");

    const users = await UsersStore.all(db);

    return new Response(JSON.stringify(users), { headers });
};

export default GetUsers;