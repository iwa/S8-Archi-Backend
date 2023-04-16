import { handleRequest } from "./handler";
import RentalsStore from "./stores/RentalsStore";
import UsersStore from "./stores/UsersStore";
import DatabaseHelper from "./utils/DatabaseHelper";

export interface Env {
    BUCKET: R2Bucket;
    DB: D1Database;
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        let db = new DatabaseHelper(env.DB);

        return handleRequest(request, env, ctx, db);
    },
};
