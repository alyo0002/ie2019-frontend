/*
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
class Scheduler extends React.Component {
    constructor() {
        super(...arguments);
        this.data = [{
            Id: 2,
            Subject: 'Meeting',
            StartTime: new Date(2018, 1, 15, 10, 0),
            EndTime: new Date(2018, 1, 15, 12, 30),
            IsAllDay: false,
            Status: 'Completed',
            Priority: 'High'
        }];
    }
    render() {
        return <ScheduleComponent height='700px' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data,
            fields: {
                id: 'Id',
                subject: { name: 'Subject' },
                isAllDay: { name: 'IsAllDay' },
                startTime: { name: 'StartTime' },
                endTime: { name: 'EndTime' }
            }
        }}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>;
    }
}

export default Scheduler;*/
