import React, { useState } from 'react';
import { X, Key, Shield, ExternalLink, Check } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../../services/aiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

export const ApiKeySettingsModal: React.FC<Props> = ({ isOpen, onClose, onKeyUpdated }) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredApiKey(apiKey);
    setSaved(true);
    onKeyUpdated();
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    onKeyUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Engine Configuration</h3>
              <p className="text-xs text-slate-400">Google Gemini API & Local Heuristic Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Callout */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-white">Dual AI Architecture:</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            ResuCraft AI works <strong className="text-emerald-400">100% offline out-of-the-box</strong> with our built-in intelligent rule-based STAR generator!
            Adding your Gemini API key activates deep multi-turn LLM reasoning.
          </p>
        </div>

        {/* Input */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Google Gemini API Key (Optional)
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
          <div className="flex justify-between items-center mt-1.5 text-[11px] text-slate-500">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <span>Get a free key from Google AI Studio</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-rose-400 hover:underline"
              >
                Clear key
              </button>
            )}
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2 px-4 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <span>Save & Connect Engine</span>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
