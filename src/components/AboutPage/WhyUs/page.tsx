const WhyUs = () => {

    return (

        <section className="py-4">
            <div className="container">
                <h4>Why Choose Us</h4>
                <hr />
                <div className="row row-cols-1 row-cols-lg-3">
                    <div className="col d-flex">
                        <div className="card rounded-0 shadow-none w-100">
                            <div className="card-body">
                                <img src="assets/images/icons/delivery.png" width="60" alt="" />
                                <h5 className="my-3">FREE SHIPPING</h5>
                                {/* <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr in some form.</p> */}
                                <p className="mb-0">Get free shipping on select products! Shop now and enjoy fast, hassle-free delivery on eligible items.</p>

                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card rounded-0 shadow-none w-100">
                            <div className="card-body">
                                <img src="assets/images/icons/money-bag.png" width="60" alt="" />
                                <h5 className="my-3">100% MONEY BACK GUARANTEE</h5>
                                {/* <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr in some form.</p> */}
                                <p className="mb-0">Shop with confidence! We offer a 100% money-back guarantee on all eligible returns—your satisfaction is our priority.</p>

                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card rounded-0 shadow-none w-100">
                            <div className="card-body">
                                <img src="assets/images/icons/support.png" width="60" alt="" />
                                <h5 className="my-3">ONLINE SUPPORT 24/7</h5>
                                {/* <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr in some form.</p> */}
                                <p className="mb-0">Need help? Our team is available 24/7 to assist you with any questions or concerns. Contact us anytime!</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default WhyUs
