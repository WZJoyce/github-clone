import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/auth-context'
import { Button, Dropdown, Menu } from 'antd'
import styled from "@emotion/styled";
import { Row } from 'components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';

export const AuthenticatedApp = () => {
    const { logout, user } = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                    <h2>Logo</h2>
                    <h2>Project</h2>
                    <h2>User</h2>
                    <h2>another</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={"logout"}>
                                <Button type={"link"} onClick={logout}>
                                    Logout
                                </Button>
                            </Menu.Item>
                        </Menu>}>
                        <Button type={"link"}  onClick={e => e.preventDefault()}>
                            Hi, {user?.name}
                        </Button>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
    )
}

/* grid 和 flex 各自应用场景
1 要考虑  一维布局  二维布局  
一维布局用flex 二维布局用grid 
2. 内容还是布局出发
从内容出发： 内容数量不固定   希望他们均匀分布在容器， 由内容自己的大小决定占据位置
从布局出发：先规划网络（数量一般比较固定） 然后再把元素往里面填充
从内容出发：flex
从布局：grid
*/

const HeaderItem = styled.h3`
    margin-right: 3rem ;
`;

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`;

const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;
