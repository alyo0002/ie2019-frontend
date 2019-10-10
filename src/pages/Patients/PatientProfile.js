import React from 'react';
import {Progress, Button, Card, CardBody, Col, FormGroup, Input, Label, Row,} from 'reactstrap';
import "./PatientProfile.css";
import {Link} from "react-router-dom";
import axios from 'axios';
import {matchPath} from 'react-router';
import { Formik } from 'formik';

class PatientProfile extends React.Component {
    state = {
        data: 0,
        phase: 0,
        SelectedPatient: [],
        value: 0
    };

    updateState = (e) => {
        this.setState({
            data: e.target.value,
            phase: e.target.value,
            value: e.target.value
        });
        this.x(e.target.value);
    };

    x = (a) => {
        console.log('a: ' + a);
        let b = this.convertProgressToPhase(a);
        console.log(b);
        let url = 'http://localhost:4000/treatment/' + this.state.SelectedPatient.Id + '/' + b;
        axios.get(url)
            .then(response => {
                console.log(response);
            });
    };

    setPhase = (phase) => {
        console.log(phase);

        this.setState({
            data: phase,
            phase: phase,

        });
        // this.forceUpdate();
    };



    convertProgressToPhase = (progress) => {
        progress = Number(progress);
        if (progress === 100)

            return 4;
        else if (progress === 75)
            return 3;
        else if (progress === 50)
            return 2;
        else if (progress === 25)
            return 1;
        else
            return 0;
    };

    convertPhaseToProgress = (phase) => {
        switch (phase) {
            case 0:
                this.setPhase(0);
                break;
            case 1:
                this.setPhase(25);
                break;
            case 2:
                this.setPhase(50);
                break;
            case 3:
                this.setPhase(75);
                break;
            case 4:
                this.setPhase(100);
                break;
            default:
                this.setPhase(0);
                break;
        }
    };


    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }
    handleChange = (e) => {
        this.setState({value: e.target.value})
    };

    loadData() {
        // console.log(this.props.match.param.Id);
        const match = matchPath(this.props.history.location.pathname, {
            path: '/PatientProfile/:Id',
            exact: true,
            strict: false
        });

        if (match.params.Id) {
            if (!this.state.SelectedPatient || (this.state.SelectedPatient && this.state.SelectedPatient.Id !== +match.params.Id)) {
                axios.get('http://localhost:4000/patient/' + match.params.Id)
                    .then(response => {
                            console.log(response);
                            this.setState({SelectedPatient: response.data},
                                () => {
                                    console.log("loaded post");


                                    console.log(this.state)
                                });

                        }
                    );
                axios.get('http://localhost:4000/treatment/' + match.params.Id)
                    .then(response => {
                        console.log(response);
                        this.setState({data: this.convertPhaseToProgress(response.data.Phase)});

                    })
            }
        }

    }

    postSelectedHandler = (Id) => {
        this.props.history.push('/PatientFile/' + Id);
    };

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a Patient!</p>;
        if (this.state.SelectedPatient) {
            post = <div>
                <Row>
                    <Col>
                        <Card className="cardProp">
                            <CardBody>
                                <div>
                                    <div className="text-center">{this.state.phase}%</div>
                                    <Progress value={this.state.phase}/>
                                </div>
                                <br/>
                                <Row>
                                    <Col lg="12">
                                        <h3 className="text-center">Treatment Phase</h3>
                                        <FormGroup tag="fieldset">
                                            <Row>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Button id='1'  name="radio1" value="25"
                                                                onClick={this.updateState}>
                                                            Phase 1
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Button id='2'  name="radio1" value="50"
                                                                onClick={this.updateState}>
                                                        Phase 2
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Button id='3'  name="radio1" value="75"
                                                                onClick={this.updateState}>
                                                        Phase 3
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Button id='4'  name="radio1" value="100"
                                                                onClick={this.updateState}>
                                                        Phase 4
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row><br/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <Card className="cardProp">
                            <CardBody className="text-justify-center">
                                <h3>{this.state.SelectedPatient.NameFirst}</h3>
                                <h3>{this.state.SelectedPatient.NameLast}</h3>
                                <h3>{this.state.SelectedPatient.Email}</h3>
                                <br/>
                                <hr/>
                                <h6 className="text-center">{this.state.SelectedPatient.Id}</h6>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card className="cardProp">
                            <CardBody>
                                <Col className="text-center">
                                    <h4>View Patient Files</h4>
                                    <hr/>
                                    <form>
                                        <Button color="primary" className="button1" tag={Link}
                                                onClick={() => this.postSelectedHandler(this.state.SelectedPatient.Id)}>View
                                            Files</Button>
                                    </form>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        }
        return post;
    };
}

export default PatientProfile;
