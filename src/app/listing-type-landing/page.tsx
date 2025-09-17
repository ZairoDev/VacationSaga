import React from "react";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionSubscribe2 from "@/components/SectionSubscribe2";

type CardProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

const Categories: CardProps[] = [
  {
    title: "Control Booking",
    subtitle: "15,600+ properties",
    imageUrl:
      "https://images.pexels.com/photos/28238364/pexels-photo-28238364.jpeg",
  },
  {
    title: "Control Pricing",
    subtitle: "6,000+ properties",
    imageUrl:
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
  },
  {
    title: "Control Uday Bhai Control",
    subtitle: "1,000+ properties",
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR6_Fyu0MM7H34HdtLhl_JWFv2IavnXYvlNQ&s"  },
  {
    title: "Control Guest",
    subtitle: "1,000+ properties",
    imageUrl:
      "https://images.pexels.com/photos/1168940/pexels-photo-1168940.jpeg",
  },
];

function Page2() {
  return (
    <main className="nc-PageHome2 relative overflow-hidden">
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="relative">
          <div className="w-full aspect-[16/9]">
            <img
              className="w-full h-full object-cover"
              src="https://chisfis-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2303781%2Fpexels-photo-2303781.jpeg&w=1920&q=75"
              alt="travel bus"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center  space-y-6">
              <h3 className="text-2xl font-semibold">
                Some subheading in the top
              </h3>
              <h1 className="text-4xl font-bold">
                New Generation of Hotel Listing
              </h1>
              <button className="px-6 py-3 bg-black text-white text-lg rounded hover:bg-neutral-800 transition">
                Start Booking
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
            {/* First Column - Single Card */}
            <div className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 rounded-lg">
              <div className="relative h-full">
                <img
                  src={Categories[0].imageUrl || "/placeholder.svg"}
                  alt={Categories[0].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-2xl font-bold mb-2">
                    {Categories[0].title}
                  </p>
                  <p className="text-gray-200 text-lg">
                    {Categories[0].subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Second Column - Two Stacked Cards */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 rounded-lg">
                <div className="relative h-full">
                  <img
                    src={Categories[1].imageUrl || "/placeholder.svg"}
                    alt={Categories[1].title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-lg font-bold mb-1">
                      {Categories[1].title}
                    </p>
                    <p className="text-gray-200 text-sm">
                      {Categories[1].subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 rounded-lg">
                <div className="relative h-full">
                  <img
                    src={Categories[2].imageUrl || "/placeholder.svg"}
                    alt={Categories[2].title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-lg font-bold mb-1">
                      {Categories[2].title}
                    </p>
                    <p className="text-gray-200 text-sm">
                      {Categories[2].subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Column - Single Card */}
            <div className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 rounded-lg">
              <div className="relative h-full ">
                <img
                  src={Categories[3].imageUrl || "/placeholder.svg"}
                  alt={Categories[3].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-2xl font-bold mb-2">
                    {Categories[3].title}
                  </p>
                  <p className="text-gray-200 text-lg">
                    {Categories[3].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-16">
          <BackgroundSection className="bg-neutral-100 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox boxCard="box2" />
        </div>


        <div className="bg-neutral-900 text-white py-10 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl">
      
      {/* Phone Mockup */}
      <div className="w-60 h-[500px] bg-blue rounded-3xl overflow-hidden shadow-lg">
        <img
          src="https://help.apple.com/assets/67EAFA00341984D9AE00EC98/67EAFA0586243791BA0154F5/en_US/60276e18687420358d1af24535fe0c3a.png"
          alt="Vacation Saga App"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text + Buttons */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <h2 className="text-3xl font-bold">Download our app<br />Vacation Saga</h2>
        <p className="text-neutral-300 text-lg">Book your dream stay anytime, anywhere.</p>
        <div className="flex gap-4">
          {/* Play Store Button */}
          <a href="#" className="bg-black flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg hover:bg-neutral-800 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>

          {/* App Store Button */}
          <a href="#" className="bg-black flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg hover:bg-neutral-800 transition">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-10"
            />
          </a>
        </div>
      </div>
    </div>

    <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default Page2;
