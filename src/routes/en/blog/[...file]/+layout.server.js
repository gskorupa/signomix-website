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

export async function load(params) {
    let data = {}
    //let selectedLanguage = getLanguageFromPath(params.url.pathname, process.env.PUBLIC_HCMS_LANGUAGE)   
    //console.log('blog layout params:', params)
    
    /* let blogPath = params.ulr.pathname.substring(0, params.url.pathname.lastIndexOf('/'))
    if(!blogPath.endsWith('/')){
        blogPath += '/'
    } */
    //let posts = await hcms.findDocuments(dev, process.env.PUBLIC_HCMS_URL, blogPath, process.env.PUBLIC_HCMS_ROOT, 'status', 'published')  
    let posts = await hcms.findDocuments(dev, process.env.PUBLIC_HCMS_URL, params, process.env.PUBLIC_HCMS_ROOT, 'status', 'published', 'published', 'desc', true)  
    data.posts = posts
    return data;
}