import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

export const UnanthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    return <div>
        {
            isRegister ? <RegisterScreen/>:<LoginScreen/>
        }
        <button onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Login' : 'Register'}</button>
    </div>

}