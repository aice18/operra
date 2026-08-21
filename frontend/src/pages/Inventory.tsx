import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, RefreshCw, Layers, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { API_BASE_URL } from '../config/api';

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
        axios.get(`${API_BASE_URL}/api/inventory`),
        axios.get(`${API_BASE_URL}/api/locations`),
        axios.get(`${API_BASE_URL}/api/items`),
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
      await axios.post(`${API_BASE_URL}/api/inventory/adjust`, {
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

  // Calculated Summary Metrics
  const totalPhysical = inventories.reduce((sum, item) => sum + (item.physicalQuantity || 0), 0);
  const totalReserved = inventories.reduce((sum, item) => sum + (item.reservedQuantity || 0), 0);
  const totalAvailable = inventories.reduce((sum, item) => sum + (item.availableQuantity || 0), 0);

  return (
    <div>
      {/* Action & Filter Bar */}
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
          <Package size={16} color="#7c3aed" /> Multi-Warehouse Stock Records
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" style={{ borderRadius: '9999px', padding: '0.5rem 1.1rem' }} onClick={fetchInventory}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Sync Records
          </button>
          {canManage && (
            <button className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem' }} onClick={() => setShowModal(true)}>
              <Plus size={18} /> Adjust Physical Stock
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
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Total Physical Quantity</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            {totalPhysical.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Units</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <TrendingUp size={14} /> Across {locations.length} Locations
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Reserved Stock</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#d97706', marginBottom: '0.5rem' }}>
            {totalReserved.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Reserved</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fffbeb', color: '#d97706', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <Layers size={14} /> Locked for Sales Orders
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Available Quantity</span>
            <ArrowUpRight size={16} color="#94a3b8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', marginBottom: '0.5rem' }}>
            {totalAvailable.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>Available</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <TrendingUp size={14} /> Physical - Reserved
          </div>
        </div>
      </div>

      {/* Main Table Card Container - Fits 100% without horizontal scrollbar */}
      <div className="card" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Warehouse Inventory Ledger</h3>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{inventories.length} Batch Records</span>
        </div>

        <div className="table-container" style={{ overflowX: 'hidden' }}>
          <table style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Location</th>
                <th style={{ width: '23%' }}>Item & Category</th>
                <th style={{ width: '14%' }}>SKU</th>
                <th style={{ width: '15%' }}>Batch Number</th>
                <th style={{ textAlign: 'center', width: '9%' }}>Physical</th>
                <th style={{ textAlign: 'center', width: '9%' }}>Reserved</th>
                <th style={{ textAlign: 'center', width: '10%' }}>Available</th>
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
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inv.location.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inv.location.code}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inv.item.name}</div>
                      <span className="badge badge-ops" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>{inv.item.category.name}</span>
                    </td>
                    <td>
                      <code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '0.35rem', color: '#7c3aed', fontWeight: 600, fontSize: '0.75rem' }}>{inv.item.sku}</code>
                    </td>
                    <td>
                      <code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '0.35rem', color: '#0284c7', fontWeight: 600, fontSize: '0.75rem' }}>{inv.batchNumber}</code>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                      {inv.physicalQuantity}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#d97706' }}>
                      {inv.reservedQuantity}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.95rem', color: inv.availableQuantity > 0 ? '#059669' : '#dc2626' }}>
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
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Adjust Physical Stock</h3>
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
                  className="btn btn-secondary"
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
