export default function CheckoutSteps({ currentStep = 2 }) {
  // Steps: 1: Cart, 2: Payment, 3: Shipping, 4: Review
  const steps = [
    { num: 1, label: 'Cart' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Shipping' },
    { num: 4, label: 'Review' },
  ];

  return (
    <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto py-2">
      {steps.map((step) => {
        const isCompleted = step.num < currentStep;
        const isActive = step.num === currentStep;

        return (
          <div key={step.num} className="flex items-center gap-2.5 shrink-0">
            {isCompleted ? (
              <span className="w-5 h-5 bg-[#10131E] text-white text-xs font-bold rounded flex items-center justify-center">
                ✓
              </span>
            ) : isActive ? (
              <span className="w-5 h-5 bg-[#10131E] text-white text-xs font-bold rounded flex items-center justify-center">
                {step.num}
              </span>
            ) : (
              <span className="w-5 h-5 bg-[#D5D0C5] text-white text-xs font-bold rounded flex items-center justify-center">
                {step.num}
              </span>
            )}
            <span
              className={`text-xs sm:text-sm ${
                isActive
                  ? 'font-bold text-[#10131E]'
                  : isCompleted
                  ? 'font-medium text-[#10131E]'
                  : 'font-medium text-[#7E8594]'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

