import { useForm } from "react-hook-form";
import { useState } from "react";
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

    const onSubmit = (data) => {
        let cost = 0;

        if (type === "Document") {
            cost = 100;
        } else {
            const weight = parseFloat(data.weight) || 1;
            cost = 100 + weight * 20;
        }

        toast.info(`Delivery Cost: ৳${cost}`, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            onClick: () => {
                // save to database
                const parcelData = {
                    ...data,
                    type,
                    cost,
                    creation_date: new Date().toISOString(),
                };
                console.log("Saved Parcel:", parcelData);
                toast.success("Parcel Confirmed & Saved!");
            },
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <ToastContainer />

            <h1 className="text-3xl font-bold text-gray-800 mb-1">Add Parcel</h1>
            <p className="text-gray-600 mb-6">Enter your parcel details</p>

            {/* ✅ Optional live preview at the top */}
            <div className="bg-gray-100 text-sm p-2 mb-4 rounded">
                <strong>Live Title:</strong> {watch("title") || "Not entered"}
            </div>

            {/* Type Selector */}
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

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
                {/* Parcel Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium">Parcel Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Enter Title"
                        />
                        {errors.title && <p className="text-red-500 text-sm">Required</p>}
                    </div>

                    {type === "Not-Document" && (
                        <div>
                            <label className="block font-medium">Parcel Weight (kg)</label>
                            <input
                                {...register("weight")}
                                className="input input-bordered w-full"
                                placeholder="Ex: 2"
                                type="number"
                                step="0.1"
                            />
                        </div>
                    )}
                </div>

                {/* Sender Details */}
                <div>
                    <h2 className="font-bold text-lg mb-4">Sender Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            {...register("senderName", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Name"
                        />
                        <input
                            {...register("senderContact", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Contact"
                        />
                        <select
                            {...register("senderRegion", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Region</option>
                            <option>Dhaka</option>
                            <option>Chattogram</option>
                        </select>
                        <select
                            {...register("senderCenter", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Service Center</option>
                            <option>Center 1</option>
                            <option>Center 2</option>
                        </select>
                        <input
                            {...register("senderAddress", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Address"
                        />
                        <textarea
                            {...register("pickupInstruction", { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Pickup Instruction"
                        ></textarea>
                    </div>
                </div>

                {/* Receiver Details */}
                <div>
                    <h2 className="font-bold text-lg mb-4">Receiver Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            {...register("receiverName", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Name"
                        />
                        <input
                            {...register("receiverContact", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Contact"
                        />
                        <select
                            {...register("receiverRegion", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Region</option>
                            <option>Dhaka</option>
                            <option>Chattogram</option>
                        </select>
                        <select
                            {...register("receiverCenter", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Service Center</option>
                            <option>Center A</option>
                            <option>Center B</option>
                        </select>
                        <input
                            {...register("receiverAddress", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Address"
                        />
                        <textarea
                            {...register("deliveryInstruction", { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Delivery Instruction"
                        ></textarea>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-sm text-gray-600">
                    * PickUp Time 4pm–7pm Approx.
                </p>

                
                <button
                    type="submit"
                    className="btn bg-lime-400 hover:bg-lime-500 text-white w-32"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default AddParcel;
