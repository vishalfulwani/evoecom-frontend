import Link from "next/link";

export default function Promotion() {
    return(
        <section className="py-4">
        <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                <div className="col">
                    <div className="card rounded-0">
                        <div className="row g-0 align-items-center">
                            <div className="col">
                                <img src="assets/images/promo/01.png" className="img-fluid" alt="" />
                            </div>
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title text-uppercase">Mens&apos; Wear</h5>
                                    <p className="card-text text-uppercase">Starting at $9</p> <Link href="/shop" className="btn btn-light btn-ecomm">SHOP NOW</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-0">
                        <div className="row g-0 align-items-center">
                            <div className="col">
                                <img src="assets/images/promo/02.png" className="img-fluid" alt="" />
                            </div>
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title text-uppercase">Womens&apos; Wear</h5>
                                    <p className="card-text text-uppercase">Starting at $9</p> <Link href="/shop" className="btn btn-light btn-ecomm">SHOP NOW</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-0">
                        <div className="row g-0 align-items-center">
                            <div className="col">
                                <img src="assets/images/promo/03.png" className="img-fluid" alt="" />
                            </div>
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title text-uppercase">Kids&apos; Wear</h5>
                                    <p className="card-text text-uppercase">Starting at $9</p> <Link href="/shop" className="btn btn-light btn-ecomm">SHOP NOW</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )}