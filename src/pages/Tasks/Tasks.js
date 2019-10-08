import * as React from 'react';
import * as ReactDOM from "react-dom";

import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    EventSettingsModel
} from '@syncfusion/ej2-react-schedule';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
import {connect} from "react-redux";


class Scheduler extends React.Component {
    // https://calendar.google.com/calendar?cid=aWUyMDE5Z3JvdXA1QGdtYWlsLmNvbQ
    // ie2019group5@gmail.com
    //https://www.googleapis.com/calendar/v3/calendars/5105trob9dasha31vuqek6qgp0@group.calendar.google.com/events?key=AIzaSyD76zjMDsL_jkenM5AAnNsORypS1Icuqxg
    constructor() {
        super();
        this.calendarId = 'ie2019group5@gmail.com';
        // this.calendarId = '5105trob9dasha31vuqek6qgp0@group.calendar.google.com';
        this.publicKey = 'AIzaSyAJZP-0A4l0JBEe5Xh-f06wQIyCwUykCww';
        // this.publicKey = 'AIzaSyD76zjMDsL_jkenM5AAnNsORypS1Icuqxg';
        this.dataManger = new DataManager({
            url: 'https://www.googleapis.com/calendar/v3/calendars/' + this.calendarId + '/events?key=' + this.publicKey,
            adaptor: new WebApiAdaptor,
            crossDomain: true
        });
        console.log(this.dataManger);
    }

    onDataBinding(e) {
        let items = e.result.items;
        let scheduleData = [];
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                let event = items[i];
                let when = event.start.dateTime;
                let start = event.start.dateTime;
                let end = event.end.dateTime;
                if (!when) {
                    when = event.start.date;
                    start = event.start.date;
                    end = event.end.date;
                }
                scheduleData.push({
                    Id: event.id,
                    Subject: event.summary,
                    StartTime: new Date(start),
                    EndTime: new Date(end),
                    IsAllDay: !event.start.dateTime
                });
            }
        }
        e.result = scheduleData;
    }

    render() {
        return <ScheduleComponent ref={schedule => this.scheduleObj = schedule} width='100%' height='550px'
                                  readonly={true}
                                  eventSettings={{dataSource: this.dataManger}}
                                  dataBinding={this.onDataBinding.bind(this)}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>;
    }
}

export default connect()(Scheduler);
