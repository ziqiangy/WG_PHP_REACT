class FetchTimeClockPaginationTesting extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            data: []
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
                this.setState({data: result[1].pagination_time_clock})
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
            <ul className="pagination justify-content-center">
                {this.state.data.map((ans,i)=>{
                    return(
                        <li className="page-item" key={i.toString()}><a className="page-link" href="#"  onClick={()=>this.handleClick(ans)}>{ans}</a></li>
                    )
                })}
            </ul>

        )
    }
}

ReactDOM.render(<FetchTimeClockPaginationTesting />, document.querySelector('#pagination_container_testing'));

