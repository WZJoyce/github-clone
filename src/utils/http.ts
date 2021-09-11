import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit{
    token?:string,
    data?:object

}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}:Config={}) => {
    const config = {
        method:'GET',
        headers:{
            Authorization: token ? `Bearer ${token}`:'',
            'Content-Type': data ? 'application/json':'',
        },
        ...customConfig
    }

    if(config.method.toUpperCase()==='GET'){
        endpoint+=`?${qs.stringify(data)}`
    }else {
        config.body = JSON.stringify(data || {})
    }
    //axios 和 fetch表现不一样  axios可以直接在返回状态不为2xx的时候抛出异常 
    return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
        if(response.status === 401){
            await auth.logout()
            window.location.reload()
            return Promise.reject({message: 'Please login again'})
        }
        const data = await response.json()
        if(response.ok){
            return data
        }else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const {user} = useAuth()
    //todo utility type的用法  用泛型给它传入一个其他类 然后utility type 对这个类型进行某种操作
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}

//联合类型
/* let myNumber: string | number
 myNumber = 7
 myNumber = 'seven'

类型别名  interface在这种情况下没法替代type
 type favoriteNumber = string | number
 let rose : favoriteNumber = '6'

 interface Person{
     name:string
 }
 (type Person = {name:string})
 const jacky : Person = {name:'try'}
*/

//interface  也没法实现Utility type  
/*  
type Person = {
    name: string,
    age:number
}
(Partial<T> 将T中所有属性转换为可选属性。返回的类型可以是T的任意子集)
const jack : Partial<Person> = {name:'jack'}
(Omit删除Person  name类型)
const rose: Omit<Person, 'name'> = {age:8}
const t: Omit<Person, 'name'|'age'> = {} 删了name age
type PersonOnlyName = Pick<Person, 'name'|'age'>  挑选键值去实现新类型
type Age = Exclude<PersonKeys, 'name'> 过滤掉name返回其他的key
*/

/*
partial的实现
type PersonKeys = keyof Person   取Person中的key  name age
type Person<T> = {
    [P in keyof T]? : T[P];   遍历 T中的Key
}
*/


