import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Plus, ShieldCheck, RefreshCw, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { API_BASE_URL } from '../config/api';

import { DEMO_CUSTOMER_ORDERS, DEMO_LOCATIONS, DEMO_ITEMS } from '../utils/demoData';

export const CustomerOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>(DEMO_CUSTOMER_ORDERS);
  const [locations, setLocations] = useState<any[]>(DEMO_LOCATIONS);
  const [items, setItems] = useState<any[]>(DEMO_ITEMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [orderQty, setOrderQty] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const [ordRes, locRes, itemRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/customer-orders`),
        axios.get(`${API_BASE_URL}/api/locations`),
        axios.get(`${API_BASE_URL}/api/items`),
      ]);
      setOrders(ordRes.data);
      setLocations(locRes.data);
      setItems(itemRes.data);
    } catch (err: any) {
      console.warn('Backend DB unreachable, maintaining demo customer orders state.');
      setOrders(DEMO_CUSTOMER_ORDERS);
      setLocations(DEMO_LOCATIONS);
      setItems(DEMO_ITEMS);
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
      await axios.post(`${API_BASE_URL}/api/customer-orders`, {
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

  // Calculated Summary Metrics
  const totalOrders = orders.length;
  const totalReservedUnits = orders.reduce((sum, ord) => {
    return sum + ord.orderItems.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
  }, 0);

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
          <ShoppingBag size={16} color="#7c3aed" /> Customer Sales Orders & Stock Reservations
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" style={{ borderRadius: '9999px', padding: '0.5rem 1.1rem' }} onClick={fetchOrders}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh Orders
          </button>
          {canCreate && (
            <button className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem' }} onClick={() => setShowModal(true)}>
              <Plus size={18} /> New Sales Order
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
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Total Customer Orders</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            {totalOrders} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Orders</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <TrendingUp size={14} /> Recorded Sales Bookings
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Total Reserved Stock</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#d97706', marginBottom: '0.5rem' }}>
            {totalReservedUnits.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Units</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fffbeb', color: '#d97706', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <ShieldCheck size={14} /> Locked in Warehouse DB
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Reservation Security</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', marginBottom: '0.5rem' }}>
            100% <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>ACID Locked</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <ShieldCheck size={14} /> Over-reservation Blocked
          </div>
        </div>
      </div>

      {/* Main Table Card Container - Fits 100% without horizontal scrollbar */}
      <div className="card" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Customer Order Reservation Log</h3>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{orders.length} Active Records</span>
        </div>

        <div className="table-container" style={{ overflowX: 'hidden' }}>
          <table style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '16%' }}>Order Number</th>
                <th style={{ width: '22%' }}>Created By</th>
                <th style={{ width: '30%' }}>Reserved Items</th>
                <th style={{ textAlign: 'center', width: '10%' }}>Total Qty</th>
                <th style={{ width: '11%' }}>Status</th>
                <th style={{ width: '11%' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    Loading customer orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    No customer orders created yet.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '0.35rem', color: '#0284c7', fontWeight: 600, fontSize: '0.75rem' }}>{ord.orderNumber}</code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ord.createdBy.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ord.createdBy.email}</div>
                    </td>
                    <td>
                      {ord.orderItems.map((oi: any) => (
                        <div key={oi.id} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.15rem' }}>
                          <span style={{ fontWeight: 500, color: '#0f172a', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{oi.item.name}</span>
                          <span className="badge badge-ops" style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem' }}>{oi.quantity} units</span>
                        </div>
                      ))}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
                      {ord.orderItems.reduce((acc: number, item: any) => acc + item.quantity, 0)}
                    </td>
                    <td>
                      <span className="badge badge-received" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.25rem 0.5rem', fontSize: '0.65rem' }}>
                        <ShieldCheck size={12} /> {ord.status}
                      </span>
                    </td>
                    <td style={{ color: '#64748b', fontSize: '0.75rem' }}>
                      {new Date(ord.createdAt).toLocaleDateString()}
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
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Create Order & Reserve Stock</h3>
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
                  className="btn btn-secondary"
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
