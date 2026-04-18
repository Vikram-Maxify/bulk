import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout"; 

const Dashboard = () => {
  return (
    <DashboardLayout>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {[
          { title: "Messages Sent", value: "12,450" },
          { title: "Campaigns", value: "24" },
          { title: "Delivery Rate", value: "98%" },
          { title: "Credits Left", value: "1,200" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white border border-border rounded-2xl p-6 shadow-sm"
          >
            <p className="text-sm text-textLight">{card.title}</p>
            <h3 className="text-2xl font-bold mt-2 text-text">
              {card.value}
            </h3>
          </div>
        ))}

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;