import React from 'react';
import {Progress, Button, Card, CardBody, Col, FormGroup, Input, Label, Row,} from 'reactstrap';
import "./PatientProfile.css";
import {Link} from "react-router-dom";

class PatientProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: '0'
        };
        this.updateState = this.updateState.bind(this);
    }
    updateState(e) {
        this.setState({
            data: e.target.value
        });
    }

    render() {
        return (
                <div>
                <Row>
                    <Col>
                        <Card className="cardProp">
                            <CardBody >
                                <div>
                                    <div className="text-center">{this.state.data}%</div>
                                    <Progress value={this.state.data} />
                                </div><br/>
                                <Row>
                                    <Col lg="12">
                                        <h3 className="text-center">Treatment Phase</h3>
                                        <FormGroup tag="fieldset">

                                            <Row>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Input type="radio" name="radio1" value="25" onChange={this.updateState}/><br/>
                                                        <p>Phase 1</p>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Input type="radio" name="radio1" value="50" onChange={this.updateState}/><br/>
                                                        <p>Phase 2</p>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Input type="radio" name="radio1" value="75" onChange={this.updateState}/><br/>
                                                        <p>Phase 3</p>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="3">
                                                    <FormGroup check className="text-center">
                                                        <Input type="radio" name="radio1" value="100" onChange={this.updateState}/><br/>
                                                        <p>Phase 4</p>
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
                                 <h3>Name: Stuart</h3>
                                 <h3>Surname: Ross</h3>
                                 <h3>Email: Test777@gmail.com</h3>
                                 <br/>
                                 <hr/>
                                 <h6 className="text-center">ID: 7757</h6>
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
                                         <Button color="primary" className="button1" tag={Link} to="/PatientFile">View Files</Button>
                                     </form>
                                 </Col>
                             </CardBody>
                         </Card>
                     </Col>
                 </Row>
                </div>
        );
    };
}
export default PatientProfile;
