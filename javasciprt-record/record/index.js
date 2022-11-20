const getURLParams = (url, key) => {
    const urlParams = url.substr(url.indexOf('?') + 1)
    // const paramsObj = new URLSearchParams(urlParams)
    // return paramsObj.get(key)

    let value = ''
    const paramsArray = urlParams.split('&')
    for (let i in paramsArray) {
        const [k, v] = paramsArray[i].split('=')
        if (key === k) {
            value = v
        }
    }
    return value
}

getURLParams("https://a.com/?a=1&b=2", "a")