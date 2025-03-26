"use client"

import AboutStory from "@/components/AboutPage/AboutStory/page"
import Brands from "@/components/AboutPage/Brands/page"
import WhyUs from "@/components/AboutPage/WhyUs/page"
import Link from "next/link"

const Page = () => {

	return (

		<div className="page-wrapper1">
			<div className="page-content">
				<section className="py-3 border-bottom d-none d-md-flex">
					<div className="container">
						<div className="page-breadcrumb d-flex align-items-center">
							<h3 className="breadcrumb-title pe-3">About Us</h3>
							<div className="ms-auto">
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb mb-0 p-0">
										<li className="breadcrumb-item"><Link href="/"><i className="bx bx-home-alt"></i> Home</Link>
										</li>
										<li className="breadcrumb-item active" aria-current="page">About Us</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</section>
				<AboutStory />
				<WhyUs />
				<Brands/>
			</div>
		</div>

	)
}
export default Page
