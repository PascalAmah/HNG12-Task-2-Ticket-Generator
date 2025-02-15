/* eslint-disable react/prop-types */
import { BiChevronDown } from "react-icons/bi";

const TicketSelection = ({ formik, onNext }) => {
  const ticketTypes = [
    {
      type: "Free",
      price: "Free",
      description: "REGULAR ACCESS",
      availablity: "20/52",
    },
    {
      type: "VIP",
      price: "$100",
      description: "VIP ACCESS",
      availablity: "20/52",
    },
    {
      type: "VVIP",
      price: "$150",
      description: "VVIP ACCESS",
      availablity: "20/52",
    },
  ];

  if (!formik || !formik.values) {
    console.error("formik prop is not properly passed to TicketSelection");
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:p-5 sm:bg-[#08252B] sm:border border-[#0E464F] rounded-4xl bg-transparent">
      <div
        className="text-center border border-[#07373F] rounded-3xl p-5 mb-8"
        style={{
          background: `radial-gradient(
      103.64% 57.39% at 14.02% 32.06%,
      #24A0B533,
      transparent
    ),
    rgba(10, 12, 17, 0.1)`,
        }}
      >
        <h2 className="text-3xl font-bold mb-4">Techember Fest &lsquo;25</h2>
        <p className="max-w-[300px] mx-auto text-center mb-4">
          Join us for an unforgettable experience at [Event Name]! Secure your
          spot now.
        </p>
        <div className="mt-4">
          <p>📍 [Event Location] │ March 15, 2025 | 7:00 PM</p>
        </div>
      </div>

      <div className="border-t-3 border-[#07373F] my-8"></div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Select Ticket Type:</h3>
        <div className="p-3 bg-[#052228] border border-[#07373F] rounded-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {ticketTypes.map((ticket, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 cursor-pointer transition-all border-2 border-[#197686]  ${
                formik.values.ticketType === ticket.type
                  ? "border-[#197686] bg-[#12464E] "
                  : "border hover:border-[#197686] hover:bg-[#2C545B]"
              }`}
              onClick={() => formik.setFieldValue("ticketType", ticket.type)}
            >
              <h3 className="text-2xl font-bold mb-2">{ticket.price}</h3>
              <p className="text-white">{ticket.description}</p>
              <p className="text-white text-sm mt-2">{ticket.availablity}</p>
            </div>
          ))}
        </div>
        {formik.touched.ticketType && formik.errors.ticketType && (
          <div className="text-red-500 text-sm mb-4">
            {formik.errors.ticketType}
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Number of Tickets:</h3>
          <div className="relative flex items-center">
            <select
              id="ticketQuantity"
              name="ticketQuantity"
              value={formik.values.ticketQuantity || 1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-[#07373F] rounded-lg text-white focus:outline-none focus:border-teal-500 transition-all appearance-none pr-10"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option
                  key={num}
                  value={num}
                  className="bg-[#05252C] text-white"
                >
                  {num}
                </option>
              ))}
            </select>
            <div className="absolute right-4 pointer-events-none">
              <BiChevronDown className="h-6 w-6 text-white" />
            </div>
          </div>
          {formik.touched.ticketQuantity && formik.errors.ticketQuantity && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.ticketQuantity}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4 sm:gap-0">
          <button
            type="button"
            className="border border-[#24A0B5] text-gray-100 w-full sm:w-[280px] py-3 rounded-lg font-medium hover:bg-teal-900 transition-all order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-teal-500 text-gray-900 w-full sm:w-[280px] py-3 rounded-lg font-medium hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
            onClick={onNext}
            disabled={!formik.values.ticketType}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
