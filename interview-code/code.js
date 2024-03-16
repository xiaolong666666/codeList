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