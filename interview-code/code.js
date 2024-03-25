// 随机生成16进制代码(生成随机颜色)
/* (() => {    // 0x 表示16进制    ffffff 表示白色
    const res = Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
    console.log('随机生成16进制代码', res)
})() */

// 打印1到100，遇到数字为3的倍数的时候，打印“Fizz”替代数字，5的倍数用“Buzz”代替，既是3的倍数又是5的倍数打印“FizzBuzz”。
/* (() => {
for(i=0;++i<101;console.log(i%5?f||i:f+'Buzz'))f=i%3?'':'Fizz'

var y=[];
for(i=1;i<101;i++){
    if(!(i%3)&&!(i%5)) y.push('FizzBuzz')
    else if(!(i%3)) y.push('Fizz')
    else if(!(i%5)) y.push('Buzz')
    else y.push(i)
}
})() */

// 获取URL查询参数
/* (() => {
    const q = {}
    const defaultSearch = location.search || '?foo=bar&baz=bing' 
    defaultSearch.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
    console.log(q)
})() */

// 判断数组&对象
/* (() => {
    const isArray = (o) => {
        Object.prototype.toString.call(o) === '[object Array]';
        Array.isArray(o)
        o instanceof Array
    }
    const isObject = (o) => {
        Object.prototype.toString.call(o) === '[object Object]';
        typeof o === 'object' && !(o instanceof Array)
    }
})() */

// mapping 双向绑定
/* (() => {
    const createMapping = (m = {}) => {
        for (let i = 0; i < 26; i++) {
            let char = String.fromCharCode(i + 65)  // 通过数字 => 字符     字符 => 数字（char.charCodeAt()）
            console.log(char)
            m[m[char] = i] = char
        }
        return m
    }
    const mapping = createMapping()
    console.log(mapping)
})() */

