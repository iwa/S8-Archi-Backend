import { IRequest } from "itty-router";
import RentalsStore from "../../stores/RentalsStore";
import DatabaseHelper from "../../utils/DatabaseHelper";
import { Env } from "../..";

const PostRentals = async (request: IRequest, headers: any, db: DatabaseHelper, env: Env) => {
    const content = await request.json();

    const image = await request.formData().get("photo");

    if (image && (image instanceof File)) {
        const filePath = `rentapi/${image.name}`;
        const bucket = env.BUCKET;
        const response = await bucket.put(filePath, image.stream());

        if (!response) {
            return new Response('Failed to upload image', { status: 500 });
        }

        content.photo = `https://pub-a80be0e5816045c0badbb7184a3f7231.r2.dev/${image.name}`;
    }

    await RentalsStore.add(db, content).catch(() => new Response("Error while adding a new rental", { status: 500 }));

    return new Response(JSON.stringify(content), { headers, status: 201 });
};

export default PostRentals;