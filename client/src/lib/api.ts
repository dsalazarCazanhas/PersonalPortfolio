
import axios from "axios";
import { CV } from "./types";

const JSONBIN_API = "https://api.jsonbin.io/v3/b";

export async function fetchCV(binId: string, apiKey: string): Promise<CV> {
    try {
        const response = await axios.get(`${JSONBIN_API}/${binId}`, {
            headers: {
                'X-Access-Key': apiKey
            }
        });
        return response.data.record;
    } catch (error) {
        console.error('Error fetching CV:', error);
        throw error;
    }
}
