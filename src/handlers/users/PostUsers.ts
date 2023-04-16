import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";
import UserInterface from "../../interfaces/UserInterface";
import DatabaseHelper from "../../utils/DatabaseHelper";

const PostUsers = async (request: IRequest, headers: any, db: DatabaseHelper) => {
    const userData: UserInterface = await request.json();

    await UsersStore.add(db, userData).catch(() => new Response("Error while adding a new user", { status: 500 }));;

    return new Response(JSON.stringify(userData), {
        status: 201,
        headers,
    });
};

export default PostUsers;