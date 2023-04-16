import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";

const GetUsers = async (request: IRequest, headers: any) => {
    const searchParams = new URL(request.url).searchParams;
    const type = searchParams.get("type");

    const users = await UsersStore.all();
    const filteredUsers = users.filter((user) => (type ? user.type === type : true));

    return new Response(JSON.stringify(filteredUsers), {
        headers: { "Content-Type": "application/json" },
    });
};

export default GetUsers;