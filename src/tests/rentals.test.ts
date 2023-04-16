import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

const _data: any = [
    {
        id: 1,
        ownerId: 1,
        address: '12 Rue Derriere',
        city: 'Ici',
        price: 800.0,
        type: "House",
        rented: false
    },
    {
        id: 2,
        ownerId: 1,
        address: '34 Rue Devant',
        city: 'La',
        price: 1200.0,
        type: "House",
        rented: true
    },
];

const dummyCreated = {
    id: 10,
    ownerId: 2,
    address: "56 Rue Derriere",
    city: "La",
    price: 999.99,
    type: "Appartment",
    rented: false
};

describe("Rentals", () => {
    let worker: UnstableDevWorker;

    beforeAll(async () => {
        worker = await unstable_dev("src/index.ts", {
            experimental: { disableExperimentalWarning: true },
        });
    });

    afterAll(async () => {
        await worker.stop();
    });

    it("should return dummy rentals data", async () => {
        const resp = await worker.fetch('/api/rentals');

        if (resp) {
            const data = await resp.json();
            expect(data).toMatchObject(_data);
        }
    });

    it("should return one dummy rental data", async () => {
        const resp = await worker.fetch('/api/rentals/1');

        if (resp) {
            const data = await resp.json();
            expect(data).toMatchObject(_data[0]);
        }
    });

    it("should create one rental", async () => {
        await worker.fetch('/api/rentals', { method: "POST", body: '{ "id": 10, "ownerId": 2, "address": "56 Rue Derriere", "city": "La", "price": 999.99, "type": "Appartment", "rented": false }' });
        const resp = await worker.fetch('/api/rentals/10');

        if (resp) {
            const data = await resp.json();
            expect(data).toMatchObject(dummyCreated);
        }
    });
});
