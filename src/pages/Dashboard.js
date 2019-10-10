import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import '../App.css';
import { getLoggedInUser } from '../helpers/authUtils';
import Loader from '../components/Loader';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';


import Graph from "../components/Graph";
import Chart from "../components/Chart";
import {Link} from "react-router-dom";
import axios from "axios";


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

    refreshLogBoxPatients = () =>  {axios.get('http://localhost:4000/patient/listUpdate')
        .then(response => {
            console.log(response);
        });};

    render() {
       /* let x :any[] = [ {x:1,y:1}];
        let chart: Chart = new Chart({
            series:[{
                dataSource: x,
                xName: 'x', yName: 'y',
                // Series type as bar series
                type: 'Bar'
            }],

        }, '#Graph');*/

        return (
            <React.Fragment>
                <div>
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                   <Row>
                        <Col lg={12}>
                            <Card style={{width:"100%", height:"500px"}}>
                                <CardBody>

                                <Chart/>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                     <Row>
                        <Col lg={6}>
                            <Card style={{width:"100%", height:"400px"}}>
                                <CardBody>
                                    <div>
                                        <Button color="primary" className="button1" tag={Link}
                                                onClick={() => this.refreshLogBoxPatients()}>Sync With LogBox</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>


                         <Col lg={6}>
                             <Card style={{width:"100%", height:"400px"}}>
                                 <CardBody>

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
