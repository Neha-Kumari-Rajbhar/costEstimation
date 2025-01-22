
import React, { useState } from "react";

const SearchButtonSection = () => {
  const [productType, setProductType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    make: "",
    model: "",
  });

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { productType, ...formData });
    setProductType("");
    setFormData({ name: "", type: "", make: "", model: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-center text-gray-800">
          Enter Product Details
        </h3>

        {!productType ? (
          <div className="mb-4">
            <label className="block text-sm md:text-base font-medium text-gray-700">
              Product Type:
            </label>
            <select
              value={productType}
              onChange={handleProductTypeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              <option value="">Select a product type</option>
              <option value="ExactMakeModel">
                Query based on exact Make/Model of a Product
              </option>
              <option value="RelevantSpecifications">
                Query based on Most Relevant Specifications of a Product
              </option>
              <option value="BasicRequirements">
                Query based on Basic Requirements of a Service
              </option>
            </select>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
              {productType === "ExactMakeModel"
                ? "Exact Make/Model Search"
                : productType === "RelevantSpecifications"
                ? "Relevant Specifications Search"
                : "Basic Requirements Search"}
            </h3>

            {productType === "ExactMakeModel" && (
              <>
                <InputField
                  label="Item Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
                <InputField
                  label="Item Type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Enter product type"
                />
                <InputField
                  label="Make"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="Enter product make"
                />
                <InputField
                  label="Model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Enter product model"
                />
              </>
            )}

            {productType === "RelevantSpecifications" && (
              <>
                <InputField
                  label="Item Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
                <InputField
                  label="Specifications"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Enter product specifications"
                />
              </>
            )}

            {productType === "BasicRequirements" && (
              <>
                <InputField
                  label="Service Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter service name"
                />
                <InputField
                  label="Requirements"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Enter service requirements"
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all duration-300 ease-in-out mt-4 text-sm md:text-base"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm md:text-base font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
    />
  </div>
);

export default SearchButtonSection;
