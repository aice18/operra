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
                <th>Location</th>
                <th>Item</th>
                <th>Required Qty</th>
                <th>Available Stock</th>
                <th>Calculated Shortage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                    Loading work orders...
                  </td>
                </tr>
              ) : workOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                    No work orders created yet.
                  </td>
                </tr>
              ) : (
                workOrders.map((wo) => (
                  <tr key={wo.id}>
                    <td>
                      <strong>{wo.location.name}</strong>
                    </td>
                    <td>{wo.item.name}</td>
                    <td style={{ fontWeight: 600 }}>{wo.requiredQuantity}</td>
                    <td style={{ fontWeight: 600 }}>{wo.availableAtLocation}</td>
                    <td>
                      {wo.shortageQuantity > 0 ? (
                        <span style={{ color: 'var(--accent-danger)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertTriangle size={16} /> Shortage = {wo.shortageQuantity}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--accent-success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CheckCircle2 size={16} /> In Stock
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="badge badge-ops">{wo.status}</span>
                    </td>
                    <td>
                      {canUpdateStatus && (
                        <select
                          value={wo.status}
                          onChange={(e) => updateStatus(wo.id, e.target.value)}
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}
                        >
                          <option value="ASSIGNED">ASSIGNED</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))
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
