import { useForm } from "react-hook-form";
import { styles } from "../../styles";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import Button from "../../ui/Button";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

function Contact() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SK,
        "template_whgn1qi",
        data,
        "Xsuj6vjDQU8xX9DS7"
      )
      .then(
        function (response) {
          toast.success("Message Sent Successfully");
          reset();
        },
        function (errord) {
          toast.error("Something Went Wrong");
        }
      );
  }
  return (
    <div className={`${styles.container} py-10`}>
      <h1 className="text-4xl md:text5xl  font-bold text-center mb-14">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-[1.5fr,2fr] shadow-2xl rounded-xl py-16 px-6">
        <div className="bg-primary text-white py-8 px-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12">
            Get in Touch
          </h2>
          <p className="text-base md:text-xl mb-6">
            Contact us for personalized assistance, inquiries, or feedback. Our
            dedicated team is ready to address your concerns promptly. Reach out
            through the provided channels, and let's connect today!
          </p>
          <p className="text-sm md:text-base flex gap-2 ">
            <FaMapMarkerAlt /> 350 Boxley Ave,Louisville
          </p>
          <p className="text-sm md:text-base  flex gap-2 my-4">
            {" "}
            <IoMdPhonePortrait /> +1 (344) 132-3434-34
          </p>
          <p className="text-sm md:text-base  flex gap-2">
            <IoMail /> support@smarteyeapps.com
          </p>
        </div>
        <div className="p-5">
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                className=" py-3 border ring-1 ring-inset w-full ring-gray-300 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none"
                type="text"
                placeholder="Enter Full Name"
                {...register("user_name", {
                  required: "Name Is Required",
                })}
              />
              {errors.user_name && (
                <p className="text-xs text-red">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                className=" py-3 border ring-1 ring-inset w-full ring-gray-300 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none"
                type="text"
                placeholder="Enter Mobile Number"
                {...register("phone", {
                  required: "Phone Is Required",
                })}
              />
              {errors.phone && (
                <p className="text-xs text-red">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <input
                className=" py-3 border ring-1 ring-inset w-full ring-gray-300 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none"
                type="text"
                placeholder="Enter Email Address"
                {...register("user_email", {
                  required: "Name Is Required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please Enter A Valid Email Address",
                  },
                })}
              />
              {errors.user_email && (
                <p className="text-xs text-red">{errors.user_email.message}</p>
              )}
            </div>
            <div>
              <input
                className=" py-3 w-full border ring-1 ring-inset ring-gray-300 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none"
                type="text"
                placeholder="Enter Subject"
                {...register("subject", {
                  required: "Subject Is Required",
                })}
              />
              {errors.subject && (
                <p className="text-xs text-red">{errors.subject.message}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Enter Your Message"
                className=" py-3 border resize-none w-full h-32 ring-1 ring-inset ring-gray-300 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none"
                {...register("message", {
                  required: "message Is Required",
                  minLength: {
                    value: 20,
                    message: "Message Must Be At Least 20 Characters",
                  },
                })}
              ></textarea>
              {errors.message && (
                <p className="text-xs text-red">{errors.message.message}</p>
              )}
            </div>
            <Button buttonType="admin" buttonStyle="w-fit ">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
