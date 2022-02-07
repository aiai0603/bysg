export interface IFMenuBase {
    key: string;
    title: string;
    icon?: string;
    component?: string;
    query?: string;
    requireAuth?: string;
    route2?: string;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}

const menus2: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'home', component: 'Dashboard' },
        {
            key: '/app/conference',
            title: '会议室管理',
            icon: 'bank',
            component: 'ConferenceTable' 
            
        },
        {
            key: '/app/equipment',
            title: '设备管理',
            icon: 'cluster',
            component: 'equipmentTable' 
            
        },
        {
            key: '/app/history',
            title: '历史记录',
            icon: 'file-search',
            component: 'HistoryTable' 
            
        },
       
    ],
    others: [
        {
            key: '/equipment/find',
            title: '会议室设备',
            component: 'equipmentId',
        },
    ], // 非菜单相关路由
};

export default menus2;
