import ky from "ky";

export const api = ky.create({
    prefixUrl: "/api",
    credentials: "include", // если куки
    headers: {
        "Content-Type": "application/json",
    },
});