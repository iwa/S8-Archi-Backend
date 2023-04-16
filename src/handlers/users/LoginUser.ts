import { IRequest } from "itty-router";
import UsersStore from "../../stores/UsersStore";

const LoginUser = async (request: IRequest, headers: any) => {
    const { email, password }: { email: string; password: string; } = await request.json();

    const token = await UsersStore.login(email, password);

    if (!token) {
        return new Response("Invalid email or password", { status: 401 });
    }

    return new Response(token, { status: 200, headers: { "Content-Type": "application/json" } });
};

export default LoginUser;