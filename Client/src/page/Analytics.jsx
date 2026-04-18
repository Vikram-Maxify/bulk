import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout"; 

const Analytics = () => {
  return (
    <DashboardLayout>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {[
          { title: "Messages Sent", value: "12,450" },
          { title: "Open Rate", value: "82%" },
          { title: "Click Rate", value: "45%" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-border rounded-2xl p-6 shadow-sm"
          >
            <p className="text-sm text-textLight">{item.title}</p>
            <h3 className="text-2xl font-bold mt-2 text-text">
              {item.value}
            </h3>
          </div>
        ))}

      </div>

    </DashboardLayout>
  );
};

export default Analytics;