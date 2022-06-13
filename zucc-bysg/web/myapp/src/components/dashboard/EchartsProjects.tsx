/**
 * Created by hao.cheng on 2017/5/5.
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { notification } from 'antd';
import { get } from '../../service/tools';
import umbrella from 'umbrella-storage';

let xAxisData = [];
let data = [];
for (let i = 30; i >= 0; i--) {
    xAxisData.push(i);
    data.push(Math.ceil((Math.cos(i / 5) * (i / 5) + i / 6) * 5) + 10);
}

class EchartsProjects extends React.Component<any, any> {
    state = {
        option: {},
        data: {
            conference: 0,
            equipment: 0,
            user: 0,
            history: 0,
            charts: [
                [new Date()]
               
            ],
        },
    };

    componentDidMount() {
        this.start();
       
    }

    start = () => {
        get({
            url:
                'http://47.97.158.11:8803/admin/init?id=' +
                (umbrella.getLocalStorage('user').role === 2
                    ? umbrella.getLocalStorage('user').id
                    : '0'),
        }).then((res) => {
            if (!res) {
                notification.open({
                    message: '后台异常',
                });
                return 0;
            }
            if (res.rspCode !== '200') {
                notification.open({
                    message: res.rspMsg,
                });
            } else {
                this.setState({
                    data: res.data,
                });
                this.get_30_day();
            }

            
        });
    };

    get_30_day = () => {
        var thrityMonth = [];
        var thrityData = [];
        for (var i = 30; i >= 0; i--) {
            let thisDay = new Date(
                new Date().setDate(new Date().getDate() - i)
            );
            let j;
            for (j = 0; j < this.state.data.charts.length; j++) {
               
                if (new Date(this.state.data.charts[j][0]).toLocaleDateString() === new Date(thisDay.toLocaleDateString()).toLocaleDateString() ) {
                    thrityData.push(this.state.data.charts[j][1]);
                    break;
                }
            }
            if (j === this.state.data.charts.length) {
                thrityData.push(0);
            }

            thrityMonth.push(thisDay.toLocaleDateString());
        }

   

        let option = {
            title: {
                text: '最近30天开会情况',
                left: 'center',
                textStyle: {
                    color: '#777',
                    fontSize: 40,
                },
            },
            backgroundColor: 'white',
            xAxis: [
                {
                    show: true,
                    data: thrityMonth,
                    axisLabel: {
                        textStyle: {
                            color: '#000',
                        },
                    },
                },
                {
                    show: false,
                    data: thrityMonth,
                },
            ],
            tooltip: {},
            visualMap: {
                show: false,
                min: 0,
                max: 30,
                dimension: 0,
                inRange: {
                    color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
                },
            },
            yAxis: {
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#000',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#08263f',
                    },
                },
                axisTick: {
                    show: false,
                },
            },
            series: [
                {
                    name: 'Simulate Shadow',
                    type: 'line',
                    data: thrityData,
                    z: 2,
                    showSymbol: false,
                    animationDelay: 0,
                    animationEasing: 'linear',
                    animationDuration: 1200,
                    lineStyle: {
                        normal: {
                            color: 'transparent',
                        },
                    },
                  
                },
                {
                    name: '完成项目数',
                    type: 'bar',
                    data: thrityData,
                    xAxisIndex: 1,
                    z: 3,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                        },
                    },
                },
            ],
            animationEasing: 'elasticOut',
            animationEasingUpdate: 'elasticOut',
            animationDelay: function (idx: number) {
                return idx * 20;
            },
            animationDelayUpdate: function (idx: number) {
                return idx * 20;
            },
        };
        console.log(this.props);

        this.setState({
            option: option,
        });
    };

    

    render(): React.ReactNode {
        return (
            <ReactEcharts
                option={this.state.option}
                style={{ height: '450px', width: '100%' }}
                className={'react_for_echarts'}
            />
        );
    }
}
export default EchartsProjects;
