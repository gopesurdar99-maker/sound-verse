type Props = {
  status: string;
};

const steps = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "packed", label: "Packed" },
  { key: "dispatched", label: "Dispatched" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderTrackingTimeline({ status }: Props) {
  const cancelled = status === "cancelled";
  const currentIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 print:border-gray-300 print:bg-white">
      <h2 className="text-lg font-semibold text-white print:text-black">
        Order Tracking
      </h2>

      {cancelled ? (
        <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300 print:border-red-300 print:bg-red-50 print:text-red-700">
          This order has been cancelled by the store or customer.
        </div>
      ) : (
        <div className="mt-6">
          <div className="grid gap-4 md:grid-cols-6">
            {steps.map((step, index) => {
              const completed = index <= currentIndex;
              const active = index === currentIndex;

              return (
                <div key={step.key} className="relative flex flex-col items-center text-center">
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-4 hidden h-[2px] w-full md:block ${
                        index < currentIndex ? "bg-emerald-400/70" : "bg-white/10"
                      }`}
                      style={{ transform: "translateX(50%)" }}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                      completed
                        ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300 print:border-emerald-600 print:bg-emerald-100 print:text-emerald-800"
                        : "border-white/10 bg-zinc-900 text-zinc-400 print:border-gray-300 print:bg-gray-100 print:text-gray-500"
                    } ${active ? "ring-2 ring-emerald-400/30 print:ring-emerald-600" : ""}`}
                  >
                    {index + 1}
                  </div>

                  <p
                    className={`mt-3 text-xs font-medium md:text-sm ${
                      completed ? "text-white print:text-black" : "text-zinc-500 print:text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
