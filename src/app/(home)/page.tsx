import { auth } from "@/auth";
import CartIcon from "@/components/icons/CartIcon";
import MainNavbar from "@/components/layout/Customer/MainNavbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/ui/Cards/CategoryCard";
import EmblaCarousel from "@/components/ui/Carousel/Carousel";
import Slider from "@/components/ui/Carousel/Slider";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import { Button } from "@nextui-org/button";
import { geTCartItems } from "@/lib/db/cart_item";
import Image from "next/image";
import { Link } from "@nextui-org/link";
import CartModal from "@/components/ui/modals/CustomerModal/CartModal";
import { CartItem } from "@/lib/types/CartItems";
export const dynamic = "force-dynamic";
export default async function Home() {
  const session = (await auth()) as any;
  const items: CartItem[] | null = session
    ? await geTCartItems(session?.user.staff_id)
    : null;
  console.log(items?.length ?? null);
  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <CartModal user_id={session?.user?.staff_id} items={items} />
        <MainNavbar total={items?.length ?? null} session={session} />
        <main>
          <EmblaCarousel />

          <section className="p-10 bg-white">
            <div className="flex items-center flex-wrap-reverse justify-center gap-28 ">
              <Image
                src="/images/illustration_1.jpg"
                alt="illustration"
                unoptimized={true}
                width={10}
                height={10}
                className="h-[430px] w-[430px] shrink-0"
              />
              <div className="flex gap-7 justify-center flex-col items-start">
                <h3 className="text-sm font-medium text-blue-500">
                  WELCOME TO MEDICOVI !
                </h3>
                <h2 className="max-w-md text-3xl font-medium">
                  Our Mission Provide Medical Equipment. In Order To Improve
                  People Healthcare.
                </h2>
                <p className="max-w-md text-sm ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor labore et dolore magna aliqua. Egestas dui
                  id ornare arcu odio ut. Neque aliquam vestibulum morbi blandit
                  cursus risus at. Duis at tellus at urna. Consequat ac felis
                  donec et odio.
                </p>
                <Link
                  href="/"
                  className="bg-blue-500 text-white p-3 rounded-md"
                >
                  <span>GET STARTED</span>
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-[#e8f3ff] p-5 lg:p-24">
            <div>
              <h1 className="text-2xl text-gray-800 font-bold">
                Shop By Categories
              </h1>
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-10 gap-4">
                <CategoryCard
                  Category="Medicine"
                  total={34}
                  image="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_categori_01.jpg"
                />{" "}
                <CategoryCard
                  Category="Medicine"
                  total={34}
                  image="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_categori_02.jpg"
                />
                <CategoryCard
                  Category="Medicine"
                  total={34}
                  image="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_categori_03.jpg"
                />
                <CategoryCard
                  Category="Medicine"
                  total={34}
                  image="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_categori_04.jpg"
                />
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 mt-4 gap-4">
                <CategoryCard
                  Category="Medicine"
                  total={34}
                  image="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_categori_05.jpg"
                />{" "}
                <CategoryCard
                  Category="Medicine"
                  total={34}
                  image="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_categori_06.jpg"
                />
                <CategoryCard
                  Category="Medicine"
                  total={34}
                  image="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_categori_07.jpg"
                />
              </div>
              <div className="grid grid-cols-3 mt-4 gap-4"></div>
            </div>
          </section>
          <section className="bg-white p-5 xl:p-28  pb-20">
            <div className="flex justify-center items-start gap-14 xl:gap-28 flex-wrap">
              <div className="relative overflow-hidden">
                <div className="absolute right-0 text-xl h-32 w-32 rounded-full bg-red-600 bg-opacity-80 text-center flex items-center justify-center text-white font-medium">
                  Sale
                  <br />
                  20%
                </div>
                <Image
                  src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_Bg_2.jpg"
                  alt="asd"
                  unoptimized={true}
                  width={10}
                  height={10}
                  className="w-[350px] xl:w-[520px] h-full"
                />
                <Image
                  src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_Bg_03.png"
                  alt="asd"
                  unoptimized={true}
                  width={10}
                  height={10}
                  className="absolute w-32 h-32 right-[-30px] bottom-0"
                />
              </div>
              <div className="flex flex-col gap-5">
                <small className="text-sm font-medium text-blue-500">
                  HOW CAN WE BE USEFUL FOR YOU?
                </small>
                <p className="max-w-sm text-xl ">
                  The Large, Backlit LCD Display Is Easy To Read At Home Or
                  While On The Go.
                </p>
                <span className="text-lg font-medium max-w-sm">
                  Our Goal Is To Help You Make The Treatment Process Fast And
                  Convenient.
                </span>

                <small className="max-w-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
                  eiusmod tempor incididuntut labore et dolore magna aliqua.
                  Egestas dui id ornare arcu odio ut. Neque aliquam vestibulum m
                  orbi blandit cursus risus at. Duis at tellus at urna.
                </small>
                <div>
                  <Button href="/shop" as={Link} color="primary">
                    View All Shop
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#e8f3ff] p-14">
            <div className="flex flex-col items-center gap-4">
              <small className="text-blue-500 font-medium text-sm">
                EVERYTHING YOU NEED!
              </small>
              <p className="text-2xl text-gray-800 max-w-sm text-center font-medium">
                Best Selling Product Trusted By Many People In The World
              </p>
            </div>

            <div className="grid  xl:grid-cols-3 mt-20 items-center justify-center gap-10">
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-4">
                  <span className="text-right">
                    Make tracking heart health over time as simple
                  </span>
                  <div className="bg-white h-24 w-24 shrink-0 rounded-full"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-right">
                    Make tracking heart health over time as simple
                  </span>
                  <div className="bg-white  h-24 w-24 shrink-0 rounded-full"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-right">
                    Make tracking heart health over time as simple
                  </span>
                  <div className="bg-white  h-24 w-24 shrink-0 rounded-full"></div>
                </div>
              </div>
              <div>
                <Image
                  src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_Bg_04.jpg"
                  unoptimized={true}
                  width={10}
                  height={10}
                  alt="d"
                  className="w-[450px] h-full rounded-full"
                />
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-4">
                  <div className="bg-white h-24 w-24 shrink-0 rounded-full"></div>
                  <span className="text-left">
                    Make tracking heart health over time as simple
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white  h-24 w-24 shrink-0 rounded-full"></div>
                  <span className="text-left">
                    Make tracking heart health over time as simple
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white  h-24 w-24 shrink-0 rounded-full"></div>
                  <span className="text-left">
                    Make tracking heart health over time as simple
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-5 xl:p-20">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-medium">Featured Products</h1>
              <Link href="/">
                <span className="text-slate-600 font-medium">View All</span>
              </Link>
            </div>
            <div>
              <Slider
                slides={Array.from(Array(10).keys())}
                options={{ slidesToScroll: "auto" }}
              />
            </div>
          </section>

          <section className="bg-[#e8f3ff] p-10 xl:p-20 xl:py-8">
            <div className="flex xl:justify-between gap-8 flex-wrap">
              <div className="flex items-start gap-3">
                <CartIcon className="w-7 h-7" total={null} />
                <div>
                  <h2 className="font-medium">Store Location</h2>
                  <p className="max-w-[220px] tex-sm">
                    Sanciangko St, Cebu City, 6000 Cebu
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CartIcon className="w-7 h-7" total={null} />
                <div>
                  <h2 className="font-medium">Call us free:</h2>
                  <p className="max-w-[220px] tex-sm">0123 666 999</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CartIcon className="w-7 h-7" total={null} />
                <div>
                  <h2 className="font-medium">Email:</h2>
                  <p className="max-w-[220px] tex-sm">contact@sitename.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CartIcon className="w-7 h-7" total={null} />
                <div>
                  <h2 className="font-medium">Your Question</h2>
                  <p className="max-w-[220px] tex-sm">FAQs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CartIcon className="w-7 h-7" total={null} />
                <div>
                  <h2 className="font-medium">Join Us On</h2>
                  <p className="max-w-[220px] tex-sm">FAQs</p>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
