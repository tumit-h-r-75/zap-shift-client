import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import riderImg from "../../assets/agent-pending.png"; // Replace later with your own image
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecoure from "../../hooks/useAxiosSecoure";

const BeARider = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [warehouses, setWarehouses] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districts, setDistricts] = useState([]);
    const [areas, setAreas] = useState([]);
    const axiosSecoure = useAxiosSecoure();

    useEffect(() => {
        fetch("/data/warehouses.json")
            .then((res) => res.json())
            .then((data) => setWarehouses(data))
            .catch((err) => console.error("Failed to load warehouse data:", err));
    }, []);

    // Region → District
    useEffect(() => {
        const filtered = warehouses.filter((w) => w.region === selectedRegion);
        const uniqueDistricts = [...new Set(filtered.map((w) => w.district))];
        setDistricts(uniqueDistricts);
        setSelectedDistrict("");
        setAreas([]);
    }, [selectedRegion, warehouses]);

    // District → Area
    useEffect(() => {
        const found = warehouses.find((w) => w.district === selectedDistrict);
        if (found) setAreas(found.covered_area || []);
        else setAreas([]);
    }, [selectedDistrict, warehouses]);

    const onSubmit = (data) => {
        const riderData = {
            ...data,
            name: user?.displayName,
            email: user?.email,
            status: "pending",
            created_at: new Date().toISOString(),
        };
        console.log(" Rider Application Submitted:", riderData);
        // TODO: API POST করুন এখানে
        axiosSecoure.post('/riders', riderData)
            .then(res => {
                if (res.data.insertedId) {
                    // Show SweetAlert confirmation
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "Your rider application has been received. We will get back to you soon.",
                        confirmButtonColor: "#10B981",
                    });
                };
            })


        // reset();
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center min-h-[90vh]">
            {/* Left: Form Section */}
            <div className="flex flex-col justify-center">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Be a Rider</h2>
                    <p className="text-gray-600">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        className="w-full input input-bordered"
                        value={user?.displayName || ""}
                        readOnly
                        {...register("name")}
                    />

                    <input
                        className="w-full input input-bordered"
                        value={user?.email || ""}
                        readOnly
                        {...register("email")}
                    />

                    <input
                        type="number"
                        placeholder="Your Age"
                        className="w-full input input-bordered"
                        {...register("age", { required: "Age is required" })}
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}

                    <select
                        className="w-full select select-bordered"
                        {...register("region", { required: "Region is required" })}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="">Select Region</option>
                        {[...new Set(warehouses.map((w) => w.region))].map((region, idx) => (
                            <option key={idx} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                    {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}

                    <select
                        className="w-full select select-bordered"
                        {...register("district", { required: "District is required" })}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={!selectedRegion}
                    >
                        <option value="">Select District</option>
                        {districts.map((d, idx) => (
                            <option key={idx} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}

                    <select
                        className="w-full select select-bordered"
                        {...register("area", { required: "Area is required" })}
                        disabled={!selectedDistrict}
                    >
                        <option value="">{selectedDistrict ? "Select Area" : "Select District First"}</option>
                        {areas.map((a, idx) => (
                            <option key={idx} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                    {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}

                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full input input-bordered"
                        {...register("phone", { required: "Phone number is required" })}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                    <input
                        type="text"
                        placeholder="NID Number"
                        className="w-full input input-bordered"
                        {...register("nid", { required: "NID is required" })}
                    />
                    {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}

                    <input
                        type="text"
                        placeholder="Bike Brand"
                        className="w-full input input-bordered"
                        {...register("bikeBrand", { required: "Bike brand is required" })}
                    />
                    {errors.bikeBrand && <p className="text-red-500 text-sm">{errors.bikeBrand.message}</p>}

                    <input
                        type="text"
                        placeholder="Bike Registration Number"
                        className="w-full input input-bordered"
                        {...register("bikeNumber", { required: "Bike number is required" })}
                    />
                    {errors.bikeNumber && <p className="text-red-500 text-sm">{errors.bikeNumber.message}</p>}

                    <button
                        type="submit"
                        className="btn bg-lime-500 hover:bg-lime-600 w-full text-white font-semibold"
                    >
                        Continue
                    </button>
                </form>
            </div>

            {/* Right: Image Section */}
            <div className="hidden md:block">
                <img src={riderImg} alt="Rider Illustration" className="w-full h-auto" />
            </div>
        </div>
    );
};

export default BeARider;
