import UsersStore from "../stores/UsersStore";

export default async function adminIsLoggedIn(request: Request) {
    const token = request.headers.get("Authorization");

    if (!token) {
        return false;
    }

    const loggedIn = await UsersStore.tokenExists(token);

    if (!loggedIn) {
        return false;
    }

    const user = await UsersStore.findByToken(token);

    if (!user) {
        return false;
    }

    if (user.type !== "admin") {
        return false;
    }

    return true;
}