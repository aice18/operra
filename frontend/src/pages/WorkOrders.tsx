import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipboardList, Plus, AlertTriangle, CheckCircle2 } from 'lucide-react';
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

  return (
    <div>
      <div className="header-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ClipboardList className="text-primary" size={28} />
          <span>Work Orders & Material Stock Check</span>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Create Work Order
          </button>
        )}
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Location</th>
                <th style={{ minWidth: '220px' }}>Item</th>
                <th style={{ textAlign: 'center', minWidth: '110px' }}>Required Qty</th>
                <th style={{ textAlign: 'center', minWidth: '120px' }}>Available Stock</th>
                <th style={{ minWidth: '190px' }}>Calculated Shortage</th>
                <th style={{ minWidth: '140px' }}>Status</th>
                <th style={{ minWidth: '150px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    Loading work orders...
                  </td>
                </tr>
              ) : workOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
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
                        <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{wo.location.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{wo.location.code}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, color: '#f1f5f9' }}>{wo.item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#a855f7' }}>{wo.item.sku}</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>
                        {wo.requiredQuantity}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: '#38bdf8' }}>
                        {wo.availableAtLocation}
                      </td>
                      <td>
                        {wo.shortageQuantity > 0 ? (
                          <span className="chip-shortage">
                            <AlertTriangle size={15} /> Shortage = {wo.shortageQuantity}
                          </span>
                        ) : (
                          <span className="chip-instock">
                            <CheckCircle2 size={15} /> In Stock
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${statusClass}`}>{wo.status}</span>
                      </td>
                      <td>
                        {canUpdateStatus && (
                          <select
                            value={wo.status}
                            onChange={(e) => updateStatus(wo.id, e.target.value)}
                          >
                            <option value="ASSIGNED">ASSIGNED</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
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
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Create New Work Order</h3>
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
                  className="btn"
                  style={{ background: 'var(--bg-input)' }}
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
