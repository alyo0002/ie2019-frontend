import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import '../App.css';
import { getLoggedInUser } from '../helpers/authUtils';
import Loader from '../components/Loader';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import Graph from "../components/Graph";

class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser()
        };
        super(...arguments);


        this.arts = [
            { text: 'Artwork', id: '01' },
            { text: 'Abstract', id: '02' },
            { text: 'Modern Painting', id: '03' },
            { text: 'Ceramics', id: '04' },
            { text: 'Animation Art', id: '05' },
            { text: 'Oil Painting', id: '06' }
        ];
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                   <Row>
                        <Col lg={12}>
                            <Card style={{width:"100%", height:"500px"}}>
                                <CardBody>

                                        <Graph/>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                     <Row>
                        <Col lg={6}>
                            <Card style={{width:"100%", height:"400px"}}>
                                <CardBody>
                                    <div>
                                        <ListViewComponent id="list" dataSource={this.arts}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>


                         <Col lg={6}>
                             <Card style={{width:"100%", height:"400px"}}>
                                 <CardBody>
                                     This is Right Card
                                 </CardBody>
                             </Card>
                         </Col>
                    </Row>

                </div>
            </React.Fragment>
        )
    }
}


export default connect()(DefaultDashboard);