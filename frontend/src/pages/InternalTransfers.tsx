import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftRight, Plus, Truck, CheckCircle2, RefreshCw, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { API_BASE_URL } from '../config/api';

export const InternalTransfers: React.FC = () => {
  const { user } = useAuth();
  const [transfers, setTransfers] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [sourceLoc, setSourceLoc] = useState('');
  const [destLoc, setDestLoc] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [transferQty, setTransferQty] = useState(1);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const [transRes, locRes, itemRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/transfers`),
        axios.get(`${API_BASE_URL}/api/locations`),
        axios.get(`${API_BASE_URL}/api/items`),
      ]);
      setTransfers(transRes.data);
      setLocations(locRes.data);
      setItems(itemRes.data);
    } catch (err: any) {
      setError('Failed to fetch transfers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleCreateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/api/transfers`, {
        sourceLocationId: sourceLoc,
        destinationLocationId: destLoc,
        itemId: selectedItem,
        quantity: transferQty,
      });
      setShowModal(false);
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Transfer request failed');
    }
  };

  const handleDispatch = async (id: string) => {
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/api/transfers/${id}/dispatch`);
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Dispatch failed');
    }
  };

  const handleReceive = async (id: string) => {
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/api/transfers/${id}/receive`);
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Receipt failed');
    }
  };

  const canManage = user?.role === 'ADMIN' || user?.role === 'OPERATIONS';

  // Calculated Summary Metrics
  const totalTransfers = transfers.length;
  const dispatchedTransfers = transfers.filter((t) => t.status === 'DISPATCHED').length;
  const completedTransfers = transfers.filter((t) => t.status === 'RECEIVED').length;

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
          <ArrowLeftRight size={16} color="#7c3aed" /> Inter-Warehouse Stock Transfer Pipeline
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" style={{ borderRadius: '9999px', padding: '0.5rem 1.1rem' }} onClick={fetchTransfers}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Sync Transfers
          </button>
          {canManage && (
            <button className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem' }} onClick={() => setShowModal(true)}>
              <Plus size={18} /> Request Transfer
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
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Total Transfer Requests</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            {totalTransfers} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Transfers</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <TrendingUp size={14} /> Total Inter-Location Movements
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>En Route (Dispatched)</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#7c3aed', marginBottom: '0.5rem' }}>
            {dispatchedTransfers} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>In Transit</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <Truck size={14} /> Source Inventory Reduced
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Completed Receipts</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', marginBottom: '0.5rem' }}>
            {completedTransfers} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Received</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <CheckCircle2 size={14} /> Destination Stock Increased
          </div>
        </div>
      </div>

      {/* Main Table Card Container - Fits 100% without horizontal scrollbar */}
      <div className="card" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Internal Stock Transfer Log</h3>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{transfers.length} Active Records</span>
        </div>

        <div className="table-container" style={{ overflowX: 'hidden' }}>
          <table style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '14%' }}>Transfer ID</th>
                <th style={{ width: '22%' }}>Source → Destination</th>
                <th style={{ width: '26%' }}>Item</th>
                <th style={{ textAlign: 'center', width: '10%' }}>Qty</th>
                <th style={{ width: '14%' }}>Status</th>
                <th style={{ width: '14%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    Loading transfer requests...
                  </td>
                </tr>
              ) : transfers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    No internal transfers recorded.
                  </td>
                </tr>
              ) : (
                transfers.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '0.35rem', color: '#7c3aed', fontWeight: 600, fontSize: '0.75rem' }}>{t.id.substring(0, 8)}</code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.sourceLocation.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>→ {t.destinationLocation.name}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#0284c7' }}>{t.item.sku}</div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                      {t.quantity}
                    </td>
                    <td>
                      <span className={`badge badge-${t.status.toLowerCase()}`}>{t.status}</span>
                    </td>
                    <td>
                      {canManage ? (
                        <div>
                          {t.status === 'REQUESTED' && (
                            <button
                              className="btn btn-warning"
                              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                              onClick={() => handleDispatch(t.id)}
                            >
                              <Truck size={13} /> Dispatch
                            </button>
                          )}
                          {t.status === 'DISPATCHED' && (
                            <button
                              className="btn btn-success"
                              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                              onClick={() => handleReceive(t.id)}
                            >
                              <CheckCircle2 size={13} /> Receive
                            </button>
                          )}
                          {t.status === 'RECEIVED' && (
                            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                              <CheckCircle2 size={13} /> Done
                            </span>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>View Only</span>
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
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Create Internal Stock Transfer</h3>
            <form onSubmit={handleCreateTransfer}>
              <div className="form-group">
                <label>Source Location (Stock will reduce on Dispatch)</label>
                <select required value={sourceLoc} onChange={(e) => setSourceLoc(e.target.value)}>
                  <option value="">Select Source Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Destination Location (Stock will increase on Receipt)</label>
                <select required value={destLoc} onChange={(e) => setDestLoc(e.target.value)}>
                  <option value="">Select Destination Location</option>
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
                <label>Quantity</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
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
                  Request Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
