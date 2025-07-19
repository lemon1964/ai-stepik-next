// ai-chat-next/src/components/features/common/ModalTogglable.tsx
import { forwardRef, useImperativeHandle, useState, ReactNode } from "react";

interface ModalTogglableProps {
  buttonLabel: string;
  children: ReactNode;
}

/**
 * Управляемая модалка с кнопкой активации.
 * @param buttonLabel - Текст на триггерной кнопке
 * @param children - Контент модалки
 * @param ref - Ref для внешнего управления
 */
const ModalTogglable = forwardRef(({ buttonLabel, children }: ModalTogglableProps, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  // Позволяет управлять видимостью из родительского компонента
  useImperativeHandle(ref, () => ({
    toggleVisibility: () => setIsVisible((prev) => !prev),
  }));

  return (
    <div>
      {/* Триггерная кнопка */}
      {!isVisible && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={() => setIsVisible(true)}
        >
          {buttonLabel}
        </button>
      )}

      {/* Контент модалки */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {children}
            <button
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              onClick={() => setIsVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ModalTogglable.displayName = "ModalTogglable";
export default ModalTogglable;