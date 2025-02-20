
import React, { useEffect } from 'react';
import Slider from 'react-slick';

// Slick Slider settings
const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

export default function News() {
    return (
        <section className="py-4">
            <div className="container">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase mb-0">Latest News</h5>
                    <a href="/blog" className="btn btn-light ms-auto rounded-0">
                        View All News
                        <i className="bx bx-chevron-right"></i>
                    </a>
                </div>
                <hr />
                <div className="product-grid">
                    <Slider {...sliderSettings}>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="item">
                                <div className="card rounded-0 product-card border">
                                    <div className="news-date">
                                        <div className="date-number">24</div>
                                        <div className="date-month">FEB</div>
                                    </div>
                                    <a href="#">
                                        <img
                                            src={`assets/images/blogs/0${index + 1}.png`}
                                            className="card-img-top border-bottom bg-dark-1"
                                            alt="..."
                                        />
                                    </a>
                                    <div className="card-body">
                                        <div className="news-title">
                                            <a href="#">
                                                <h5 className="mb-3 text-capitalize">Blog Short Title</h5>
                                            </a>
                                        </div>
                                        <p className="news-content mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean...
                                        </p>
                                    </div>
                                    <div className="card-footer border-top">
                                        <a href="#">
                                            <p className="mb-0">
                                                <small className="text-white">0 Comments</small>
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
