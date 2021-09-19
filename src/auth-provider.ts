import { User } from "./screens/project-list/search-panel";
//也可以用firebase 第三方auth服务
const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth-provider-token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}:{user:User}) => {
    window.localStorage.setItem(localStorageKey, user.token||'')
    return user
}

export const login = (data:{username:string, password:string}) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST', 
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async response => {
            if(response.ok){
                return handleUserResponse(await response.json())   
            }else{
                await response.json()
                return Promise.reject({message: 'Invalid name or password'})
            }
        })
}


export const register = (data:{username:string, password:string}) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST', 
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async response => {
            if(response.ok){
                return handleUserResponse(await response.json())   
            }else{
                await response.json()
                return Promise.reject({message: 'Invalid name or password'})
            }
        })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)