import { useState } from "react"
//custom hook   about loading
interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
} 

const defaultInitialState:State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D> (initialState? : State<D>, initialConfig? : typeof defaultConfig) => {
    //Object.assign(A, B)  b覆盖A
    const config = Object.assign(defaultConfig, initialConfig)
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data:D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error:Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    const run = (promise: Promise<D>) => {
        if(!promise || !promise.then){
            throw new Error('promise data')
        }
        setState({...state, stat:'loading'})
        return promise
            .then(data => {
            setData(data)
            return data
        }).catch(error => {
            //消化了异常   如果不主动抛出 外面接受不了了
            setError(error)
            console.log(config.throwOnError)
            if(config.throwOnError)
            {   
                console.log("try error")
                return Promise.reject(error);
            }
            //抛出异常  外界就能接受了
            console.log("ee")
            return error
        })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }

}