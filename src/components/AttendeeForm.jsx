/* eslint-disable react/prop-types */
import { useState } from "react";
import Dropzone from "react-dropzone";
import { BiCloudDownload } from "react-icons/bi";
import axios from "axios";
import { FiMail } from "react-icons/fi";

const AttendeeForm = ({ formik, onNext, onBack }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setIsUploading(true);

      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "HNG12-upload");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dljtql2jc/image/upload`,
          formData
        );

        formik.setFieldValue("avatarUrl", response.data.secure_url);
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="sm:p-4 sm:bg-[#08252B] sm:border bg-transparent border-[#0E464F] rounded-3xl">
      <div className="mb-8 p-4 bg-[#052228] border border-[#07373F] rounded-2xl">
        <label className="block mb-2 font-medium" htmlFor="avatarUpload">
          Upload Profile Photo
        </label>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="relative w-full sm:bg-[#00000033] bg-transparent my-8 px-4 py-12 text-center cursor-pointer flex justify-center"
              style={{
                minHeight: "200px",
              }}
            >
              <input {...getInputProps()} id="avatarUpload" />
              <div
                className="absolute flex h-[240px] w-[240px] flex-col items-center justify-center bg-[#0E464F] border-4 border-[#24A0B580] rounded-3xl overflow-hidden group"
                style={{
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  maxWidth: "100%",
                }}
              >
                {isUploading ? (
                  <div className="text-gray-400">Uploading...</div>
                ) : formik.values.avatarUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={formik.values.avatarUrl}
                      alt="Avatar preview"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-[#0E464F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <BiCloudDownload className="text-white mb-4 w-12 h-12" />
                      <p className="text-white px-4">
                        Drag & drop or click to upload
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <BiCloudDownload className="text-white mb-4 w-12 h-12" />
                    <p className="text-white px-4">
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </Dropzone>
        {formik.touched.avatarUrl && formik.errors.avatarUrl && (
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.avatarUrl}
          </div>
        )}
      </div>

      <div>
        <div className="mb-6">
          <label htmlFor="fullName" className="block mb-2 font-medium">
            Enter your name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="w-full px-4 py-3 border border-[#07373F] rounded-lg text-white focus:outline-none focus:border-[#24A0B5] transition-all"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.fullName}
            </div>
          )}
        </div>

        <div className="relative mb-6">
          <label htmlFor="email" className="block text-white text-lg mb-2">
            Enter your email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-white" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="hello@avioflagos.io"
              className="w-full px-4 py-3 pl-10 border border-[#07373F] rounded-lg text-white focus:outline-none focus:border-[#24A0B5] transition-all"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="specialRequest" className="block mb-2 font-medium">
            Special request?
          </label>
          <textarea
            id="specialRequest"
            name="specialRequest"
            className="w-full px-4 py-3 border border-[#07373F] rounded-lg text-white focus:outline-none focus:border-[#24A0B5] transition-all min-h-[100px] resize-y"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialRequest}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4 sm:gap-0">
        <button
          type="button"
          className="border border-[#24A0B5] text-gray-100 w-full sm:w-[280px] py-3 rounded-lg font-medium hover:bg-teal-900 transition-all order-2 sm:order-1"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-teal-500 text-gray-900 w-full sm:w-[280px] py-3 rounded-lg font-medium hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
          onClick={onNext}
          disabled={
            !(
              formik.values.fullName &&
              formik.values.email &&
              formik.values.avatarUrl
            ) || isUploading
          }
        >
          Get My Free Ticket
        </button>
      </div>
    </div>
  );
};

export default AttendeeForm;
