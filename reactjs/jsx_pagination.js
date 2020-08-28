class FetchTimeClockPagination extends React.Component{
    constructor(props){
        super(props);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("pageAt", props.page);

        this.state = {
            data: [],
            requestOptions : {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            }
        }
    }
    componentDidMount(){
        fetch("../php/timeClockPagination.php", this.state.requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result[1].pagination_time_clock)
                this.setState({data: result[1].pagination_time_clock})
            })
            .catch(error => console.log('error', error));
    }
    render(){
        return(
            <div>
                <Pagination name={this.state.data} />
            </div>
        )
    }
}





class Pagination extends React.Component {
    render(){
        return(
            <ul className="pagination justify-content-center">
                <PaginationElement name = {"<<"} />
                {this.props.name.map((ans,i)=>{
                    return(<PaginationElement key={i.toString()} name = {ans} />)
                })}
                <PaginationElement name = {">>"} />
            </ul>
        )
    }
}

class PaginationElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:this.props.name
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick(data) {
        // console.log(data);
        clickFunc(data)
        // ReactDOM.render(<FetchTimeClockPagination page={data} />, document.querySelector('#pagination_container'));
    }

    render(){
        return <li className="page-item"><a className="page-link" href="#" onClick={()=>this.handleClick(this.state.page)}>{this.state.page}</a></li>;
    }
}

function clickFunc(data){
    ReactDOM.render(<FetchTimeClockPagination page={data} />, document.querySelector('#pagination_container'));
}

ReactDOM.render(<FetchTimeClockPagination page={76} />, document.querySelector('#pagination_container'));

