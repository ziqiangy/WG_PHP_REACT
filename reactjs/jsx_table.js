class FetchTimeClockTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            header: ['Job','Name','Date','Hours','Reg/OT','Cost Code'],
            index: ['Job','Name','Date','Hours','Reg_OT','Cost_Code'],
            requestOptions : {
                method: 'POST',
                redirect: 'follow'
            }
        }
    }
    componentDidMount(){
        fetch("../php/timeClockPagination.php", this.state.requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result[0].data_time_clock)
                this.setState({data: result[0].data_time_clock})
            })
            .catch(error => console.log('error', error));
    }
    render(){
        return(
            <div>
                <Table name={this.state} />
            </div>
        )
    }
}

class Table extends React.Component {
    render(){
        return(
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        {this.props.name.header.map((ans,i)=>
                            <th scope="col" key={i.toString()}>{ans}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                {this.props.name.data.map((row,i)=>{
                    // console.log(row.Name);
                    return(
                        <tr key={i.toString()}>
                            {this.props.name.index.map((item,i)=>{
                                return(
                                    <td key={i.toString()}>{row[item]}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}

// ReactDOM.render(<Table />, document.querySelector("#table_container"))
ReactDOM.render(<FetchTimeClockTable />, document.querySelector("#table_container"))