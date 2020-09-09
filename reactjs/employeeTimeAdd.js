class EmployeeTimeAdd extends React.Component {
    render(){
        return(
            <form className="d-inline">
                <div className="form-row">
                    <div className="col-auto">
                        <label htmlFor="ptr_starting_date">Job</label>
                        <select className="form-control" name="" id=""></select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_ending_date">Employee</label>
                        <select className="form-control" name="" id=""></select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_worker">Line Item</label>
                        <select className="form-control" name="" id=""></select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_job">Time Worked (HH:MM)</label>
                        <select className="form-control" name="" id=""></select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_job">Date</label>
                        <input type="text" className="form-control" name="ptr_starting_date" id="ptr_starting_date"/>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_job">Assign To</label>
                        <select className="form-control" name="" id=""></select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="ptr_job">NOtes</label>
                        <select className="form-control" name="" id=""></select>
                    </div>
                    <div className="col-auto my-auto">
                        <input className="btn btn-outline-primary" type="submit" value="List" />
                    </div>
                </div>
            </form>
        )
    }
}

ReactDOM.render(<EmployeeTimeAdd />, document.querySelector("#root"))