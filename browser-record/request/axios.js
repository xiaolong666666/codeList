axios('./users.json')
    .then((res) => console.log(res.data))

axios({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    url: './users.json',
    data: Qs.stringify({ name: 'xl' })
})
    .then((res) => console.log(res.data))
    .catch(console.err)

axios({
    headers: { 'content-type': 'application/json' },
    method: 'post',
    url: './users.json',
    data: { name: 'xl' }
})
    .then((res) => console.log(res.data))
    .catch(console.err)

const formData = new FormData()
formData.append('name', 'xl')
formData.append('file', 'file-workflow')

axios({
    headers: { 'content-type': 'multipart/form-data' }, // 有文件流的时候使用
    method: 'post',
    url: './users.json',
    data: formData
})
    .then((res) => console.log(res.data))
    .catch(console.err)