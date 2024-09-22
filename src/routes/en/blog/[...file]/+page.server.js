import { hcms } from '$lib/hcms.js';
import { dev } from '$app/environment';

export async function load(params) {
    try {
        //console.log("page.server.js: load: params", params)
        let fielName = getFileName(params)
        if (fielName == 'index.md' || fielName == 'index.html' || fielName == '') {
            return await hcms.findFirstDocument(dev, process.env.PUBLIC_HCMS_URL, params, process.env.PUBLIC_HCMS_INDEX, process.env.PUBLIC_HCMS_ROOT, '', 'status', 'published', 'published', 'desc')
        } else {
            let documentName = '/'+process.env.PUBLIC_HCMS_ROOT+params.url.pathname
            return await hcms.getDocument(dev, process.env.PUBLIC_HCMS_URL, documentName, process.env.PUBLIC_HCMS_ROOT, process.env.PUBLIC_HCMS_INDEX)
            //return await hcms.getDocument(dev, process.env.PUBLIC_HCMS_URL, params, process.env.PUBLIC_HCMS_INDEX, process.env.PUBLIC_HCMS_ROOT)
        }
    } catch (err) {
        console.log(err)
    }
}

function getFileName(params) {
    let result = ''
    if (params.params.file) {
        let index = params.params.file.lastIndexOf('/')
        if (index > -1) {
            result = params.params.file.substring(index + 1)
        } else {
            result = params.params.file
        }
    }
    return result
}