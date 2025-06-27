import { hcms } from '$lib/hcms.js';
import { dev } from '$app/environment';

export async function load(params) {
    let data = {};
    try {
        let fileName = getFileName(params);
        let documentName = '/' + process.env.PUBLIC_HCMS_ROOT + '/en/blog/index.html';
        data.main = await hcms.getDocument(
            dev,
            process.env.PUBLIC_HCMS_URL,
            documentName,
            process.env.PUBLIC_HCMS_ROOT,
            process.env.PUBLIC_HCMS_INDEX
        );
        documentName = '/'+process.env.PUBLIC_HCMS_ROOT+params.url.pathname
        if (fileName == 'index.md' || fileName == 'index.html' || fileName == '') {
            data.first = await hcms.findFirstDocument(dev, process.env.PUBLIC_HCMS_URL, params, process.env.PUBLIC_HCMS_INDEX, process.env.PUBLIC_HCMS_ROOT, '', 'status', 'published', 'published', 'desc')
        } else {
            data.first = await hcms.getDocument(dev, process.env.PUBLIC_HCMS_URL, documentName, process.env.PUBLIC_HCMS_ROOT, process.env.PUBLIC_HCMS_INDEX)
        }
    } catch (err) {
        console.log(err);
    }
    return data;
}

function getFileName(params) {
    let result = '';
    if (params.params.file) {
        let index = params.params.file.lastIndexOf('/');
        if (index > -1) {
            result = params.params.file.substring(index + 1);
        } else {
            result = params.params.file;
        }
    }
    return result;
}