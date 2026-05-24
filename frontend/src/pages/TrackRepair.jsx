import { useState } from "react";
import { motion } from "framer-motion";
import { MdSearch, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { repairs, statusSteps } from "../data/dummy";
import StatusBadge from "../components/StatusBadge";
import PublicLayout from "../components/PublicLayout";

const stepIndex = { "Request Received": 0, Inspection: 1, "Waiting for Parts": 2, "Repair In Progress": 3, Completed: 4, Delivered: 5 };
const repairStep = { Pending: 0, Checking: 1, "Waiting for Parts": 2, Repairing: 3, Completed: 4, Delivered: 5 };

export default function TrackRepair() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = repairs.find((r) => r.id.toLowerCase() === query.toLowerCase() || r.phone === query);
    if (found) { setResult(found); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  };

  const currentStep = result ? repairStep[result.status] ?? 0 : 0;

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
              placeholder="Enter Ticket ID (e.g. MC-001) or Mobile Number"
              value={query} onChange={(e) => setQuery(e.target.value)} required />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold text-sm transition-colors">
              <MdSearch size={20} /> Track
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
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{result.id}</div>
                  </div>
                  <StatusBadge status={result.status} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-slate-400 text-xs">Customer</span><div className="font-medium text-slate-900 dark:text-white">{result.customer}</div></div>
                  <div><span className="text-slate-400 text-xs">Device</span><div className="font-medium text-slate-900 dark:text-white">{result.device}</div></div>
                  <div><span className="text-slate-400 text-xs">Issue</span><div className="font-medium text-slate-900 dark:text-white">{result.issue}</div></div>
                  <div><span className="text-slate-400 text-xs">Est. Completion</span><div className="font-medium text-slate-900 dark:text-white">{result.eta}</div></div>
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
                          {i < statusSteps.length - 1 && <div className={`w-0.5 h-8 mt-1 ${done ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`} />}
                        </div>
                        <div className="pb-6">
                          <div className={`font-medium text-sm ${active ? "text-blue-600 dark:text-blue-400" : done ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                            {step} {active && <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">Current</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {result.notes && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                  <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Technician Notes</div>
                  <div className="text-sm text-amber-800 dark:text-amber-300">{result.notes}</div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </PublicLayout>
  );
}
