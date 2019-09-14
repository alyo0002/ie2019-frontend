import * as React from 'react';
import {Col, Row} from "reactstrap";
import {UserCard} from '../../components/Card/index';
import user1Image from "../../assets/images/users/user-10.jpg";
import {Component} from "react";
import axios from 'axios';
import Post from '../../components/Post/Post'


class Patients extends Component {
    state = {
        patients: [],
    };

    componentDidMount() {
        axios.get('http://localhost:3050/patient/list')
            .then(response => {
                this.setState({patients: response.data});
            });
    }

    render() {
        const patientCards = this.state.patients.map(patients => {
                return <Post
                    Title={patients.Title}
                    NameFirst={patients.NameFirst}
                    NameLast={patients.NameLast}
                    Id={patients.Id}
                />
            }
        );

        return (
            <Row>
                {patientCards}
            </Row>
        );
    }

};

export default Patients;