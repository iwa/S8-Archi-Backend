import UsersStore from "../stores/UsersStore";

export default async function userIsLoggedIn(request: Request) {
    const token = request.headers.get("Authorization");

    if (!token) {
        return false;
    }

    const loggedIn = await UsersStore.tokenExists(token);

    if (!loggedIn) {
        return false;
    }

    return true;
}