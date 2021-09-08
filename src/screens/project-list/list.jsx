import React from "react"

export const List = ({list, users}) => {

    return <table>
        <thead>
            <tr>
                <th>Role</th>
                <th>Manager</th>
            </tr>
        </thead>
        <tbody>
            {
                //map need a key
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users.find(user=>user.id === project.personId)?.name || 'Undefined'}</td>
                </tr>)
            }
        </tbody>
    </table>
}