import React from "react";
import { useEffect, useState } from "react"

export const SearchPanel = ({param, setParam,list, setList, users, setUsers}) => {

    return <form action="">
        <div>
            {/* setParam(Object.assign({}, param, {name:evt.target.value}))*/}
            <input type="text" value={param.name} onChange = {evt => setParam({
                ...param,
                name:evt.target.value
            })}/>
            <select value={param.personId} onChange = {evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
            <option value={''}>Leader</option>
            {
                users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
            }
            </select>
        </div>

    </form>
}