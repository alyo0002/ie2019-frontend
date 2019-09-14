import { DetailsView, FileManagerComponent, NavigationPane, Toolbar, Inject } from '@syncfusion/ej2-react-filemanager';
import * as React from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

class PatientFile extends React.Component {
    constructor() {
        super(...arguments);
        this.hostUrl = "https://ej2services.syncfusion.com/production/web-services/";
    }
    onSuccess(args) {
        console.log("Ajax request successful");
    }
    onFailure(args) {
        console.log("Ajax request has failed");
    }
    render() {
        return (

        <div className="control-section">
            <FileManagerComponent id="file" view="Details"
                enablePersistence={true}
                allowDragAndDrop={true}
                allowMultiSelection={true}
                allowSearchOnTyping={true}
                ajaxSettings={{
                downloadUrl: this.hostUrl + 'api/FileManager/Download',
                getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                url: this.hostUrl + "api/FileManager/FileOperations"
            }} success={this.onSuccess.bind(this)} failure={this.onFailure.bind(this)} >
                <Inject services={[NavigationPane, DetailsView, Toolbar]}/>

            </FileManagerComponent>
            <div className="text-right">
                <br/>
                <Button color="primary" className="button2 " tag={Link} to="/PatientProfile">Back</Button>
            </div>
        </div>
        );
    }
}

export default PatientFile;