/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import routes from '../routes/config';
import routes2 from '../routes/config2'
import SiderMenu from './SiderMenu';
import { connectAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';


const { Sider } = Layout;

type SiderCustomProps = RouteComponentProps<any> & {
    popoverHide?: () => void;
    collapsed?: boolean;
    smenus?: any;
};
type SiderCustomState = {
    collapsed?: boolean | undefined;
    openKeys: string[];
    firstHide: boolean | undefined;
    selectedKey: string;
    mode: string;
    myMune:any
};

class SiderCustom extends Component<SiderCustomProps, SiderCustomState> {
    constructor(props: any) {
        super(props);
        this.state = {
            myMune: [],
            mode: 'inline',
            openKeys: [],
            selectedKey: '',
            firstHide: false, // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        };
    }

    componentDidMount(){
        if(umbrella.getLocalStorage('user').role === 1){
            this.setState({
                myMune : routes.menus
            })
              
        }else{
            this.setState({
                myMune : routes2.menus
            })
        }
    }

    componentDidUpdate(prevProps: SiderCustomProps) {
        if (this.props.collapsed !== this.state.collapsed) {
            const { collapsed } = this.props;
            this.setState({
                ...this.getOpenAndSelectKeys(),
                collapsed,
                mode: collapsed ? 'vertical' : 'inline',
                firstHide: collapsed,
            });
        }
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({ ...this.getOpenAndSelectKeys() });
        }
    }

    getOpenAndSelectKeys() {
        const { location } = this.props;
        const { pathname } = location;
        return {
            openKeys: this.recombineOpenKeys(pathname.match(/[/](\w+)/gi) || []),
            selectedKey: pathname,
        };
    }

    recombineOpenKeys = (openKeys: string[]) => {
        let i = 0;
        let strPlus = '';
        let tempKeys: string[] = [];
        while (i < openKeys.length) {
            strPlus += openKeys[i];
            tempKeys.push(strPlus);
            i++;
        }
        return tempKeys;
    };

    menuClick = (e: any) => {
        this.setState({
            selectedKey: e.key,
        });
        const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = (v: string[]) => {
        this.setState({
            openKeys: v,
            firstHide: false,
        });
    };
    render() {
        const { selectedKey, openKeys, firstHide, collapsed } = this.state;
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={collapsed}
                style={{ overflowY: 'auto' }}
                className="sider-custom"
            >
                <div className="logo" />
                
                <SiderMenu
                    menus={[...(this.state.myMune)]}
                    onClick={this.menuClick}
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    openKeys={firstHide ? [] : openKeys}
                    onOpenChange={this.openMenu}
                />
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        );
    }
}

export default connectAlita([{ smenus: [] }])(withRouter(SiderCustom));
