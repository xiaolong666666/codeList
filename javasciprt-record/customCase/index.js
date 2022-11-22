

const camelize = string => {
    string = string.replace(/[\-_\s]+(.)?/g, (match, chart) => chart.toUpperCase())
    return `${string[0].toLowerCase()}${string.substr(1)}`
}

const snakeCaseToCamelCase = (params) => {
    let result = {}
    if (Array.isArray(params)) {
        result = params.map(param => snakeCaseToCamelCase(param))
    } else {
        for (let key in params) {
            result[camelize(key)] = typeof params[key] === 'object' ? snakeCaseToCamelCase(params[key]) : params[key]
        }
    }
    return result
}

// 输入
const input = {
    user_name: 'name1',
    age: 10,
    detail: {
        user_avatar: 'xxx',
        object_one: {
            a_num: 1,
            str: 'str1'
        },
        array_one: [
            [
                {
                    a_num: 111,
                    b_num: 222
                }
            ],
            [
                {
                    c_obj: {
                        c_num: 333,
                        str: 'str111'
                    }
                }
            ]
        ]
    }
}
    

// 输出
const output = {
    userName: 'name1',
    age: 10,
    detail: {
        userAvatar: 'xxx',
        objectOne: {
            aNum: 1,
            str: 'str1'
        },
        arrayOne: [
            [
                {
                    aNum: 111,
                    bNum: 222
                }
            ],
            [
                {
                    cObj: {
                        cNum: 333,
                        str: 'str111'
                    }
                }
            ]
        ]
    }
}

const out = snakeCaseToCamelCase(input)
    