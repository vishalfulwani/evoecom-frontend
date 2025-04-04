import Link from "next/link"

const CheckoutBreadCrumb = () => {

    return (

        <section className="py-3 border-bottom d-none d-md-flex">
					<div className="container">
						<div className="page-breadcrumb d-flex align-items-center">
							<h3 className="breadcrumb-title pe-3">Checkout</h3>
							<div className="ms-auto">
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb mb-0 p-0">
										<li className="breadcrumb-item"><Link href="/"><i className="bx bx-home-alt"></i> Home</Link>
										</li>
										<li className="breadcrumb-item"><Link href="/shop">Shop</Link>
										</li>
										<li className="breadcrumb-item active" aria-current="page">Checkout</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</section> 

    )
}
export default CheckoutBreadCrumb
