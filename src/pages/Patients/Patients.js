import * as React from 'react';
import {Col, Row} from "reactstrap";
import {UserCard} from '../../components/Card/index';
import user1Image from "../../assets/images/users/user-10.jpg";
import {Component} from "react";
import axios from 'axios';
import Post from '../../components/Post/Post'
import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import PatientProfile from "./PatientProfile";


class Patients extends Component {
    state = {
        patients: [],
    };

    componentDidMount() {
        axios.get('http://localhost:4000/patient/list')
            .then(response => {
                this.setState({patients: response.data});
            });
    }
    postSelectedHandler = ( Id ) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push( '/PatientProfile/' + Id );

    };
//<Route path={this.props.match.url + '/:id'} exact component={PatientProfile}/>

    render() {
        const patientCards = this.state.patients.map(patients => {
                return <Post
                    Title={patients.Title}
                    NameFirst={patients.NameFirst}
                    NameLast={patients.NameLast}
                    key={patients.Id}
                    clicked={() => this.postSelectedHandler(patients.Id)}
                />

            }
        );

        return (
            <div>
                <Row>
                    {patientCards}
                </Row>
            </div>


        );
    }

};

export default Patients;
