import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import env from "./config/env.js";
import app from "./app.js";
import connectDB from "./config/database.js";

const start = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            console.log(
                `Server is running on http://localhost:${env.PORT}`
            );
        });
    } catch (error) {
        console.error("Failed to start server");
        console.error(error.message);
        
        process.exit(1);
    }
};

start();