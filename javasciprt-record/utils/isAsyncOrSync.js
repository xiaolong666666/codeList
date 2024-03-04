function a() {}
const b = function(){}
const c = () => {}
function d() {
    return Promise.resolve(true)
}
function* e(){}
async function f(){
    await undefined
}

const isAsyncOrSync = (fn) => {
    const name = fn.constructor.name
    const asyncList = ['GeneratorFunction', 'AsyncFunction']
    const syncList = ['Function', 'ArrowFunction']
    if (asyncList.includes(name)) {
        console.log('async')
    } else if (syncList.includes(name)) {
        console.log('sync')
    } else {
        throw new Error('Not Function')
    }
}

isAsyncOrSync(a)
isAsyncOrSync(b)
isAsyncOrSync(c)
isAsyncOrSync(d)
isAsyncOrSync(e)
isAsyncOrSync(f)
