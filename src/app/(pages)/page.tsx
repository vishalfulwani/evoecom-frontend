'use client'
import AdvertiseBanner from "@/components/HomePage/AdvertiseBanner/page";
import BottomProducts from "@/components/HomePage/BottomProducts/page";
import Brands from "@/components/HomePage/Brands/page";
import Categories from "@/components/HomePage/Categories/page";
import Featured from "@/components/HomePage/Featured/page";
import HomeInfo from "@/components/HomePage/HomeInfo/page";
import HomePageBanner from "@/components/HomePage/HomePageSlider/page";
import NewArrival from "@/components/HomePage/NewArrival/page";
import News from "@/components/HomePage/News/page";
import Promotion from "@/components/HomePage/Promotion/page";
import SupportInfo from "@/components/HomePage/SupportInfo/page";
import AddReview from "@/components/ReviewCard/page";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Home Page Content */}
      <HomePageBanner />

      <div className="page-wrapper">
        <div className="page-content">
          <HomeInfo />
          <Promotion />
          <Featured />
          <NewArrival />
          <AdvertiseBanner />
          <Categories />
          <SupportInfo />
          <News />
          <Brands />
          <BottomProducts />
        </div>
      </div>
    </div>
  );
}
