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

const getUrl = (basicUrl, queryParamsList) => {
    queryParamsList.sort()
    const uri = queryParamsList.reduce((total, [key, value], index) => `${total}${index !== 0 ? '&' : ''}${key}=${value}`, '?')
    return `${basicUrl}${uri}`
}

getURLParams("https://a.com/?a=1&b=2", "a")

const basicUrl = 'https://www.baidu.com'
const queryParamsList = [
    ["sl", "en"],
    ["sf", "af"],
    ["text", "hello"],
    ["op", "translate"],
]

getUrl(basicUrl, queryParamsList)