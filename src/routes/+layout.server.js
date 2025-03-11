export async function load(params) {
    let data = {}
    data.gtag = process.env.PUBLIC_GTAG
    return data;
}