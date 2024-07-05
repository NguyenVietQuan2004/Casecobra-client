"use client";
import { Button } from "~/components/ui/button";
import Navbar from "~/components/NavBar";
import Footer from "~/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "~/components/ui/card";
import Modal from "~/components/Modal";

const list2 = [
  "House",
  "Cabin",
  "Villa",
  "Cottage",
  "Condo/Apartment",
  "House",
  "Cabin",
  "Villa",
  "Cottage",
  "Condo/Apartment",
];

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <Navbar />
        <div className="relative">
          <Modal className="" />
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="h-[calc(100vh-56px)]">
              <CarouselItem className="h-full pl-0">
                <img className="object-cover h-full w-full" alt="dasds" src="/concu.png" />
              </CarouselItem>
              <CarouselItem className="h-full pl-0">
                <img className="object-cover h-full w-full" alt="dasds" src="/concu.png" />
              </CarouselItem>
              <CarouselItem className="h-full pl-0">
                <img className="object-cover h-full w-full" alt="dasds" src="/concu.png" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 grainy-dark py-24 pb-6">
        <div className=" px-0 md:px-[60px] lg:px-[120px] xl:px-[140px]  ">
          <h2 className="ml-3 font-semibold text-xl sm:text-3xl mb-4">Discover your new favorite stay</h2>

          <Carousel
            className="w-full -ml-3"
            opts={{
              align: "start",
              loop: true,
            }}
            // plugins={[
            //   Autoplay({
            //     delay: 2000,
            //   }),
            // ]}
          >
            <CarouselContent className="-ml-1 ">
              {list2.map((value, index) => (
                <CarouselItem
                  key={index}
                  className="pl-6 basis-[100%]  relative  sm:basis-1/2  md:basis-1/3 lg:basis-1/4 xl:basis-1/5  "
                >
                  <div className="">
                    <Card className="rounded-2xl overflow-hidden">
                      <CardContent
                        style={{ aspectRatio: 3 / 4 }}
                        className="flex aspect-square items-center justify-center p-0"
                      >
                        <img alt="" src="/concu.png" className=" h-full w-full" />
                      </CardContent>
                    </Card>
                  </div>
                  <div className=" text-white font-bold absolute z-[50] bottom-2 left-10">{value}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[40px]" />
            <CarouselNext className="right-[20px]" />
          </Carousel>
        </div>

        {/* <div className="pt-16">
            <Reviews />
          </div> */}
      </section>
      <section className="bg-slate-100 pt-10 grainy-dark ">
        <div className=" px-0 sm:px-10 ">
          <h2 className="ml-3 font-semibold text-xl sm:text-3xl mb-4">Explore these unique stays</h2>

          <Carousel
            className="w-full -ml-3"
            opts={{
              align: "start",
              loop: true,
            }}
            // plugins={[
            //   Autoplay({
            //     delay: 2000,
            //   }),
            // ]}
          >
            <CarouselContent className="-ml-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="pl-6  lg:basis-1/4">
                  <div className="">
                    <Card className="">
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <img alt="" src="/concu.png" className="rounded-xl h-full w-full" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[40px]" />
            <CarouselNext className="right-[40px]" />
          </Carousel>
        </div>

        {/* <div className="pt-16">
            <Reviews />
          </div> */}
      </section>

      <Footer />
    </div>
  );
}
