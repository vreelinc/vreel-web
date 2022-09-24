import axios from "axios";
const ApiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY
export async function GetFonts(family: string) {
    console.log("api key", ApiKey);
    const { data } = await axios.get(`https://hls-staging.vreel.page/fonts/font?family=${family}`);

    return data
}