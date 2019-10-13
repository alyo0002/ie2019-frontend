import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from "axios";

class Chart extends React.Component {
    state = {
        data: [],
        labels: [],
        values: [],
        chartData: [],
    };

    constructor() {
        super();
    }


    componentDidMount() {
        this.loadData();
    }

    // componentWillMount() {
    //     // set up timer
    //     this.timer = setTimeout(() => {
    //         this.setState({
    //             time: new Date()
    //         });
    //         this.componentWillMount();
    //     }, Math.floor(Date.now() / 1000) * 1000 + 1000 - Date.now());
    // }
    //
    // componentWillUnmount() {
    //     // remove timer
    //     clearTimeout(this.timer);
    // }


    loadData = async () => {
        await axios.get('http://localhost:4000/treatment/totals')
            .then(async response => {
                console.log(response.data);
                // delete response.data['0'];
                response.data.shift();


                let labels = response.data.map(e => {

                        return "Phase " + e.phase;


                });
                let values = response.data.map(e => {

                    return Number(e.count);
                });

                this.setState({
                    labels: [],
                    values: [],
                    chartData: {
                        // labels: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
                        labels: labels,
                        datasets: [{
                            label: 'Patients',
                            // data: [30, 25, 30, 4],
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }
                });
            });
    };


    render() {
        return (
            <Bar
                data={this.state.chartData}

                options={{
                    maintainAspectRatio: false,
                    scales: {yAxes: [{ticks: {beginAtZero: true}}]},
                    legend: {display: false}
                }}
            />

        );
    }


}

export default Chart;
