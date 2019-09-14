import * as React from 'react';
import '../../App.css';
import {Button} from "react-bootstrap";
import { DocumentEditorComponent, SfdtExport,WordExport, Selection, Editor,Toolbar,EditorHistory } from '@syncfusion/ej2-react-documenteditor';
DocumentEditorComponent.Inject(SfdtExport,WordExport, Selection, Editor,Toolbar,EditorHistory);


class Reports extends React.Component {
    save() {
        let proxy = this;
        proxy.documenteditor.save('sample', 'Docx');
    }
    render() {
        return (<div>
            <div className="text-right"  style={{height: "50px", background: "#70B7F9"}}>
                <Button  color="primary" onClick={this.save.bind(this)}>Save</Button>
            </div>
            <DocumentEditorComponent id="container" ref={(scope) => { this.documenteditor = scope; }}
                                     isReadOnly={false}
                                     enableSelection={true}
                                     enableEditor={true}
                                     enableWordExport={true}
                                     enableEditorHistory={true}
                                     style={{'height': '550px'}}

            />
        </div>);
    }
}

export default Reports