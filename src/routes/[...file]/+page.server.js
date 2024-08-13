import { hcms } from '$lib/hcms.js';
import { dev } from '$app/environment';

function getLanguageFromPath(pathName, defaultLanguage) {
    let idx
    let result = ''
    if (pathName == '' || pathName == '/') {
        return defaultLanguage
    }
    idx = pathName.indexOf('/', 1)
    if (idx > -1) {
        result = pathName.substring(1, idx)
    } else {
        result = pathName.substring(1)
    }
    return result
}

export async function load(params){
    try{
        console.log('params', params)
        let selectedLanguage = getLanguageFromPath(params.url.pathname, process.env.PUBLIC_HCMS_LANGUAGE)
        let defaultEndpoint = "/" + selectedLanguage + "/"+process.env.PUBLIC_HCMS_INDEX
        return await hcms.getDocument(dev, process.env.PUBLIC_HCMS_URL, defaultEndpoint, process.env.PUBLIC_HCMS_INDEX, process.env.PUBLIC_HCMS_ROOT)
    }catch(err){
        console.log(err)
    }
}  