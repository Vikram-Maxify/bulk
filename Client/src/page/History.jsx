import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getMyUsers } from "../reducer/slice/excelSlice";

const History = () => {
    const dispatch = useDispatch();

    const { pagination = {} } = useSelector((state) => state.excel);

    const [localUsers, setLocalUsers] = useState([]); // ✅ all data
    const [loadingAll, setLoadingAll] = useState(false);
    const [sourceFiles, setSourceFiles] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);

    const [filters, setFilters] = useState({
        status: "",
        sourceFile: "",
        startDate: "",
        endDate: "",
    });

    // ✅ Fetch ALL pages
    const fetchAllHistory = async () => {
        let currentPage = 1;
        let allData = [];
        let totalPages = 1;

        setLoadingAll(true);

        try {
            do {
                const params = {
                    page: currentPage,
                    limit: 20,
                    ...Object.fromEntries(
                        Object.entries(filters).filter(([, v]) => v)
                    ),
                };

                const res = await dispatch(getMyUsers(params)).unwrap();

                allData = [...allData, ...(res.users || [])];
                totalPages = res.pagination?.pages || 1;

                currentPage++;
            } while (currentPage <= totalPages);

            setLocalUsers(allData);
            setHasFetched(true);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingAll(false);
        }
    };

    // ✅ Debounce fetch
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchAllHistory();
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    // ✅ Extract source files from ALL data
    useEffect(() => {
        if (localUsers.length > 0) {
            const files = [...new Set(localUsers.map(item => item.sourceFile))];
            setSourceFiles(files);
        }
    }, [localUsers]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFilters({
            status: "",
            sourceFile: "",
            startDate: "",
            endDate: "",
        });
    };

    // UI helpers
    const getStatusIcon = (status) => {
        switch (status) {
            case "sent":
                return <CheckCircle2 size={16} className="text-green-600" />;
            case "failed":
                return <AlertCircle size={16} className="text-red-600" />;
            case "pending":
                return <Clock size={16} className="text-yellow-600" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            sent: "bg-green-50 text-green-700 border-green-200",
            failed: "bg-red-50 text-red-700 border-red-200",
            pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
        };
        return badges[status] || "";
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-text">Upload History</h1>
                    <p className="text-textLight mt-1">
                        View and manage your imported contacts
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={20} className="text-primary" />
                        <h2 className="text-lg font-semibold text-text">Filters</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                        <div>
                            <label className="text-sm font-semibold mb-1 block">Status</label>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border rounded-xl"
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="sent">Sent</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1 block">Source File</label>
                            <select
                                name="sourceFile"
                                value={filters.sourceFile}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border rounded-xl"
                            >
                                <option value="">All</option>
                                {sourceFiles.map((file, i) => (
                                    <option key={i} value={file}>
                                        {file}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1 block">From Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border rounded-xl"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1 block">To Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border rounded-xl"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="px-4 py-2 border rounded-xl"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-2xl p-4 bg-blue-50">
                        <p>Total Records</p>
                        <h2 className="text-2xl font-bold">{localUsers.length}</h2>
                    </div>

                    <div className="border rounded-2xl p-4 bg-purple-50">
                        <p>Showing</p>
                        <h2 className="text-2xl font-bold">{localUsers.length}</h2>
                    </div>

                    <div className="border rounded-2xl p-4 bg-cyan-50">
                        <p>Pages</p>
                        <h2 className="text-2xl font-bold">{pagination?.pages || 1}</h2>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border rounded-2xl overflow-hidden">
                    {loadingAll ? (
                        <div className="h-64 flex justify-center items-center">
                            Loading...
                        </div>
                    ) : localUsers.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-3 text-left">Name</th>
                                            <th className="p-3 text-left">Mobile</th>
                                            <th className="p-3 text-left">File</th>
                                            <th className="p-3 text-left">Status</th>
                                            <th className="p-3 text-left">Date</th>
                                            <th className="p-3 text-left">Message</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {localUsers.map((item, i) => (
                                            <tr key={i} className="border-t">
                                                <td className="p-3">{item.name}</td>
                                                <td className="p-3">{item.mobile}</td>
                                                <td className="p-3">{item.sourceFile}</td>

                                                <td className="p-3">
                                                    <span className={`flex items-center gap-2 px-2 py-1 border rounded ${getStatusBadge(item.status)}`}>
                                                        {getStatusIcon(item.status)}
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="p-3">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </td>

                                                <td className="p-3">
                                                    {item.errorMessage || "Success"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : hasFetched ? (
                        <div className="h-64 flex flex-col items-center justify-center">
                            <AlertCircle size={40} />
                            <p>No records found</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default History;