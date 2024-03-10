fetch('./users.json', {
    method: 'GET'
})
    .then((response) => {
    // 404、5** 会进入.then
    if (response.ok) {
        // 请求成功，200 201
        return response.json()
    } else {
        throw new Error('fetch error')
    }
    })
    .then(console.log)
    .catch(console.error)