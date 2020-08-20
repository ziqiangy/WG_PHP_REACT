class FetchTimeClockPagination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            requestOptions : {
                method: 'POST',
                redirect: 'follow'
            }
        }
    }
    componentDidMount(){
        fetch("../php-api/timeClockPagination.php", this.state.requestOptions)
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
    render(){
        return <li className="page-item"><a className="page-link" href="#">{this.props.name}</a></li>;
    }
}


ReactDOM.render(<FetchTimeClockPagination />, document.querySelector('#pagination_container'));

