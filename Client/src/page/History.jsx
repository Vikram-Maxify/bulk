import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getMyUsers } from "../reducer/slice/excelSlice";

const History = () => {
    const dispatch = useDispatch();

    const { users = [], loading, pagination = {} } = useSelector((state) => state.excel);

    const [sourceFiles, setSourceFiles] = useState([]);
    const [hasFetched, setHasFetched] = useState(false); // ✅ FIX

    const [filters, setFilters] = useState({
        status: "",
        sourceFile: "",
        startDate: "",
        endDate: "",
    });

    const [page, setPage] = useState(1);

    // ✅ Fetch data
    const fetchHistory = (pageNo = 1) => {
        setPage(pageNo);

        const params = {
            page: pageNo,
            limit: 20,
            ...Object.fromEntries(
                Object.entries(filters).filter(([, v]) => v)
            ),
        };

        dispatch(getMyUsers(params)).then(() => {
            setHasFetched(true); // ✅ FIX
        });
    };

    // ✅ Debounce fetch
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchHistory(1);
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    // ✅ Extract source files
    useEffect(() => {
        if (users.length > 0) {
            const files = [...new Set(users.map(item => item.sourceFile))];
            setSourceFiles(files);
        }
    }, [users]);

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
                        <h2 className="text-2xl font-bold">{users.length || 0}</h2>
                    </div>

                    <div className="border rounded-2xl p-4 bg-purple-50">
                        <p>Showing</p>
                        <h2 className="text-2xl font-bold">{users.length}</h2>
                    </div>

                    <div className="border rounded-2xl p-4 bg-cyan-50">
                        <p>Pages</p>
                        <h2 className="text-2xl font-bold">{pagination?.pages || 1}</h2>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="h-64 flex justify-center items-center">
                            Loading...
                        </div>
                    ) : users.length > 0 ? (
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
                                        {users.map((item, i) => (
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

                            {/* Pagination */}
                            <div className="flex justify-between p-4 border-t">
                                <button
                                    disabled={page === 1}
                                    onClick={() => fetchHistory(page - 1)}
                                >
                                    Prev
                                </button>

                                <span>
                                    Page {page} of {pagination?.pages || 1}
                                </span>

                                <button
                                    disabled={page === pagination?.pages}
                                    onClick={() => fetchHistory(page + 1)}
                                >
                                    Next
                                </button>
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