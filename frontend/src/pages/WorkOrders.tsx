import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipboardList, Plus, AlertTriangle, CheckCircle2, RefreshCw, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const WorkOrders: React.FC = () => {
  const { user } = useAuth();
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [requiredQty, setRequiredQty] = useState(1);

  const fetchWorkOrders = async () => {
    setLoading(true);
    try {
      const [woRes, locRes, itemRes] = await Promise.all([
        axios.get('http://localhost:5000/api/work-orders'),
        axios.get('http://localhost:5000/api/locations'),
        axios.get('http://localhost:5000/api/items'),
      ]);
      setWorkOrders(woRes.data);
      setLocations(locRes.data);
      setItems(itemRes.data);
    } catch (err: any) {
      setError('Failed to load Work Orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const handleCreateWorkOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/work-orders', {
        locationId: selectedLocation,
        itemId: selectedItem,
        requiredQuantity: requiredQty,
        assignedUserId: user?.id,
      });
      setShowModal(false);
      fetchWorkOrders();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create work order');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/work-orders/${id}/status`, { status });
      fetchWorkOrders();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Status update failed');
    }
  };

  const isAdmin = user?.role === 'ADMIN';
  const canUpdateStatus = user?.role === 'ADMIN' || user?.role === 'OPERATIONS';

  // Calculated Summary Metrics
  const totalWorkOrders = workOrders.length;
  const inProgressOrders = workOrders.filter((w) => w.status === 'IN_PROGRESS' || w.status === 'ASSIGNED').length;
  const totalShortage = workOrders.reduce((sum, wo) => sum + (wo.shortageQuantity || 0), 0);

  return (
    <div>
      {/* Top Action & Filter Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.75rem'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#0f172a'
        }}>
          <ClipboardList size={16} color="#7c3aed" /> Production Work Orders & Material Stock Check
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" style={{ borderRadius: '9999px', padding: '0.5rem 1.1rem' }} onClick={fetchWorkOrders}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh Orders
          </button>
          {isAdmin && (
            <button className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem' }} onClick={() => setShowModal(true)}>
              <Plus size={18} /> Create Work Order
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {/* Top 3 KPI Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Total Work Orders</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            {totalWorkOrders} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Orders</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <TrendingUp size={14} /> Registered Production Orders
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Active Orders</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#7c3aed', marginBottom: '0.5rem' }}>
            {inProgressOrders} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>In Progress</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <TrendingUp size={14} /> Assigned to Operations
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Total Calculated Shortage</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: totalShortage > 0 ? '#dc2626' : '#059669', marginBottom: '0.5rem' }}>
            {totalShortage.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Units</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: totalShortage > 0 ? '#fef2f2' : '#ecfdf5', color: totalShortage > 0 ? '#dc2626' : '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            {totalShortage > 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />} {totalShortage > 0 ? 'Requires internal transfer' : 'Full Material Available'}
          </div>
        </div>
      </div>

      {/* Main Table Card Container - Fits 100% without horizontal scrollbar */}
      <div className="card" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Work Orders & Material Stock Matrix</h3>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{workOrders.length} Active Records</span>
        </div>

        <div className="table-container" style={{ overflowX: 'hidden' }}>
          <table style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Location</th>
                <th style={{ width: '24%' }}>Item</th>
                <th style={{ textAlign: 'center', width: '10%' }}>Req Qty</th>
                <th style={{ textAlign: 'center', width: '10%' }}>Avail Qty</th>
                <th style={{ width: '18%' }}>Stock Shortage</th>
                <th style={{ width: '16%' }}>Status & Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    Loading work orders...
                  </td>
                </tr>
              ) : workOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    No work orders created yet.
                  </td>
                </tr>
              ) : (
                workOrders.map((wo) => {
                  const statusClass =
                    wo.status === 'ASSIGNED'
                      ? 'badge-status-assigned'
                      : wo.status === 'IN_PROGRESS'
                      ? 'badge-status-in-progress'
                      : 'badge-status-completed';

                  return (
                    <tr key={wo.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{wo.location.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{wo.location.code}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{wo.item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#7c3aed' }}>{wo.item.sku}</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                        {wo.requiredQuantity}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#0284c7' }}>
                        {wo.availableAtLocation}
                      </td>
                      <td>
                        {wo.shortageQuantity > 0 ? (
                          <span className="chip-shortage" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                            <AlertTriangle size={13} /> Shortage = {wo.shortageQuantity}
                          </span>
                        ) : (
                          <span className="chip-instock" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                            <CheckCircle2 size={13} /> In Stock
                          </span>
                        )}
                      </td>
                      <td>
                        {canUpdateStatus ? (
                          <select
                            value={wo.status}
                            style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: '100%' }}
                            onChange={(e) => updateStatus(wo.id, e.target.value)}
                          >
                            <option value="ASSIGNED">ASSIGNED</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        ) : (
                          <span className={`badge ${statusClass}`}>{wo.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Create New Work Order</h3>
            <form onSubmit={handleCreateWorkOrder}>
              <div className="form-group">
                <label>Location</label>
                <select
                  required
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Select Target Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Required Item</label>
                <select
                  required
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                >
                  <option value="">Select Item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Required Quantity</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={requiredQty}
                  onChange={(e) => setRequiredQty(Number(e.target.value))}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
