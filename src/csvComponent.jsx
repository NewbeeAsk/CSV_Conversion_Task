import React from 'react';
import Papa from 'papaparse';
import ExportCSV from "./csvExportComponent";

class FileReader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined,
            data: [{}]
        };
        this.updateData = this.updateData.bind(this);
    }

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    importCSV = () => {
        const {csvfile} = this.state;
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
    };

    groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    newCSV = () => {
        let refCSV = this.groupBy(this.state.data, obj => obj.Date)
        let dates = [...refCSV.keys()];
        let workers = [...new Set(this.state.data.map(el => el['Employee Name']))]
        let resultArray = [];
        workers.forEach(el => {
            debugger
            const obj = {"Name/Date": el}
            dates.forEach(date => {
                let group = refCSV.get(date);
                let worker = group.find(o => o['Employee Name'] == el);
                if (worker !== undefined) {
                    obj[date] = worker['Work Hours']
                } else {
                    obj[date] = null;
                }
            })
            resultArray.push(obj);
        })
        this.setState({
            data: resultArray
        });
    }


    updateData(result) {
        if (result !== 0)
            this.setState({
                data: result.data
            });
        console.log(result.data)
        this.newCSV();
    }

    render() {
        return (
            <div className="App">
                <h2>Import CSV File!</h2>
                <input
                    className="csv-input"
                    type="file"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p/>
                <button onClick={this.importCSV}> Upload now!</button>
                <ExportCSV CSVdata={this.state.data}/>
            </div>
        );
    }
}

export default FileReader;