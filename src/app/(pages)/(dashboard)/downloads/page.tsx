'use client'


const Page = ()=>{

    return(
        <div className="card shadow-none mb-0">
        <div className="card-body">
            <div className="table-responsive">
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>Product</th>
                            <th>Downloads Remaining</th>
                            <th>Expires</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Stock Moview Clip</td>
                            <td>12</td>
                            <td>Novermber 15, 2021</td>
                            <td>
                                <div className="d-flex gap-2">	<a href=";" className="btn btn-light btn-sm rounded-0">Movie Clip 1</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Stock Moview Clip</td>
                            <td>08</td>
                            <td>Novermber 12, 2021</td>
                            <td>
                                <div className="d-flex gap-2"> <a href=";" className="btn btn-light btn-sm rounded-0">Movie Clip 2</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}
export default Page
