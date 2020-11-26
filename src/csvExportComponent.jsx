import React from 'react';
import { CSVLink } from "react-csv";

class ExportCSV extends React.Component {
    constructor(props) {
        super();
        this.data = props.CSVdata;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.CSVdata !== prevProps.CSVdata){
            this.setState(this.data = this.props.CSVdata)
        }
    }

    render() {
        return (
            <div>
                <CSVLink data={this.data}>Download me</CSVLink>;
            </div>
        );
    }
}

export default ExportCSV;