import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import {connect} from "react-redux";



class Scheduler extends React.Component {
    constructor() {
        super(...arguments);
        this.data = [{
            Id: 2,
            Subject: 'Meeting',
            StartTime: new Date(2019, 1, 15, 10, 0),
            EndTime: new Date(2019, 1, 15, 12, 30),
            IsAllDay: false,
            Status: 'Completed',
            Priority: 'High'
        }];
    }
    render() {
        return (

            <ScheduleComponent   selectedDate={new Date(2019, 1, 15)} eventSettings={{ dataSource: this.data,
                fields: {
                    id: 'Id',
                    subject: { name: 'Subject' },
                    isAllDay: { name: 'IsAllDay' },
                    startTime: { name: 'StartTime' },
                    endTime: { name: 'EndTime' }
                }
            }}>

                <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>

        );
    }
}

export default connect()( Scheduler);