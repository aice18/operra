import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftRight, Plus, Truck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
        axios.get('http://localhost:5000/api/transfers'),
        axios.get('http://localhost:5000/api/locations'),
        axios.get('http://localhost:5000/api/items'),
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
      await axios.post('http://localhost:5000/api/transfers', {
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
      await axios.post(`http://localhost:5000/api/transfers/${id}/dispatch`);
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Dispatch failed');
    }
  };

  const handleReceive = async (id: string) => {
    setError('');
    try {
      await axios.post(`http://localhost:5000/api/transfers/${id}/receive`);
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Receipt failed');
    }
  };

  const canManage = user?.role === 'ADMIN' || user?.role === 'OPERATIONS';

  return (
    <div>
      <div className="header-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ArrowLeftRight className="text-primary" size={28} />
          <span>Internal Stock Transfers</span>
        </div>
        {canManage && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Request Transfer
          </button>
        )}
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transfer ID</th>
                <th>Source Location</th>
                <th>Destination Location</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                    Loading transfer requests...
                  </td>
                </tr>
              ) : transfers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                    No internal transfers recorded.
                  </td>
                </tr>
              ) : (
                transfers.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <code>{t.id.substring(0, 8)}...</code>
                    </td>
                    <td>
                      <strong>{t.sourceLocation.name}</strong>
                    </td>
                    <td>
                      <strong>{t.destinationLocation.name}</strong>
                    </td>
                    <td>{t.item.name}</td>
                    <td style={{ fontWeight: 600 }}>{t.quantity}</td>
                    <td>
                      <span className={`badge badge-${t.status.toLowerCase()}`}>{t.status}</span>
                    </td>
                    <td>
                      {canManage && (
                        <div>
                          {t.status === 'REQUESTED' && (
                            <button
                              className="btn btn-warning"
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                              onClick={() => handleDispatch(t.id)}
                            >
                              <Truck size={14} /> Dispatch
                            </button>
                          )}
                          {t.status === 'DISPATCHED' && (
                            <button
                              className="btn btn-success"
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                              onClick={() => handleReceive(t.id)}
                            >
                              <CheckCircle2 size={14} /> Receive Stock
                            </button>
                          )}
                          {t.status === 'RECEIVED' && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-success)', fontWeight: 600 }}>
                              Completed
                            </span>
                          )}
                        </div>
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
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Create Internal Stock Transfer</h3>
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
                  className="btn"
                  style={{ background: 'var(--bg-input)' }}
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
