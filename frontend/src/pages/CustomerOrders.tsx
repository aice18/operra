import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Plus, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CustomerOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [orderQty, setOrderQty] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const [ordRes, locRes, itemRes] = await Promise.all([
        axios.get('http://localhost:5000/api/customer-orders'),
        axios.get('http://localhost:5000/api/locations'),
        axios.get('http://localhost:5000/api/items'),
      ]);
      setOrders(ordRes.data);
      setLocations(locRes.data);
      setItems(itemRes.data);
    } catch (err: any) {
      setError('Failed to fetch customer orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/customer-orders', {
        items: [
          {
            locationId: selectedLocation,
            itemId: selectedItem,
            quantity: orderQty,
          },
        ],
      });
      setShowModal(false);
      fetchOrders();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Stock reservation failed');
    }
  };

  const canCreate = user?.role === 'ADMIN' || user?.role === 'SALES';

  return (
    <div>
      <div className="header-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShoppingBag className="text-primary" size={28} />
          <span>Customer Orders & Stock Reservation</span>
        </div>
        {canCreate && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> New Order & Reserve Stock
          </button>
        )}
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Created By</th>
                <th>Reserved Items</th>
                <th>Total Reserved Qty</th>
                <th>Status</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    Loading customer orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    No customer orders created yet.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <code>{ord.orderNumber}</code>
                    </td>
                    <td>
                      <strong>{ord.createdBy.name}</strong> ({ord.createdBy.email})
                    </td>
                    <td>
                      {ord.orderItems.map((oi: any) => (
                        <div key={oi.id}>
                          {oi.item.name} ({oi.quantity} units)
                        </div>
                      ))}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {ord.orderItems.reduce((acc: number, item: any) => acc + item.quantity, 0)}
                    </td>
                    <td>
                      <span className="badge badge-ops" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ShieldCheck size={14} /> {ord.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(ord.createdAt).toLocaleString()}
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
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Create Order & Reserve Stock</h3>
            <form onSubmit={handleCreateOrder}>
              <div className="form-group">
                <label>Target Stock Location</label>
                <select required value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Item</label>
                <select required value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                  <option value="">Select Item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Quantity to Reserve</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={orderQty}
                  onChange={(e) => setOrderQty(Number(e.target.value))}
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
                  Reserve Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
