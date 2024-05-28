export const hcms = {
    getDocuments: async function (devMode, serviceUrl, pathObject, indexFileName) {
        console.log("hcms.getDocuments: devMode=" + devMode)
        if (devMode) {
            let docs = [
                { content:"<b>test</b> doc", path: "/doc1" },
            ]
            return { paths: this.getPaths(pathObject.params.file), documents: docs }
        }
        let method = 'GET'
        let url = serviceUrl + "?path="
        if(pathObject.params.file.length==0 && indexFileName!=undefined){
            url=url+indexFileName
        }else{
            url=url+pathObject.params.file
        }
        console.log("hcms.getDocuments: url=" + url)
        const headers = new Headers()
        headers.set('Accept', 'application/json');
        const response = await fetch(url, { method: method, mode: 'cors', headers: headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText + " " + response.status)
                }
                let documents = response.json()
                return {
                    paths: this.getPaths(pathObject.params.file),
                    documents: documents
                }
            })
            .catch(error => {
                console.error('There was an error!', error)
                return {}
            })
        return response
    },
    getPaths: function (docpath) {
        let paths = docpath.split("/")
        console.log("hcms.getPaths: paths=" + paths)
        paths.splice(0, 0, "")
        let result = []
        result.push({
            name: "", //home folder on index 0
            path: "/"
        })
        for (let i = 1; i < paths.length; i++) {
            if(paths[i].length==0){
                continue
            }
            if (paths[i].indexOf(".") > 0) {
                result.push({
                    name: paths[i],
                    path: result[i - 1].path + paths[i]
                })
            } else {
                result.push({
                    name: paths[i],
                    path: result[i - 1].path + paths[i] // + "/"
                })
            }

        }
        return result
    },
    getElementPath: function (index, paths) {
        let path = ""
        for (let i = 0; i < index; i++) {
            path += paths[i]
        }
        return path
    },
    getDocument: function (devMode, serviceUrl, path, indexFile, token, type) {
        try {
            return Promise.resolve(getHcmsDocument(devMode, serviceUrl, path, indexFile, token, type)).then((result) => result);
        } catch (e) {
            throw new Error(e);
        }
    }

}

const getHcmsDocument = async function (devMode, serviceUrl, path, indexFile, token, type) {
    if (devMode) {
        if (type != undefined && type == "navigation") {
            return {
                "title": "EXPERIOT",
                "logo": "logo.svg",
                "elements": [
                    { url: { pl: "pl", en: "en" }, label: { en: "Home", pl: "Start" }, target: "" }
                ]
            }
        } else {
            return {
                document:
                {
                    content: "<b>test</b> doc<br>" + path
                }
            }
        }
    }
    try {
        const headers = new Headers()
        //headers.set('Accept', 'application/json');
        if (token != undefined && token != null) {
            headers.set('Authentication', token);
        }
        let endpoint;
        if (typeof path === 'string' || path instanceof String) {
            //console.log("path is a string")
            endpoint = serviceUrl + "/api/document?path=" + path
        } else {
            //console.log("path is an object")
            endpoint = serviceUrl + "/api/document?path=/" + path.params.file
        }
        if(!(endpoint.endsWith(".md")||endpoint.endsWith(".html")||endpoint.endsWith(".json"))){
            endpoint = endpoint + "/"+indexFile
        }
        console.log("endpoint:", endpoint)
        const res = await fetch(endpoint, {
            mode: 'cors',
            method: 'GET',
            headers: headers
        });
        let data;
        //console.log("res:", res.type)
        //console.log("res:", res.status)
        if (res.status == 200) {
            return await res.json();
        } else {
            data = { content: "No content" }
            return data
        }
    } catch (e) {
        console.log('HCMS ERROR', e)
        throw new Error(e);
    }
}