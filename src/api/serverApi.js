"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
const serverApi = {
    serverApi: process.env.NEXT_PUBLIC_MY_SERVER_API,
    setUrl: function (url) {
        this.serverApi = url;
    },
    send: async function (url, method, body = null) {
        url = `${this.serverApi}${url}`;
        const options = {
            method,
            headers: {
            "Content-Type": "application/json",
            },
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const path = headers().get("next-url");
            revalidatePath(path);
            return await response.json();
        }
        return {}
    },

    get: function (url, body = null) {
        return this.send(url, "GET", body);
    },

    post: function (url, body) {
        return this.send(url, "POST", body);
    },

    put: function (url, body) {
        return this.send(url, "PUT", body);
    },

    patch: function (url, body) {
        return this.send(url, "PATCH", body);
    },

    delete: function (url, body = null) {
        return this.send(url, "DELETE", body);
    },
}
export default serverApi

export async function handleTest() {
    revalidatePath("/mindmap")
}