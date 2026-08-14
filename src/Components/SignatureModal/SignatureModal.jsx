import React, { useRef, useState, useEffect } from 'react';
import { X, Pen, RotateCcw, Check } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureModal = ({ isOpen, onClose, onSign, clientName }) => {
  const sigCanvas = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (isOpen && sigCanvas.current) {
      sigCanvas.current.clear();
      setIsEmpty(true);
    }
  }, [isOpen]);

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsEmpty(true);
    }
  };

  const handleSign = () => {
    if (sigCanvas.current && !isEmpty) {
      const signatureData = sigCanvas.current.toDataURL();
      onSign(signatureData);
    }
  };

  const handleBegin = () => {
    setIsEmpty(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Sign Agreement</h3>
            <p className="text-sm text-gray-500 mt-1">Please sign below to continue</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Client Name Display */}
        {clientName && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              I, <span className="font-semibold text-gray-900">{clientName}</span>, agree to the terms and conditions
            </p>
          </div>
        )}

        {/* Signature Canvas */}
        <div className="relative mb-6">
          <div className="border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                className: 'w-full h-64 touch-none',
              }}
              onBegin={handleBegin}
            />
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-gray-400 pointer-events-none">
            <Pen className="w-4 h-4" />
            <span className="text-sm">Sign here</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
          <button
            onClick={handleSign}
            disabled={isEmpty}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              isEmpty
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#1a1a1a] hover:bg-black'
            }`}
          >
            <Check className="w-4 h-4" />
            Confirm Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;
