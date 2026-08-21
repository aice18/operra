import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Inventory: React.FC = () => {
  const { user } = useAuth();
  const [inventories, setInventories] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State for adjusting stock
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [physicalQty, setPhysicalQty] = useState(0);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const [invRes, locRes, itemRes] = await Promise.all([
        axios.get('http://localhost:5000/api/inventory'),
        axios.get('http://localhost:5000/api/locations'),
        axios.get('http://localhost:5000/api/items'),
      ]);
      setInventories(invRes.data);
      setLocations(locRes.data);
      setItems(itemRes.data);
    } catch (err: any) {
      setError('Failed to fetch inventory data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/inventory/adjust', {
        locationId: selectedLocation,
        itemId: selectedItem,
        batchNumber,
        physicalQuantity: physicalQty,
      });
      setShowModal(false);
      fetchInventory();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Stock adjustment failed');
    }
  };

  const canManage = user?.role === 'ADMIN' || user?.role === 'OPERATIONS';

  return (
    <div>
      <div className="header-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Package className="text-primary" size={28} />
          <span>Inventory Management</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={fetchInventory}>
            <RefreshCw size={16} /> Refresh
          </button>
          {canManage && (
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              <Plus size={16} /> Adjust Stock
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Location</th>
                <th style={{ minWidth: '220px' }}>Item & Category</th>
                <th style={{ minWidth: '140px' }}>SKU</th>
                <th style={{ minWidth: '150px' }}>Batch Number</th>
                <th style={{ textAlign: 'center', minWidth: '110px' }}>Physical Qty</th>
                <th style={{ textAlign: 'center', minWidth: '110px' }}>Reserved Qty</th>
                <th style={{ textAlign: 'center', minWidth: '110px' }}>Available Qty</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    Loading stock records...
                  </td>
                </tr>
              ) : inventories.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                    No inventory records found.
                  </td>
                </tr>
              ) : (
                inventories.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{inv.location.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{inv.location.code}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, color: '#f1f5f9', marginBottom: '0.25rem' }}>{inv.item.name}</div>
                      <span className="badge badge-ops">{inv.item.category.name}</span>
                    </td>
                    <td>
                      <code style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', color: '#c084fc' }}>{inv.item.sku}</code>
                    </td>
                    <td>
                      <code style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', color: '#38bdf8' }}>{inv.batchNumber}</code>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>
                      {inv.physicalQuantity}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: '#fbbf24' }}>
                      {inv.reservedQuantity}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.05rem', color: inv.availableQuantity > 0 ? '#34d399' : '#f87171' }}>
                      {inv.availableQuantity}
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
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Adjust Physical Stock</h3>
            <form onSubmit={handleAdjustStock}>
              <div className="form-group">
                <label>Location</label>
                <select
                  required
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Item</label>
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
                <label>Batch Number</label>
                <input
                  type="text"
                  required
                  placeholder="BATCH-2026-X"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Physical Quantity</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={physicalQty}
                  onChange={(e) => setPhysicalQty(Number(e.target.value))}
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
                  Save Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
