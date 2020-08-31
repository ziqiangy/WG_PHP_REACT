class Form extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <form className="d-inline">
                <div className="form-row">
                    <div className="col-auto">
                        <label htmlFor="ptr_starting_date">Starting Date:</label>
                        <input type="text" className="form-control" name="ptr_starting_date" id="ptr_starting_date"/>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_ending_date">Ending Date:</label>
                        <input type="text" className="form-control" name="ptr_ending_date" id="ptr_ending_date" />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_worker">Worker:</label>
                        <select className="form-control" name="ptr_worker" id=""></select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_job">Job:</label>
                        <select className="form-control" name="ptr_job" id=""></select>
                    </div>
                    <div className="col-auto my-auto">
                        <input className="btn btn-outline-primary" type="submit" value="List" />
                    </div>
                </div>
            </form>
        )
    }
}

ReactDOM.render(<Form />,document.querySelector("#formReact"))


