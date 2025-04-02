
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  { useRef } from 'react';

export default function Hero() {
  const sliderRef = useRef<Slider | null>(null);
  
  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2940&auto=format&fit=crop",
      title: "Fresh Produce",
      description: "Fresh fruits, vegetables, and crops from local farmers"
    },
   
    {
      image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Cash Crops",
      description: "Quality cocoa, coffee, and other export crops"
    },
    {
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2940&auto=format&fit=crop",
      title: "Farm Inputs",
      description: "Fertilizers, pesticides, and agricultural chemicals"
    },
    {
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2940&auto=format&fit=crop",
      title: "Livestock Feed",
      description: "Quality feed and supplements for all livestock"
    },
    {
      image: "https://images.pexels.com/photos/9507250/pexels-photo-9507250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&auto=format&fit=crop",
      title: "Farm Tools",
      description: "Hand tools, irrigation equipment, and farming implements"
    },
    {
      image: "https://images.unsplash.com/photo-1611518040286-9af8ba97ab46?q=80&w=2940&auto=format&fit=crop",
      title: "Quality Ingredients",
      description: "The best produce from local and global farmers"
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1695042864778-6d67ec3953e9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Processed Foods",
      description: "Value-added agricultural products and processed foods"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    className: "relative",
    dotsClass: "slick-dots absolute bottom-4",
    pauseOnHover: false,
    cssEase: "linear",
    fade: true,
    swipe: true,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index} className="relative">
            <div 
              className="w-full h-[500px] bg-cover bg-center"
              style={{
                backgroundImage: `url('${item.image}')`,
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black/30">
                <div className="container mx-auto h-full flex items-center">
                  <div className="max-w-lg text-white p-6">
                    <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
                    <p className="text-lg mb-6">{item.description}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}