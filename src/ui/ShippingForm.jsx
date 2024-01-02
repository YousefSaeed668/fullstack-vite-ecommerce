import { useForm } from "react-hook-form";
import Button from "./Button";
import { useSetUserAddress } from "../features/checkout/useSetUserAddress";

const inputs = [
  {
    label: "First Name",
    name: "firstName",
    required: "Please Enter Your First Name",
    match: /^[a-z ,.'-]+$/i,
  },
  {
    label: "Last Name",
    name: "lastName",
    match: /^[a-z ,.'-]+$/i,
    required: "Please Enter Your Last Name",
  },
  {
    label: "Address Line 1",
    name: "addressLine1",
    required: "Please Enter Your Address Line 1",
  },
  {
    label: "Address Line 2",
    name: "addressLine2",
  },
  {
    label: "Zip Code",
    name: "zipCode",
    required: "Please Enter Your Zip Code",
    match: /^\d{1,10}$/,
  },
  {
    label: "City",
    name: "city",
    required: "Please Enter Your City",
    match: /^[a-zA-Z]{1,28}$/,
  },
  {
    label: "Mobile Phone",
    name: "mobilePhone",
    required: "Please Enter Your Mobile Phone Number",
    match: /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/,
  },
];
function ShippingForm({ userID, address, type }) {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: address,
  });

  const { isPending, setUserAddress } = useSetUserAddress(type);
  const { errors } = formState;

  function onSubmit(data) {
    setUserAddress({
      userID,
      ...data,
    });
  }
  if (isPending) return <div>Loading...</div>;
  function onError(error) {}
  return (
    <div
      className={`px-4 py-12 border rounded-lg flex-1 ${
        type === "update" ? "bg-white mt-8" : ""
      }`}
    >
      <h1 className="text-3xl font-medium mb-5">Shipping Address</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col mb-3">
          <label htmlFor="emailAddress">
            Email Address
            <span className="text-red"> *</span>
          </label>
          <input
            className="border-2 border-gray-200 py-2 pl-1 rounded-md"
            type="text"
            id="emailAddress"
            {...register("email", {
              required: "Please Enter A Valid Email Address",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please Enter A Valid Email Address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {inputs.map((input, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={input.label}>
                {input.label}
                {input.required && <span className="text-red"> *</span>}
              </label>
              <input
                className="border-2 border-gray-200 py-2 pl-1 rounded-md"
                type="text"
                id={input.label}
                {...register(input.name, {
                  required: input.required,
                  maxLength: {
                    value: 30,
                    message: `Please Enter A Valid ${input.label}`,
                  },
                  pattern: {
                    value: input.match,
                    message: `Please Enter A Valid ${input.label}`,
                  },
                })}
              />
              {errors[input.name] && (
                <p className="text-red text-xs">{errors[input.name].message}</p>
              )}
            </div>
          ))}
        </div>
        <Button buttonType="admin" buttonStyle="w-full mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ShippingForm;
