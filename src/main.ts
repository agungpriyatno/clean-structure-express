import { setupServer } from "@/config/setup";
import server from "@/config/server";

setupServer(() => {
    const PORT = process.env.HOST_PORT
    server.listen(PORT, () => {
        console.log("Server is running")
    })
})
