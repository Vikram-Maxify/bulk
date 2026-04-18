import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Filter, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import DashboardLayout from "../Layouts/DashboardLayout";
import api from "../services/api";

const History = () => {
  const { user } = useSelector((state) => state.auth);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sourceFiles, setSourceFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    sourceFile: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  });

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await api.get("/excel/my-users");

        const users = res.data.users || [];
        setAllData(users);

        const files = [...new Set(users.map((u) => u.sourceFile).filter(Boolean))];
        setSourceFiles(files);

        applyFilters(users, filters);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const applyFilters = (dataToFilter, filtersToApply) => {
    let filtered = dataToFilter;

    if (filtersToApply.status) {
      filtered = filtered.filter((u) => u.status === filtersToApply.status);
    }

    if (filtersToApply.sourceFile) {
      filtered = filtered.filter((u) => u.sourceFile === filtersToApply.sourceFile);
    }

    setFilteredData(filtered);

    const total = filtered.length;
    const pages = Math.ceil(total / pagination.limit);

    setPagination((prev) => ({
      ...prev,
      total,
      pages: pages || 1,
      page: 1,
    }));
  };

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

          <div className="grid md:grid-cols-2 gap-4 mb-4">

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-border rounded-xl"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
            </select>

            <select
              name="sourceFile"
              value={filters.sourceFile}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-border rounded-xl"
            >
              <option value="">All Files</option>
              {sourceFiles.map((file, i) => (
                <option key={i} value={file}>
                  {file}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 border border-border rounded-xl"
          >
            Reset Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden">

          {loading ? (
            <div className="h-64 flex items-center justify-center">
              Loading...
            </div>
          ) : displayedData.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Mobile</th>
                  <th className="px-4 py-2">File</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>

              <tbody>
                {displayedData.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{r.name}</td>
                    <td className="px-4 py-2">{r.mobile}</td>
                    <td className="px-4 py-2">{r.sourceFile}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {getStatusIcon(r.status)}
                      {r.status}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // ✅ FIXED EMPTY STATE (no duplicate div)
            <div className="flex flex-col items-center justify-center h-64">
              <AlertCircle size={48} className="text-textLight mb-4" />
              <p>No records found</p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default History;