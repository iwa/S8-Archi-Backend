import UserInterface from "../interfaces/UserInterface";

const _data: UserInterface[] = [
    {
        id: 1,
        type: "user",
        name: "pierreb",
        email: "pierreb@noreply.com",
        password: "motdepasse",
    },
    {
        id: 2,
        type: "admin",
        name: "galad",
        email: "galad@noreply.com",
        password: "motdepasse",
    },
];

const _tokens: Map<string, string> = new Map();

export default new class UsersStore {

    async all() {
        return _data;
    }

    async find(id: number) {
        return _data.find(user => user.id.toString() === id.toString());
    }

    async add(data: UserInterface) {
        _data.push(data);
    }

    async edit(id: number, data: UserInterface) {
        // sql update command

        const user = _data.find(u => u.id === id);

        if (!user) {
            return false;
        }

        user.name = data.name;
        user.email = data.email;
        user.password = data.password;

        return true;
    }

    async delete(id: number) {
        // sql delete command

        const index = _data.findIndex(u => u.id === id);

        if (index === -1) {
            return false;
        }

        _data.splice(index, 1);

        return true;
    }

    async login(email: string, password: string) {
        const user = _data.find(u => u.email === email && u.password === password);

        if (!user) {
            return false;
        }

        const token = Math.random().toString(36).substr(2);

        _tokens.set(token, user.email);

        return token;
    }

    async logout(token: string) {
        _tokens.delete(token);
    }

    async tokenExists(token: string) {
        return _tokens.has(token);
    }

    async findByToken(token: string) {
        const email = _tokens.get(token);

        if (!email) {
            return false;
        }

        return _data.find(u => u.email === email);
    }
}

