import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Search, Calendar, Filter, Download, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import DashboardLayout from "../Layouts/DashboardLayout";
import axios from "axios";

const History = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [sourceFiles, setSourceFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        status: "",
        sourceFile: "",
        startDate: "",
        endDate: "",
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        pages: 1,
    });

    // Fetch source files on mount
    useEffect(() => {
        const fetchSourceFiles = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/excel/files", {
                    withCredentials: true,
                });
                setSourceFiles(res.data.files || []);
            } catch (err) {
                console.error("Failed to fetch files:", err);
            }
        };
        fetchSourceFiles();
    }, []);

    // Fetch history data
    const fetchHistory = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: pagination.limit,
                ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)),
            };

            const res = await axios.get("http://localhost:5000/api/excel/history", {
                params,
                withCredentials: true,
            });

            setData(res.data.data || []);
            setPagination(res.data.pagination);
        } catch (err) {
            console.error("Failed to fetch history:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on filter change
    useEffect(() => {
        fetchHistory(1);
    }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    const newFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(newFilters);
    applyFilters(allData, newFilters);
  };

  const handleReset = () => {
    const resetFilters = { status: "", sourceFile: "" };
    setFilters(resetFilters);
    applyFilters(allData, resetFilters);
  };

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

  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = startIndex + pagination.limit;
  const displayedData = filteredData.slice(startIndex, endIndex);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-text">Upload History</h1>
                    <p className="text-textLight mt-1">View and manage your imported contacts</p>
                </div>

                {/* Filters Card */}
                <div className="bg-white border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={20} className="text-primary" />
                        <h2 className="text-lg font-semibold text-text">Filters</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-textLight mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="sent">Sent</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        {/* Source File Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-textLight mb-2">
                                Source File
                            </label>
                            <select
                                name="sourceFile"
                                value={filters.sourceFile}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="">All Files</option>
                                {sourceFiles.map((file, i) => (
                                    <option key={i} value={file}>
                                        {file}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-semibold text-textLight mb-2">
                                From Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-semibold text-textLight mb-2">
                                To Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="px-4 py-2 border border-border text-text rounded-xl font-medium hover:bg-surface transition"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        {
                            label: "Total Records",
                            value: pagination.total,
                            color: "bg-blue-50 text-blue-600 border-blue-200",
                        },
                        {
                            label: "Showing",
                            value: data.length,
                            color: "bg-purple-50 text-purple-600 border-purple-200",
                        },
                        {
                            label: "Pages",
                            value: pagination.pages,
                            color: "bg-cyan-50 text-cyan-600 border-cyan-200",
                        },
                    ].map((stat, i) => (
                        <div key={i} className={`border rounded-2xl p-4 ${stat.color}`}>
                            <p className="text-sm font-semibold">{stat.label}</p>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white border border-border rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-textLight">Loading...</p>
                        </div>
                    ) : data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-surface border-b border-border">
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-text">Name</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-text">Mobile</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-text">Source File</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-text">Status</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-text">Date</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-text">Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((record, i) => (
                                            <tr key={i} className="border-b border-border hover:bg-surface transition">
                                                <td className="px-6 py-4 text-sm text-text font-medium">{record.name}</td>
                                                <td className="px-6 py-4 text-sm text-textLight">{record.mobile}</td>
                                                <td className="px-6 py-4 text-sm text-textLight">{record.sourceFile}</td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-semibold ${getStatusBadge(record.status)}`}>
                                                        {getStatusIcon(record.status)}
                                                        <span className="capitalize">{record.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-textLight">
                                                    {new Date(record.createdAt).toLocaleDateString()} <br />
                                                    <span className="text-xs">{new Date(record.createdAt).toLocaleTimeString()}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {record.errorMessage ? (
                                                        <span className="text-red-600 font-medium">{record.errorMessage}</span>
                                                    ) : (
                                                        <span className="text-green-600 font-medium">Success</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-surface">
                                <div className="text-sm text-textLight">
                                    Page {pagination.page} of {pagination.pages}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => fetchHistory(pagination.page - 1)}
                                        disabled={pagination.page === 1}
                                        className="px-4 py-2 border border-border rounded-xl text-text font-medium hover:bg-white transition disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => fetchHistory(pagination.page + 1)}
                                        disabled={pagination.page === pagination.pages}
                                        className="px-4 py-2 border border-border rounded-xl text-text font-medium hover:bg-white transition disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64">
                            <AlertCircle size={48} className="text-textLight mb-4" />
                            <p className="text-textLight text-lg">No records found</p>
                            <p className="text-textLight text-sm">Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default History;