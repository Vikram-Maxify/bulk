import React from "react";
import { MessageSquare, Bot, Users, BarChart3, Plug } from "lucide-react";

const features = [
    {
        title: "Bulk Messaging",
        desc: "Send messages to thousands of users in one click.",
        icon: MessageSquare,
    },
    {
        title: "Smart Automation",
        desc: "Automate replies and workflows with ease.",
        icon: Bot,
    },
    {
        title: "Contact Management",
        desc: "Organize and manage your customer data efficiently.",
        icon: Users,
    },
    {
        title: "Campaign Analytics",
        desc: "Track performance with detailed insights.",
        icon: BarChart3,
    },
    {
        title: "WhatsApp API Integration",
        desc: "Connect with official WhatsApp API easily.",
        icon: Plug,
    },
];

const Features = () => {
    return (
        <section className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-10 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
                        Powerful Features for Your Growth
                    </h2>
                    <p className="text-textLight mt-3 text-sm sm:text-base max-w-xl mx-auto">
                        Everything you need to run WhatsApp marketing like a pro.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="p-5 sm:p-6 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition hover:-translate-y-1"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                                    <Icon size={20} />
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-text text-base sm:text-lg">
                                    {feature.title}
                                </h3>

                                {/* Desc */}
                                <p className="text-sm text-textLight mt-2 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default Features;