import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RxCross2 } from "react-icons/rx";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  budget: string;
  destination: string;
}

interface CallbackFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  budget: Yup.number().typeError("Budget must be a number").required("Budget is required"),
  destination: Yup.string().required("Destination is required"),
});

const CallbackForm: React.FC<CallbackFormProps> = ({ onClose }) => {
    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm, setErrors }: { 
          setSubmitting: (isSubmitting: boolean) => void; 
          resetForm: () => void;
          setErrors: (errors: Record<string, string>) => void;
        }
      ) => {
        try {
          const response = await fetch("/api/landingPage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            // If phone already exists, show error under phone input
            if (response.status === 409) {
              setErrors({ phone: data.message });
            } else if (response.status === 400) {
              setErrors(data.errors || {}); // Display validation errors from backend
            } else {
              setErrors({ email: "Something went wrong. Please try again." });
            }
            return;
          }
    
          // If successful, reset the form and close the modal
          resetForm();
          onClose();
        } catch (error) {
          setErrors({ email: "Server error. Please try again later." });
        } finally {
          setSubmitting(false);
        }
      };

  return (
    <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between mb-4 ">
        <h2 className="text-lg font-semibold">Schedule a Callback </h2>
        <button onClick={onClose} >
        <RxCross2 />
        </button>
        </div>
        
        <Formik
          initialValues={{ name: "", phone: "", email: "", budget: "", destination: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              <Field name="name" placeholder="Name" className="w-full p-2 border rounded-md focus:ring-orange-500" />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />

              <PhoneInput
                country={"gr"}
                onChange={(phone: string) => setFieldValue("phone", phone)}
                inputStyle={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              />
              <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />

              <Field name="email" type="email" placeholder="Email" className="w-full p-2 border rounded-md focus:ring-orange-500" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />

              <Field name="budget" type="number" placeholder="Budget" className="w-full p-2 border rounded-md focus:ring-orange-500" />
              <ErrorMessage name="budget" component="p" className="text-red-500 text-sm" />

              <Field name="destination" placeholder="Destination" className="w-full p-2 border rounded-md focus:ring-orange-500" />
              <ErrorMessage name="destination" component="p" className="text-red-500 text-sm" />

              <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
        
      </div>
    </div>
  );
};

export default CallbackForm;
