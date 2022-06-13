export interface IFMenuBase {
    key: string;
    title: string;
    icon?: string;
    component?: string;
    query?: string;
    requireAuth?: string;
    route?: string;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}

const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        {   
            key: '/app/dashboard/index', 
            title: '首页', 
            icon: 'home', 
            component: 'Dashboard' 
        },
        {
            key: '/app/admin',
            title: '管理员管理',
            icon: 'team',
            component: 'AdminTable',
        },
        {
            key: '/app/conference',
            title: '会议室管理',
            icon: 'bank',
            component: 'ConferenceTable',
        },
        {
            key: '/app/equipment',
            title: '设备管理',
            icon: 'cluster',
            component: 'equipmentTable',
        },
        {
            key: '/app/user',
            title: '用户管理',
            icon: 'user',
            component: 'UserTable',
        },
        {
            key: '/app/history',
            title: '历史记录',
            icon: 'file-search',
            component: 'HistoryTable',
        },
    ],
    others: [
        { key: '/app/pages/changePass', title: '修改密码', component: 'changePass' },
        { key: '/app/equipment/:id', title: '设备', component: 'equipmentIdTable' },
        { key: '/app/history/:id', title: '历史记录', component: 'HistoryIdTable' },
    ], // 非菜单相关路由
};

export default menus;
