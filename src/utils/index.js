import { useState, useEffect} from "react";
//排除等于value = 0的情况 却被删除了
export const isFalsy = (value) => value === 0 ? false: !value //transfer value to boolean

export const cleanObject = (object) => {
    //Object.assign({}, object)
    console.log("object " + JSON.stringify(object))
    const result = {...object}
    //Object.keys(result) => name, personId
    /*为空的时候{"name":"","personId":"2"}  value = "" =>return true  删除   
    如果value===0 也就是{"name":"0","personId":"2"}=>false */

    Object.keys(result).forEach(key => {
        const value = result[key]
        //The delete : remove a property from an object    delete {"name":""}
        if(isFalsy(value)){
            delete result[key]
        }
    })
    console.log("result "+JSON.stringify(result))
    return result
}

//define a hook
export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
}
//fetch after finishing the input  而不是每次加入字母都会fetch
//第一次执行 timeout == undefined  所以if不经过  第二次的时候timeout就不是undefined 所以if, clear 了 ； 所以第三次又是undefined, 只执行了最后一次
/* const debounce = (func,delay) => {
    let timeout;
    return (...param) => {
        if(timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function(){
            func(...param);
        }, delay);
    }
} */
//将debounce变成 自定义hook
export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => { 
        //value change => set a timer  
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        //这个return在每次在上一个useEffect处理完以后再运行  第一个timeout被第二个clearTimeout删除  第二个被第三个删除  只要最后一个timeout被留下来
        return () => clearTimeout(timeout)
    }, [value,delay])
    return debounceValue
}