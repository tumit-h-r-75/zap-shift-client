import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import useAxiosSecoure from "../../hooks/useAxiosSecoure";
import { useNavigate } from "react-router";

const AddParcel = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const axiosSecoure = useAxiosSecoure();
    const navigate = useNavigate();
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
        const weight = parseFloat(data.weight) || 0;
        const isWithinCity = data.senderDistrict === data.receiverDistrict;

        let cost = 0;
        let breakdown = "";

        if (type === "Document") {
            cost = isWithinCity ? 60 : 80;
            breakdown = `Type: Document\nCity: ${isWithinCity ? "Within City" : "Outside City"}\nBase Price: ৳${cost}`;
        } else {
            if (weight <= 3) {
                cost = isWithinCity ? 110 : 150;
                breakdown = `Type: Non-Document\nWeight: ${weight}kg (≤ 3kg)\nCity: ${isWithinCity ? "Within City" : "Outside City"}\nBase Price: ৳${cost}`;
            } else {
                const extraWeight = weight - 3;
                const base = isWithinCity ? 110 : 150;
                const extra = extraWeight * 40 + (isWithinCity ? 0 : 40);
                cost = base + extra;

                breakdown = `Type: Non-Document\nWeight: ${weight}kg (> 3kg)\nCity: ${isWithinCity ? "Within City" : "Outside City"}\nBase Price: ৳${base}\nExtra Weight Charge: ৳${extraWeight} x 40 = ৳${extraWeight * 40}${!isWithinCity ? `\nOutside City Extra: ৳40` : ""}`;
            }
        }
        // 🔑 Helper Function
        const generateTrackingId = () => {
            const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // YYMMDD
            const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 char
            return `ZAP-${datePart}-${randomPart}`;
        };

        const parcelData = {
            ...data,
            type,
            cost,
            created_by: user?.email,
            tracking_id: generateTrackingId(),
            delevery_status: 'not_collected',
            Payment_status: "unpaid",
            creation_date: new Date().toISOString(),
        };

        // SweetAlert2 দিয়ে কনফার্মেশন পপআপ
        Swal.fire({
            title: "🧾 Confirm Your Parcel",
            html: `
      <pre style="text-align: left; font-size: 14px; white-space: pre-wrap;">${breakdown}</pre>
      <h3 style="margin-top: 10px; color: #10B981;">Total Cost: ৳${cost}</h3>
    `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: " Proceed to Payment",
            cancelButtonText: " Go Back to Edit",
            confirmButtonColor: "#10B981",
            cancelButtonColor: "#d33",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(" Saved Parcel:", parcelData);
                // strt backend from here
                axiosSecoure.post("/parcels", parcelData)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.insertedId) {
                            // TODO: redirect to pyment page
                            Swal.fire("Confirmed!", "Your parcel is saved and ready for payment.", "success");
                        }
                        navigate('/dashboard/myParcels')
                    })
            } else {
                Swal.fire("Editing Mode", "You can now modify the parcel info.", "info");
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

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

                <button type="submit" className="btn text-center mx-auto bg-lime-500 hover:bg-lime-600 text-white w-32 mt-4">Continue</button>
            </form>
        </div>
    );
};

export default AddParcel;