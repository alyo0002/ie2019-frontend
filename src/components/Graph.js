import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, Legend, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts';
import * as React from "react";

class Graph extends React.Component {
    constructor() {
        super(...arguments);
        this.data = [
            { month: 'Jan', patients: 13 }, { month: 'Feb', patients: 22 },
            { month: 'Mar', patients: 23 }, { month: 'Apr', patients: 13 },
            { month: 'May', patients: 34 }, { month: 'Jun', patients: 50 },
            { month: 'Jul', patients: 33 }, { month: 'Aug', patients: 45 },
            { month: 'Sep', patients: 13 }, { month: 'Oct', patients: 32},
            { month: 'Nov', patients: 22 }, { month: 'Dec', patients: 30 }
        ];
        this.tooltip = { enable: true, shared: false };
        this.primaryyAxis = { labelFormat: '{value}' };
        this.primarxyAxis = { valueType: 'Category' };
        this.legendSettings = { visible: true };
        this.marker = { dataLabel: { visible: true } };
    }
    render() {
        return <ChartComponent id="charts" type={ColumnSeries} primaryXAxis={this.primarxyAxis} legendSettings={this.legendSettings} primaryYAxis={this.primaryyAxis} tooltip={this.tooltip}>
            <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]}/>
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={this.data} xName='month' yName='patients'  marker={this.marker}/>
            </SeriesCollectionDirective>
        </ChartComponent>;
    }
}

export default Graph;