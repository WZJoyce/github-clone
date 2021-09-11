import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = ()=>{
    const client = useHttp();
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    interface T {
        name: string,
        personId: string
    }

    const [users, setUsers] = useState([

    ])

    const debouncedParam = useDebounce(param, 2000)

    const [list, setList] = useState([

    ])

    useEffect(()=> {
        //qs.stringify format  a=b&c=d...
        client('projects',{data:cleanObject(debouncedParam)}).then(setList)
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}