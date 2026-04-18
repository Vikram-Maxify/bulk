import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout"; 

const Contacts = () => {
    return (
        <DashboardLayout>
            <div className="bg-white border border-border rounded-2xl p-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-text">Contacts</h2>

                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm">
                        Upload CSV
                    </button>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search contacts..."
                    className="w-full mb-4 px-4 py-2 border border-border rounded-xl focus:outline-none"
                />

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-textLight">
                            <tr>
                                <th className="text-left py-2">Name</th>
                                <th className="text-left py-2">Phone</th>
                                <th className="text-left py-2">Tags</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[1, 2, 3].map((_, i) => (
                                <tr key={i} className="border-t border-border">
                                    <td className="py-3">User {i + 1}</td>
                                    <td>+91 987654321{i}</td>
                                    <td>
                                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-lg">
                                            Lead
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default Contacts;