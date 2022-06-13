/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import screenfull from 'screenfull';
import avater from '../style/imgs/admin.jpg';
import SiderCustom from './SiderCustom';
import { Menu, Icon, Layout, Badge, Popover } from 'antd';
import { gitOauthToken, gitOauthInfo } from '../service';
import { queryString } from '../utils';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PwaInstaller } from './widget';
import { connectAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

type HeaderCustomProps = RouteComponentProps<any> & {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    responsive?: any;
    path?: string;
};
type HeaderCustomState = {
    user: any;
    visible: boolean;
};


class HeaderCustom extends Component<HeaderCustomProps, HeaderCustomState> {
    state = {
        user: '',
        visible: false,
    };

    
    
    componentDidMount() {
        
        if(!umbrella.getLocalStorage('user')){
            this.props.history.push('/login')
        }else{
            let myUser = umbrella.getLocalStorage('user');
            this.setState({
                user:myUser.adminId
            })

        }
      
    }
    screenFull = () => {
      
    };
    menuClick = (e: { key: string }) => {
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        umbrella.removeLocalStorage('user');
        this.props.history.push('/login');
    };
    password = () => {
        this.props.history.push('/app/pages/changePass');
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible: boolean) => {
        this.setState({ visible });
    };
    render() {
        const { responsive } = this.props;
        return (
            <Header className="custom-theme header">
                {responsive.data.isMobile ? (
                    <Popover
                        content={<SiderCustom popoverHide={this.popoverHide} />}
                        trigger="click"
                        placement="bottomLeft"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <Icon type="bars" className="header__trigger custom-trigger" />
                    </Popover>
                ) : (
                    <Icon
                        className="header__trigger custom-trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                )}
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="pwa">
                        <PwaInstaller />
                    </Menu.Item>
                    <Menu.Item key="full" onClick={this.screenFull}>
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                  
                    <SubMenu
                        title={
                            <span className="avatar">
                                <img src={avater} alt="头像" />
                                <i className="on bottom b-white" />
                            </span>
                        }
                    >
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.state.user}</Menu.Item>
                            <Menu.Item key="setting:2">
                                <span onClick={this.password}>个人信息</span>
                            </Menu.Item>
                            <Menu.Item key="logout">
                                <span onClick={this.logout}>退出登录</span>
                            </Menu.Item>
                        </MenuItemGroup>
                      
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

// 重新设置连接之后组件的关联类型
const HeaderCustomConnect: React.ComponentClass<
    HeaderCustomProps,
    HeaderCustomState
> = connectAlita([{ responsive: { isMobile: false } }])(HeaderCustom);

export default withRouter(HeaderCustomConnect);
