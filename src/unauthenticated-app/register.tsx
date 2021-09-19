import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'
import { Form, Input, Button } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

const apiUrl = process.env.REACT_APP_API_URL

interface Base {
    id: number
}

interface Advance extends Base {
    name: string
}

const test = (p: Base) => {

}
//鸭子类型：面向接口类型 而不是面向对象编程  比如 const a = {id:1, name:'jack'}  test(a)  也ok
const a: Advance = { id: 1, name: 'jack' }

test(a)

export const RegisterScreen = ({onError}:{onError:(error:Error) => void }) => {
    const { register, user } = useAuth()
    const {run, isLoading} = useAsync(undefined, {throwOnError: true})

    const handleSubmit = async ({cpassword, ...values} : {cpassword: string | null, username: string, password: string}) => {
        if(cpassword !== values.password){
            onError(new Error('The passwords entered do not match. Please try again'))
            return
        }
        try{
            await run(register(values))
        }catch(e: any){
            onError(e)
        }
    }
    return (<Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{ required: true, message: 'please input your username' }]}>
            <Input placeholder={'Username'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{ required: true, message: 'please input your password' }]}>
            <Input placeholder={'Password'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{ required: true, message: 'please input your password again' }]}>
            <Input placeholder={'Confirm Password'} type="password" id={'cpassword'} />
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>Register</LongButton>
        </Form.Item>
    </Form>)
}