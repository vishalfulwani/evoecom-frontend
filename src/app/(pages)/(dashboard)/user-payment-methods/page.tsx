'use client'


const Page = ()=>{

    return(
        <div className="card shadow-none mb-0">
        <div className="card-body">
            <div className="table-responsive">
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>Method</th>
                            <th>Expires</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Visa ending in 1111</td>
                            <td>11/12</td>
                            <td>
                                <div className="d-flex gap-2">	<a href=";" className="btn btn-light btn-sm rounded-0">Delete</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Visa ending in 4242</td>
                            <td>11/12</td>
                            <td>
                                <div className="d-flex gap-2"> <a href=";" className="btn btn-light btn-sm rounded-0">Delete</a>
                                    <a href=";" className="btn btn-light btn-sm rounded-0">Make Default</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> <a href=";" className="btn btn-light rounded-0">Add Payment Method</a>
        </div>
    </div>
    )
}
export default Page
