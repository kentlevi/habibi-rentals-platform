import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Clock, Car, ShieldCheck, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { ADMIN_EMAILS, TEST_ADMIN_BYPASS } from '../config';
import { VEHICLES } from '../constants';
import { DemoRequestRecord, getStoredFleetStatuses, getStoredInquiries, getStoredRequests, RequestStatus, saveStoredFleetStatuses, saveStoredRequests, StoredInquiry, UnitStatus } from '../lib/operations';

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fleetStatuses, setFleetStatuses] = useState<Record<string, UnitStatus>>(
    () => getStoredFleetStatuses(Object.fromEntries(VEHICLES.map(vehicle => [vehicle.id, vehicle.status || 'available'])))
  );
  const [demoRequests, setDemoRequests] = useState<DemoRequestRecord[]>(() => getStoredRequests([
    { id: 'req-1', name: 'Maya Santos', vehicleId: VEHICLES[6].id, vehicleName: VEHICLES[6].model_name, loc: 'Siquijor Port', time: '09:30 AM', status: 'New Inquiry' },
    { id: 'req-2', name: 'Liam Cooper', vehicleId: VEHICLES[4].id, vehicleName: VEHICLES[4].model_name, loc: 'San Juan Beach Area', time: '11:00 AM', status: 'Confirm Deposit' },
    { id: 'req-3', name: 'Ana & Group', vehicleId: VEHICLES[0].id, vehicleName: VEHICLES[0].model_name, loc: 'Larena Port', time: '02:00 PM', status: 'Driver Assigned' },
  ]));
  const [storedInquiries, setStoredInquiries] = useState<StoredInquiry[]>(() => getStoredInquiries());
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isAdmin = user?.email ? ADMIN_EMAILS.includes(user.email) : false;
  const hasAdminAccess = TEST_ADMIN_BYPASS || isAdmin;
  const availableUnits = VEHICLES.filter(vehicle => fleetStatuses[vehicle.id] === 'available').length;
  const selfDriveUnits = VEHICLES.filter(vehicle => vehicle.transmission !== 'With Driver').length;
  const withDriverUnits = VEHICLES.filter(vehicle => vehicle.transmission === 'With Driver').length;
  const requestStatuses: RequestStatus[] = ['New Inquiry', 'Confirm Deposit', 'Driver Assigned', 'Picked Up', 'Returned'];
  const unitStatuses: UnitStatus[] = ['available', 'maintenance', 'retired'];

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setDemoRequests(prev => {
      const next = prev.map(request => request.id === id ? { ...request, status } : request);
      saveStoredRequests(next);
      return next;
    });
  };

  const updateFleetStatus = (id: string, status: UnitStatus) => {
    setFleetStatuses(prev => {
      const next = { ...prev, [id]: status };
      saveStoredFleetStatuses(next);
      return next;
    });
  };

  const refreshInquiries = () => {
    setStoredInquiries(getStoredInquiries());
  };

  if (loading && !TEST_ADMIN_BYPASS) {
    return <div className="min-h-screen bg-brand-surface flex items-center justify-center font-semibold text-brand-dark">Loading...</div>;
  }

  if (!hasAdminAccess) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="bg-white border-b border-brand-border px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-dark text-white rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-brand-dark leading-tight">Habibi & Shaun</h1>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-primary">Fleet Command</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="min-h-10 rounded-lg border border-brand-border bg-brand-surface px-4 text-sm font-semibold text-brand-dark transition-colors hover:bg-[#E8E6E1]">Export CSV</button>
          <button onClick={() => navigate('/')} className="min-h-10 rounded-lg bg-brand-primary/10 px-4 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/20">Client view</button>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="mt-4 mb-8 rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-primary mb-2">Operations</div>
          <h2 className="text-2xl font-semibold text-brand-dark tracking-tight mb-2">From booking inquiry to daily pickup board.</h2>
          <p className="text-sm font-medium leading-relaxed text-brand-text-muted max-w-3xl">
            Manage booking requests, fleet availability, driver assignments, and document checks from one private admin area.
          </p>
          {TEST_ADMIN_BYPASS && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
              Testing access is enabled. Turn off TEST_ADMIN_BYPASS before using this dashboard as a private admin area.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
           <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                 <Clock className="w-5 h-5" />
               </div>
               <h3 className="text-[11px] font-semibold uppercase text-brand-text-muted tracking-widest">Today's Pickups</h3>
             </div>
             <div className="font-sans text-4xl font-semibold text-brand-dark">{demoRequests.length}</div>
           </div>
           <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-brand-secondary/10 text-brand-secondary rounded-xl flex items-center justify-center">
                 <Car className="w-5 h-5" />
               </div>
               <h3 className="text-[11px] font-semibold uppercase text-brand-text-muted tracking-widest">Self-Drive Units</h3>
             </div>
             <div className="font-sans text-4xl font-semibold text-brand-dark">{selfDriveUnits}</div>
           </div>
           <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5" />
               </div>
               <h3 className="text-[11px] font-semibold uppercase text-brand-text-muted tracking-widest">Available Units</h3>
             </div>
             <div className="font-sans text-4xl font-semibold text-brand-primary">{availableUnits}</div>
             <p className="text-xs font-semibold text-brand-text-muted mt-2">{withDriverUnits} with-driver vans</p>
           </div>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-brand-border flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
            <h4 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">Today's Schedule - {format(new Date(), 'MMMM d, yyyy')}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-brand-surface text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] border-b border-brand-border">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-sm font-medium">
                {demoRequests.map((row) => (
                  <tr key={row.id} className="hover:bg-brand-surface transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-brand-dark">{row.name}</td>
                    <td className="px-6 py-4 text-brand-text-muted">{row.vehicleName}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-brand-primary" />
                      {row.loc}
                    </td>
                    <td className="px-6 py-4 text-brand-dark">{row.time}</td>
                    <td className="px-6 py-4">
                      <select
                        value={row.status}
                        onChange={(event) => updateRequestStatus(row.id, event.target.value as RequestStatus)}
                        className="min-h-10 rounded-lg border border-brand-border bg-brand-surface px-3 text-sm font-semibold text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
                      >
                        {requestStatuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-primary bg-white shadow-sm">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-primary mb-2">Website Inquiry Inbox</div>
              <h4 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">Recent Public Form Submissions</h4>
            </div>
            <button
              onClick={refreshInquiries}
              className="min-h-10 w-fit rounded-lg border border-brand-border bg-brand-surface px-4 text-sm font-semibold text-brand-dark transition-colors hover:bg-[#E8E6E1]"
            >
              Refresh
            </button>
          </div>

          {storedInquiries.length === 0 ? (
            <div className="p-8 text-sm font-medium text-brand-text-muted">
              No local inquiries yet. Submit the public booking request form, then return here and click Refresh.
            </div>
          ) : (
            <div className="divide-y divide-brand-border">
              {storedInquiries.slice(0, 6).map((inquiry) => (
                <div key={inquiry.id} className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-5">
                  <div>
                    <div className="text-sm font-semibold text-brand-dark">{inquiry.customerName || 'Unnamed guest'}</div>
                    <div className="text-xs font-medium text-brand-text-muted mt-1">{inquiry.contact || 'No contact provided'}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mt-3">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-dark">{inquiry.vehicleName}</div>
                    <div className="text-xs font-medium text-brand-text-muted mt-1">
                      {inquiry.pickupLocation} · {inquiry.startDate} to {inquiry.endDate}
                    </div>
                    {inquiry.notes && (
                      <div className="text-xs font-medium text-brand-text-muted mt-3 line-clamp-2">{inquiry.notes}</div>
                    )}
                  </div>
                  <span className="h-fit rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-brand-primary">
                    Saved Inquiry
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-primary mb-2">Fleet Availability Controls</div>
              <h4 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">Fleet Board</h4>
            </div>
            <p className="text-xs font-semibold text-brand-text-muted">Availability changes are saved locally in this version.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {VEHICLES.map(vehicle => (
              <div key={vehicle.id} className="p-5 border-b md:border-r border-brand-border">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h5 className="text-sm font-semibold text-brand-dark">{vehicle.model_name}</h5>
                    <p className="text-xs font-medium text-brand-text-muted mt-1 capitalize">{vehicle.type} - {vehicle.transmission}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest ${
                    fleetStatuses[vehicle.id] === 'available'
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : fleetStatuses[vehicle.id] === 'maintenance'
                        ? 'bg-amber-50 text-amber-700 border border-amber-100'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {fleetStatuses[vehicle.id]}
                  </span>
                </div>
                <select
                  value={fleetStatuses[vehicle.id]}
                  onChange={(event) => updateFleetStatus(vehicle.id, event.target.value as UnitStatus)}
                  className="min-h-11 w-full rounded-xl border border-brand-border bg-brand-surface px-3 text-sm font-semibold text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
                >
                  {unitStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
