import aboutImg from "../../assets/about.jpg";
import aboutback from "../../assets/aboutback.jpg";
import { styles } from "../../styles";
function AboutUs() {
  return (
    <div className="bg-slate-100 relative" id="aboutUs">
      <img
        src={aboutback}
        alt="aboutback"
        className=" top-0 left-0 w-full absolute h-full object-cover"
      />
      <div className={`${styles.container}  py-10 min-h-screen`}>
        <div id="customGlass" className=" mt-12 p-5  rounded-lg">
          <h1 className="text-4xl md:text5xl  border-b-4 text-white  pb-6 border-white font-bold text-center">
            About Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center mt-12">
            <p className=" font-semibold leading-8 text-grey-200 text-justify">
              LOGANCEE is a cutting-edge ecommerce platform that seamlessly
              blends sophistication with user-friendly design, creating a
              virtual shopping experience that transcends conventional
              boundaries. Boasting a sleek and intuitive interface, LOGANCEE
              empowers both merchants and shoppers by providing a robust and
              flexible online marketplace. Whether you're a seasoned business
              owner or an eager consumer, LOGANCEE's innovative features cater
              to diverse needs, offering a seamless navigation experience,
              secure transactions, and a visually stunning showcase of products.
              With its commitment to elevating the digital shopping landscape,
              LOGANCEE emerges as a beacon of efficiency, style, and reliability
              in the ever-evolving world of ecommerce. Established with a
              visionary outlook, LOGANCEE has roots that delve into the
              evolution of online commerce. Founded with a commitment to
              revolutionize the digital shopping landscape, LOGANCEE draws
              inspiration from the historical milestones of ecommerce. The
              platform's journey is a testament to the dynamic nature of online
              business, adapting and innovating to meet the changing needs of a
              global market. From its inception, LOGANCEE has embraced
              technological advancements, combining them with a deep
              understanding of user behavior to shape a platform that not only
              meets but exceeds expectations. As we embrace the future,
              LOGANCEE's rich history serves as a foundation for the continuous
              pursuit of excellence in ecommerce.
            </p>
            <img src={aboutImg} alt="about" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
