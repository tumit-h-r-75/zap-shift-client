import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("Document");
  const [warehouses, setWarehouses] = useState([]);
  const [senderDistrict, setSenderDistrict] = useState("");
  const [receiverDistrict, setReceiverDistrict] = useState("");

  useEffect(() => {
    fetch("/data/warehouses.json")
      .then((res) => res.json())
      .then((data) => setWarehouses(data))
      .catch((err) => console.error("Failed to load warehouses data:", err));
  }, []);

  const getCoveredAreasByDistrict = (district) => {
    const found = warehouses.find((w) => w.district === district);
    return found ? found.covered_area : [];
  };

  const onSubmit = (data) => {
    let cost = 0;
    if (type === "Document") {
      cost = 100;
    } else {
      const weight = parseFloat(data.weight) || 1;
      cost = 100 + weight * 20;
    }

    const parcelData = {
      ...data,
      type,
      cost,
      creation_date: new Date().toISOString(),
    };

    console.log("Saved Parcel:", parcelData);
    toast.success(`Parcel Confirmed! Delivery Cost: ৳${cost}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-gray-800 mb-1">Add Parcel</h1>
      <p className="text-gray-600 mb-6">Enter your parcel details</p>

      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="Document"
            checked={type === "Document"}
            onChange={() => setType("Document")}
            className="accent-green-500"
          />
          <span>Document</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="Not-Document"
            checked={type === "Not-Document"}
            onChange={() => setType("Not-Document")}
            className="accent-green-500"
          />
          <span>Not-Document</span>
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Parcel Title</label>
            <input
              {...register("title", { required: "Parcel title is required" })}
              className="input input-bordered w-full"
              placeholder="Enter Title"
              autoComplete="off"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {type === "Not-Document" && (
            <div>
              <label className="block font-medium mb-1">Parcel Weight (kg)</label>
              <input
                {...register("weight", {
                  required: "Weight is required",
                  valueAsNumber: true,
                  min: { value: 0.1, message: "Must be at least 0.1kg" },
                })}
                className="input input-bordered w-full"
                placeholder="Ex: 2"
                type="number"
                step="0.1"
              />
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
              <p className="text-sm text-blue-600 mt-1">
                Estimated Cost: ৳{watch("weight") ? 100 + parseFloat(watch("weight")) * 20 : 100}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid gap-6">
            <h2 className="font-bold text-lg">Sender Details</h2>

            <input {...register("senderName", { required: "Sender name required" })} className="input input-bordered w-full" placeholder="Name" />
            {errors.senderName && <p className="text-red-500 text-sm">{errors.senderName.message}</p>}

            <input {...register("senderContact", { required: "Sender contact required" })} className="input input-bordered w-full" placeholder="Contact" />
            {errors.senderContact && <p className="text-red-500 text-sm">{errors.senderContact.message}</p>}

            <select {...register("senderDistrict", { required: "Select sender district" })} className="select select-bordered w-full" value={senderDistrict} onChange={(e) => setSenderDistrict(e.target.value)}>
              <option value="">Select District</option>
              {warehouses.map((w) => (
                <option key={w.district} value={w.district}>{w.district}</option>
              ))}
            </select>
            {errors.senderDistrict && <p className="text-red-500 text-sm">{errors.senderDistrict.message}</p>}

            <select {...register("senderArea", { required: "Select sender area" })} className="select select-bordered w-full" disabled={!senderDistrict}>
              <option value="">{senderDistrict ? "Select Area" : "Select District First"}</option>
              {getCoveredAreasByDistrict(senderDistrict).map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            {errors.senderArea && <p className="text-red-500 text-sm">{errors.senderArea.message}</p>}

            <input {...register("senderAddress", { required: "Sender address required" })} className="input input-bordered w-full" placeholder="Full Address" />
            {errors.senderAddress && <p className="text-red-500 text-sm">{errors.senderAddress.message}</p>}

            <textarea {...register("pickupInstruction", { required: "Pickup instruction required" })} className="textarea textarea-bordered w-full" placeholder="Pickup Instruction" />
            {errors.pickupInstruction && <p className="text-red-500 text-sm">{errors.pickupInstruction.message}</p>}
          </div>

          <div className="grid gap-6">
            <h2 className="font-bold text-lg">Receiver Details</h2>

            <input {...register("receiverName", { required: "Receiver name required" })} className="input input-bordered w-full" placeholder="Name" />
            {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName.message}</p>}

            <input {...register("receiverContact", { required: "Receiver contact required" })} className="input input-bordered w-full" placeholder="Contact" />
            {errors.receiverContact && <p className="text-red-500 text-sm">{errors.receiverContact.message}</p>}

            <select {...register("receiverDistrict", { required: "Select receiver district" })} className="select select-bordered w-full" value={receiverDistrict} onChange={(e) => setReceiverDistrict(e.target.value)}>
              <option value="">Select District</option>
              {warehouses.map((w) => (
                <option key={w.district} value={w.district}>{w.district}</option>
              ))}
            </select>
            {errors.receiverDistrict && <p className="text-red-500 text-sm">{errors.receiverDistrict.message}</p>}

            <select {...register("receiverArea", { required: "Select receiver area" })} className="select select-bordered w-full" disabled={!receiverDistrict}>
              <option value="">{receiverDistrict ? "Select Area" : "Select District First"}</option>
              {getCoveredAreasByDistrict(receiverDistrict).map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            {errors.receiverArea && <p className="text-red-500 text-sm">{errors.receiverArea.message}</p>}

            <input {...register("receiverAddress", { required: "Receiver address required" })} className="input input-bordered w-full" placeholder="Full Address" />
            {errors.receiverAddress && <p className="text-red-500 text-sm">{errors.receiverAddress.message}</p>}

            <textarea {...register("deliveryInstruction", { required: "Delivery instruction required" })} className="textarea textarea-bordered w-full" placeholder="Delivery Instruction" />
            {errors.deliveryInstruction && <p className="text-red-500 text-sm">{errors.deliveryInstruction.message}</p>}
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4">* PickUp Time: 4pm–7pm Approx.</p>

        <button type="submit" className="btn bg-lime-500 hover:bg-lime-600 text-white w-32 mt-4">Continue</button>
      </form>
    </div>
  );
};

export default AddParcel;