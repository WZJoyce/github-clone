import React from "react"
import {User} from "screens/project-list/search-panel"
import { Table } from "antd"
import dayjs from "dayjs";

//interface 创建自己的类
interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}


interface ListProps {
   list: Project[],
   users: User[] 
}

export const List = ({list, users}: ListProps) => {
   return <Table pagination={false} columns={[{
       title:'Role',
       dataIndex:'name',//在project里面的某个属性
       sorter:(a, b) => a.name.localeCompare(b.name)
    }, 
    {
        title:'Department',
        dataIndex:'organization',
    }
    ,{
        title:'Manager',
        render(value,project){
            return <span>
            {users.find(user=>user.id === project.personId)?.name || 'Undefined'}
            </span>
        }
    }
    ,{
        title:'Created Time',
        render(value,project){
            return <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD'):'Undefined'}
            </span>    
        }
    }

   ]} dataSource={list}/>
}