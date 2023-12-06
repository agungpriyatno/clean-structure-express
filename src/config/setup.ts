import dotenv from "dotenv";
import { smtp } from "./smtp";
dotenv.config()

export const setupServer = (callback: () => void) => {
    try {
        smtp.verify()
        callback()
    } catch (error) {
        console.log(error);
        
    }
}