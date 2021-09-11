import React, {FormEvent} from 'react'
import { useAuth } from 'context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Base {
    id: number
}

interface Advance extends Base{
    name: string
}

const test = (p:Base) => {

}
//鸭子类型：面向接口类型 而不是面向对象编程  比如 const a = {id:1, name:'jack'}  test(a)  也ok
const a:Advance = {id:1, name:'jack'}

test(a)

export const RegisterScreen = () => {
    const {register, user} = useAuth()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value  
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        register({username, password})
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">UserName</label>
            <input type="text" id={'username'}></input>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id={'password'}></input>
        </div>
        <button type={"submit"}>Register</button>
    </form>
}