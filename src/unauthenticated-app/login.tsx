import React, {FormEvent} from 'react'
import { useAuth } from 'context/auth-context'
import {Form, Input, Button} from 'antd'
import { LongButton } from 'unauthenticated-app'
 
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

export const LoginScreen = () => {
    const {login, user} = useAuth()

    const handleSubmit = (values: {username: string, password: string}) => {
        login(values);
    }
    return (
    <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required:true, message:'please input your username'}]}>
            <Input placeholder={'username'} type="text" id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message:'please input your password'}]}>
            <Input placeholder={'password'} type="password" id={'password'}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={'submit'} type={"primary"}>Login</LongButton>
        </Form.Item>
    </Form>
    )
}