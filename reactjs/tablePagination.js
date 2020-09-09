class FetchTimeClockPaginationTesting extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            header: ['Job','Name','Date','Hours','Reg/OT','Cost Code'],
            index: ['Job','Name','Date','Hours','Reg_OT','Cost_Code'],
            pageData: [],
            tableData: []
        }
    }

    fetchPagination(data){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("pageAt", data);

        let options = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        }

        fetch("../php/timeClockPagination.php", options)
            .then(response => response.json())
            .then(result => {
                // console.log(result[1].pagination_time_clock)
                this.setState({tableData: result[0].data_time_clock})
                this.setState({pageData: result[1].pagination_time_clock})
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount(){
        this.fetchPagination(1)
    }

    handleClick(data) {
        this.fetchPagination(data)
    }

    render(){
        return(
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        {this.state.header.map((ans,i)=>
                            <th scope="col" key={i.toString()}>{ans}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tableData.map((row,i)=>{
                        // console.log(row.Name);
                        return(
                            <tr key={i.toString()}>
                                {this.state.index.map((item,i)=>{
                                    return(
                                        <td key={i.toString()}>{row[item]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <ul className="pagination justify-content-center">
                    {this.state.pageData.map((ans,i)=>{
                        return(
                            <li className="page-item" key={i.toString()}><a className="page-link" href="#"  onClick={()=>this.handleClick(ans)}>{ans}</a></li>
                        )
                    })}
                </ul>
            </div>

        )
    }
}

ReactDOM.render(<FetchTimeClockPaginationTesting />, document.querySelector('#tablePagination'));

