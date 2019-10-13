import { DetailsView, FileManagerComponent, NavigationPane, Toolbar, Inject } from '@syncfusion/ej2-react-filemanager';
import * as React from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {matchPath} from 'react-router'


class PatientFile extends React.Component {
    id;
    constructor() {
        super(...arguments);
        const match = matchPath(this.props.history.location.pathname, {
            path: '/PatientFile/:Id',
            exact: true,
            strict: false
        });
        this.id = match;
        // this.hostUrl = "http://localhost:8090/" + this.id.params.Id;
        this.hostUrl = "http://localhost:8090/";

    }
    onSuccess(args) {
        console.log("Ajax request successful");
    }
    onFailure(args) {
        console.log("Ajax request has failed");
    }
    postSelectedHandler = ( Id ) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push( '/PatientProfile/' + Id );

    };

    render() {
        return (

            <div className="control-section">
                <FileManagerComponent id="file" view="Details"
                                      enablePersistence={true}
                                      allowDragAndDrop={true}
                                      allowMultiSelection={true}
                                      allowSearchOnTyping={true}
                                      ajaxSettings={{
                                          downloadUrl: this.hostUrl + 'Download',
                                          getImageUrl: this.hostUrl + "GetImage",
                                          uploadUrl: this.hostUrl + 'Upload',
                                          url: this.hostUrl + this.id.params.Id + "/"
                                      }} success={this.onSuccess.bind(this)} failure={this.onFailure.bind(this)} >
                    <Inject services={[NavigationPane, DetailsView, Toolbar]}/>

                </FileManagerComponent>
                <div className="text-right">
                    <br/>
                    <Button color="primary" className="button2 " tag={Link} onClick={() => this.postSelectedHandler(this.id.params.Id)} >Back</Button>
                </div>
            </div>
        );
    }
}

export default PatientFile;
