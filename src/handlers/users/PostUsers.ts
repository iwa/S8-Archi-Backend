import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";
import UserInterface from "../../interfaces/UserInterface";

const PostUsers = async (request: IRequest, headers: any) => {
    const userData: UserInterface = await request.json();

    await UsersStore.add(userData).catch(() => new Response("Error while adding a new user", { status: 500 }));;

    return new Response(JSON.stringify(userData), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
};

export default PostUsers;