import { useState, useEffect, useRef, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TicketSelection from "./TicketSelection";
import AttendeeForm from "./AttendeeForm";
import TicketCard from "./TicketCard";

const App = () => {
  const [step, setStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const initialFormData = useRef(null);
  const isInitialMount = useRef(true);

  // Validation schema for the form
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    avatarUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Avatar is required"),
    ticketType: Yup.string().required("Please select a ticket type"),
    ticketQuantity: Yup.number()
      .min(1)
      .max(5)
      .required("Number of tickets is required"),
    specialRequest: Yup.string(),
  });

  // Initialize form with Formik
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      avatarUrl: "",
      ticketType: "",
      ticketQuantity: 1,
      specialRequest: "",
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("ticketFormData", JSON.stringify(values));

      // Save to booked tickets array
      const existingTickets = JSON.parse(
        localStorage.getItem("bookedTickets") || "[]"
      );
      const newTicket = {
        id: Date.now(),
        ...values,
        bookingDate: new Date().toISOString(),
      };
      existingTickets.push(newTicket);
      localStorage.setItem("bookedTickets", JSON.stringify(existingTickets));

      setStep(3);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const initializeApp = () => {
      const savedStep = localStorage.getItem("currentStep");
      const savedFormData = localStorage.getItem("ticketFormData");

      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        initialFormData.current = parsedData;
        formik.setValues(parsedData, false);
      }

      if (savedStep) {
        const parsedStep = parseInt(savedStep);
        setStep(parsedStep);
      }

      setIsInitialized(true);
    };

    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Save current step
    localStorage.setItem("currentStep", step);

    // Skip validation on initial load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (step === 3) {
      if (!formik.values.ticketType) {
        setStep(1);
      } else if (
        !formik.values.fullName ||
        !formik.values.email ||
        !formik.values.avatarUrl
      ) {
        setStep(2);
      }
    }

    // Save form data when values change
    if (formik.dirty) {
      localStorage.setItem("ticketFormData", JSON.stringify(formik.values));
    }
  }, [step, formik.values, formik.dirty, isInitialized]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Handle going to the next step
  const handleNextStep = () => {
    if (step === 1 && formik.values.ticketType) {
      setStep(2);
    } else if (
      step === 2 &&
      formik.values.fullName &&
      formik.values.email &&
      formik.values.avatarUrl
    ) {
      formik.handleSubmit();
    }
  };

  // Handle going to the previous step
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Reset the form and start over
  const handleReset = useCallback(() => {
    formik.resetForm({
      values: {
        fullName: "",
        email: "",
        avatarUrl: "",
        ticketType: "",
        ticketQuantity: 1,
        specialRequest: "",
      },
    });
    setStep(1);
    localStorage.removeItem("ticketFormData");
    localStorage.removeItem("currentStep");
    initialFormData.current = null;
    isInitialMount.current = true;
  }, [formik]);

  // Render the appropriate step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <TicketSelection formik={formik} onNext={handleNextStep} />;
      case 2:
        return (
          <AttendeeForm
            formik={formik}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return <TicketCard formData={formik.values} onReset={handleReset} />;
      default:
        return null;
    }
  };

  if (!isInitialized) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div
      className="text-gray-100 min-h-screen pt-26 md:pt-28"
      style={{
        background: `radial-gradient(
          52.52% 32.71% at 50% 97.66%,
          rgba(36, 160, 181, 0.2) 0%,
          rgba(36, 160, 181, 0) 100%
        ),
        #02191d`,
      }}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* <Header /> */}

        <div className="max-w-2xl mx-auto bg-[#041E23] md:bg-transparent rounded-4xl border border-[#0E464F] p-6 mb-8">
          {step < 4 && (
            <div className="mb-8">
              <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">
                  {step === 1
                    ? "Ticket Selection"
                    : step === 2
                    ? "Attendee Details"
                    : "Ready"}
                </h1>
                <p className="text-sm">Step {step}/3</p>
              </div>
              <div className="h-1 bg-[#0E464F] rounded overflow-hidden">
                <div
                  className="h-full bg-[#24A0B5] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default App;
