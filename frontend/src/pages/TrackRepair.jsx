import { useState } from "react";
import { motion } from "framer-motion";
import { MdSearch, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import StatusBadge from "../components/StatusBadge";
import PublicLayout from "../components/PublicLayout";

const API = "http://localhost:8080";
const WHATSAPP = "919074037326";

// Map backend RepairStatus enum → timeline step index
const repairStep = {
  PENDING: 0,
  CHECKING: 1,
  WAITING_FOR_PARTS: 2,
  REPAIRING: 3,
  COMPLETED: 4,
  DELIVERED: 5,
};

// Map backend status → display label for StatusBadge
const statusLabel = {
  PENDING: "Pending",
  CHECKING: "Checking",
  WAITING_FOR_PARTS: "Waiting for Parts",
  REPAIRING: "Repairing",
  COMPLETED: "Completed",
  DELIVERED: "Delivered",
};

const statusSteps = [
  "Request Received",
  "Inspection",
  "Waiting for Parts",
  "Repair In Progress",
  "Completed",
  "Delivered",
];

export default function TrackRepair() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setResult(null);
    try {
      const res = await axios.get(`${API}/api/repairs/track`, { params: { query } });
      setResult(res.data);
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = result ? repairStep[result.status] ?? 0 : 0;
  const displayStatus = result ? (statusLabel[result.status] ?? result.status) : "";

  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Track Your Repair</h1>
            <p className="text-slate-500 dark:text-slate-400">Enter your ticket number or mobile number to check status</p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <input
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Ticket ID (e.g. MC-250528-1234) or Mobile Number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold text-sm transition-colors">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <MdSearch size={20} />}
              Track
            </button>
          </form>

          {notFound && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center text-red-600 dark:text-red-400 text-sm">
              No repair found with that ticket ID or phone number.
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Info Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Ticket ID</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{result.ticketId}</div>
                  </div>
                  <StatusBadge status={displayStatus} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs">Customer</span>
                    <div className="font-medium text-slate-900 dark:text-white">{result.customerName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Device</span>
                    <div className="font-medium text-slate-900 dark:text-white">{result.deviceBrand} {result.deviceModel}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Issue</span>
                    <div className="font-medium text-slate-900 dark:text-white">{result.issueCategory}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Est. Completion</span>
                    <div className="font-medium text-slate-900 dark:text-white">
                      {result.estimatedCompletion ?? "To be confirmed"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Repair Timeline</h3>
                <div className="flex flex-col gap-0">
                  {statusSteps.map((step, i) => {
                    const done = i <= currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={step} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${done ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}`}>
                            {done ? <MdCheckCircle size={20} /> : <MdRadioButtonUnchecked size={20} />}
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div className={`w-0.5 h-8 mt-1 ${done ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`} />
                          )}
                        </div>
                        <div className="pb-6">
                          <div className={`font-medium text-sm ${active ? "text-blue-600 dark:text-blue-400" : done ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                            {step}
                            {active && (
                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {result.technicianNotes && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                  <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Technician Notes</div>
                  <div className="text-sm text-amber-800 dark:text-amber-300">{result.technicianNotes}</div>
                </div>
              )}

              {/* WhatsApp follow-up */}
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I want to follow up on my repair. Ticket ID: *${result.ticketId}*`)}`}
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors w-full">
                <FaWhatsapp size={18} /> Follow Up on WhatsApp
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PublicLayout>
  );
}
