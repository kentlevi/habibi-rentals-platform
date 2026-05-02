import React, { useState, useEffect } from 'react';
import { LayoutDashboard, LogIn, Clock, Zap, ShieldCheck, MapPin, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { auth, loginWithGoogle } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isAdmin = user?.email === 'skaelex1@gmail.com' || user?.email === 'shaun.crissa@example.com';

  if (loading) {
    return <div className="min-h-screen bg-brand-surface flex items-center justify-center font-semibold text-brand-dark">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-brand-border max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold text-brand-dark mb-2">Admin Portal</h1>
          <p className="text-brand-text-muted text-sm font-medium mb-8">
            Please sign in with your administrator account to access fleet management.
          </p>
          
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-brand-dark text-white px-6 py-4 rounded-xl font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-brand-primary transition-all shadow-lg active:scale-95"
          >
            <UserIcon className="w-5 h-5" />
            Sign in with Google
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-6 text-xs font-semibold text-brand-text-muted uppercase tracking-widest hover:text-brand-dark transition-colors"
          >
            Return to Public Site
          </button>
        </div>
      </div>
    );
  }

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
          <button className="bg-brand-surface border border-brand-border px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest text-brand-dark hover:bg-[#E8E6E1] transition-colors">Export CSV</button>
          <button onClick={() => navigate('/')} className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-brand-primary/20 transition-colors">Client View</button>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
           <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                 <Clock className="w-5 h-5" />
               </div>
               <h3 className="text-[11px] font-semibold uppercase text-brand-text-muted tracking-widest">Today's Pickups</h3>
             </div>
             <div className="font-sans text-4xl font-semibold text-brand-dark">14</div>
           </div>
           <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-[#FF8000]/10 text-[#FF8000] rounded-xl flex items-center justify-center">
                 <Zap className="w-5 h-5" />
               </div>
               <h3 className="text-[11px] font-semibold uppercase text-brand-text-muted tracking-widest">Active Rentals</h3>
             </div>
             <div className="font-sans text-4xl font-semibold text-brand-dark">28</div>
           </div>
           <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5" />
               </div>
               <h3 className="text-[11px] font-semibold uppercase text-brand-text-muted tracking-widest">Available Units</h3>
             </div>
             <div className="font-sans text-4xl font-semibold text-brand-primary">6</div>
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
                {[
                  { name: 'John Miller', vehicle: 'Honda Click 125i', loc: 'Siquijor Port', time: '09:30 AM', status: 'Pending Pickup' },
                  { name: 'Sarah Wilson', vehicle: 'Toyota Innova', loc: 'Larena Port', time: '11:00 AM', status: 'Confirmed' },
                  { name: ' Habibi Guest', vehicle: 'Suzuki Jimny', loc: 'Coco Grove', time: '02:00 PM', status: 'Ready' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-brand-surface transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-brand-dark">{row.name}</td>
                    <td className="px-6 py-4 text-brand-text-muted">{row.vehicle}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-brand-primary" />
                      {row.loc}
                    </td>
                    <td className="px-6 py-4 text-brand-dark">{row.time}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-semibold uppercase tracking-widest border border-brand-primary/20">
                        {row.status}
                      </span>
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
      </main>
    </div>
  );
}
