"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Form steps
const STEPS = {
  BASIC_INFO: 0,
  ADDRESS: 1,
  REVIEW: 2,
};

// Initial form state
const initialFormData = {
  name: "",
  email: "",
  street: "",
  city: "",
  zip: "",
};

// Initial errors state
const initialErrors = {
  name: "",
  email: "",
  street: "",
  city: "",
  zip: "",
};

export default function AddUser() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(STEPS.BASIC_INFO);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Handle input changes
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate basic info step
  const validateBasicInfo = () => {
    let isValid = true;
    const newErrors = { ...initialErrors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validate address step
  const validateAddress = () => {
    let isValid = true;
    const newErrors = { ...initialErrors };

    if (!formData.street.trim()) {
      newErrors.street = "Street is required";
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep === STEPS.BASIC_INFO) {
      if (!validateBasicInfo()) return;
    } else if (currentStep === STEPS.ADDRESS) {
      if (!validateAddress()) return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  // Handle previous step
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (currentStep === STEPS.REVIEW) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted with data:", formData);
        setIsSubmitting(false);
        setShowSuccessToast(true);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowSuccessToast(false);
          router.push("/dashboard");
        }, 3000);
      }, 1000);
    }
  };

  // Render form steps
  const renderFormStep = () => {
    switch (currentStep) {
      case STEPS.BASIC_INFO:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        );

      case STEPS.ADDRESS:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="street" className="block text-sm font-medium">
                Street <span className="text-red-500">*</span>
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.street ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="123 Main St"
              />
              {errors.street && (
                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                  <AlertCircle size={14} />
                  {errors.street}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium">
                City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="New York"
              />
              {errors.city && (
                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                  <AlertCircle size={14} />
                  {errors.city}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="zip" className="block text-sm font-medium">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                id="zip"
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.zip ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="10001"
              />
              {errors.zip && (
                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                  <AlertCircle size={14} />
                  {errors.zip}
                </p>
              )}
            </div>
          </div>
        );

      case STEPS.REVIEW:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{formData.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{formData.email}</span>
                  </p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                <div className="mt-2 space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Street:</span>
                    <span>{formData.street}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">City:</span>
                    <span>{formData.city}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">ZIP Code:</span>
                    <span>{formData.zip}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Please review the information above before submitting
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Step titles
  const stepTitles = ["Basic Information", "Address Details", "Review & Confirm"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors gap-1 text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold">Add New User</h1>
          <p className="text-muted-foreground mt-1">
            Complete the form below to add a new user to the system.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-8">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } transition-colors duration-200`}
                >
                  {currentStep > index ? (
                    <Check size={16} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    currentStep >= index
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {title}
                </span>
                {index < stepTitles.length - 1 && (
                  <div
                    className={`absolute top-4 left-8 w-[calc(100%-2rem)] h-[2px] ${
                      currentStep > index ? "bg-primary" : "bg-muted"
                    } transition-colors duration-200`}
                    style={{ left: "calc(50% + 16px)", right: "calc(50% + 16px)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="min-h-[240px]"
              >
                {renderFormStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === STEPS.BASIC_INFO}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                currentStep === STEPS.BASIC_INFO
                  ? "text-muted-foreground bg-transparent cursor-not-allowed"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            {currentStep === STEPS.REVIEW ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                  
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Submit</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Success toast notification */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md"
          >
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <p className="font-medium">Success! User has been added.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}