import React from "react"
import {User} from "screens/project-list/search-panel"

//interface 创建自己的类
interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}


interface ListProps {
   list: Project[],
   users: User[] 
}

export const List = ({list, users}: ListProps) => {

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