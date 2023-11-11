import fetch from "node-fetch"

export const handler = async (event) => {
    if (!event.rawPath) {
        return { statusCode: 400, body: "Bad request" }
    }

    const response = {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        }
    }

    try {
        const path = event.rawPath.replace(new RegExp(`^${process.env.PATH_PREFIX || ""}/+|/+$`, "g"), '')
        const name = path.split("/").pop() || "world"


        response.statusCode = 200
        response.body = `hello, ${name}!`
    } catch (e) {
        response.statusCode = 500
        response.body = e.message
    }

    return response
}