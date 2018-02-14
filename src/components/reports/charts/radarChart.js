import React, { Component } from 'react';
import { ColorChart } from '../../functions';
import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    Tooltip,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';

const colorChart = new ColorChart();

class RadarCharts extends Component {
    static defaultProps = {
        colorChart
    }

    render() {
        let thisResults = [];
        for (let i in this.props.thisResults){
            thisResults.push(this.props.thisResults[i])
        }

        let dataForChart = this.props.kpis
        // eslint-disable-next-line
        dataForChart.map((single) => {
            // eslint-disable-next-line
            thisResults.map((i) => {
                single[i['ad']['shortname']] =  parseInt(i['kpis'][single['nameInDB']],10);
            });
        });

        const data = thisResults.map((obj, i) => {
            return <Radar key={i} name={obj['ad']['shortname']} dataKey={obj['ad']['shortname']} stroke={this.props.colorChart.getColor(i)} fill={this.props.colorChart.getColor(i)} fillOpacity={0.4}/>
        });

        return (
            <div>
                <ResponsiveContainer width="95%" height={700} minHeight={400} >
                    <RadarChart outerRadius={270} width={730} height={700} data={dataForChart}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={73} domain={[0, 100]} />
                        { data }
                        <Legend />
                        <Tooltip cursor={{strokeDasharray: '9 9'}}/>
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default RadarCharts;