// ai-chat-next/src/components/ui/common/Unicorn.tsx
import React from "react";

const Unicorn = () => {
  return (
    <div className="flex-1 p-4 space-y-4 animate-pulse">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("/images/unicorn-1080x1920.jpg")`}}
      />
    </div>
  );
};

export default Unicorn;
