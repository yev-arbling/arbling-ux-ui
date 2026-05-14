'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function DataTableDemo() {
  const [data, setData] = React.useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', department: 'Engineering', location: 'NYC' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14', department: 'Marketing', location: 'LA' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10', department: 'Design', location: 'SF' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-13', department: 'Engineering', location: 'NYC' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-12', department: 'Operations', location: 'CHI' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Pending', lastLogin: '2024-01-11', department: 'Sales', location: 'LA' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-16', department: 'Marketing', location: 'SF' },
    { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-09', department: 'Engineering', location: 'NYC' },
    { id: 9, name: 'Ivy Chen', email: 'ivy@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-17', department: 'Design', location: 'SF' },
    { id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-18', department: 'Sales', location: 'CHI' },
  ]);

  const [sortConfig, setSortConfig] = React.useState({ key: 'name', direction: 'asc' });
  const [searchFilter, setSearchFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [roleFilter, setRoleFilter] = React.useState('all');
  const [selectedRows, setSelectedRows] = React.useState(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showColumnPicker, setShowColumnPicker] = React.useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState(['name', 'email', 'role', 'status', 'lastLogin', 'actions']);
  const [hoveredRow, setHoveredRow] = React.useState(null);
  const rowsPerPage = 5;

  const allColumns = [
    { key: 'name', label: 'Name', width: '2fr' },
    { key: 'email', label: 'Email', width: '2fr' },
    { key: 'role', label: 'Role', width: '1fr' },
    { key: 'department', label: 'Department', width: '1fr' },
    { key: 'status', label: 'Status', width: '1fr' },
    { key: 'location', label: 'Location', width: '0.8fr' },
    { key: 'lastLogin', label: 'Last Login', width: '1fr' },
    { key: 'actions', label: '', width: '100px' },
  ];

  const activeColumns = allColumns.filter(c => visibleColumns.includes(c.key));
  const gridTemplate = `50px ${activeColumns.map(c => c.width).join(' ')}`;

  const filteredData = React.useMemo(() => {
    return data.filter(row => {
      if (searchFilter && !row.name.toLowerCase().includes(searchFilter.toLowerCase()) && !row.email.toLowerCase().includes(searchFilter.toLowerCase())) return false;
      if (statusFilter !== 'all' && row.status !== statusFilter) return false;
      if (roleFilter !== 'all' && row.role !== roleFilter) return false;
      return true;
    });
  }, [data, searchFilter, statusFilter, roleFilter]);

  const sortedData = React.useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSort = (key) => {
    if (key === 'actions') return;
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const toggleRowSelection = (id, e) => {
    e?.stopPropagation();
    const newSelected = new Set(selectedRows);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedRows(newSelected);
  };

  const selectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(r => r.id)));
    }
  };

  const deleteSelected = () => {
    setData(data.filter(row => !selectedRows.has(row.id)));
    setSelectedRows(new Set());
  };

  const getStatusColor = (status) => ({ 'Active': '#43e97b', 'Inactive': '#ff6b6b', 'Pending': '#ffd93d' }[status] || '#888');
  const getRoleColor = (role) => ({ 'Admin': '#667eea', 'Editor': '#f093fb', 'User': '#4facfe' }[role] || '#888');

  return (
    <>
      <h2 className="demo-title">Data Table</h2>
      <p className="demo-subtitle">Advanced data table with sorting, filtering, column visibility, bulk actions, and export functionality.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        <motion.div style={{ width: 1100, height: 650, background: 'rgba(20, 20, 30, 0.95)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', padding: 25, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, marginBottom: 4 }}>User Management</h2>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>{filteredData.length} users total</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }} whileHover={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }}>
                📊 Export CSV
              </motion.button>
              <div style={{ position: 'relative' }}>
                <motion.button onClick={() => setShowColumnPicker(!showColumnPicker)} style={{ padding: '10px 16px', borderRadius: 10, background: showColumnPicker ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.03)', border: showColumnPicker ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255,255,255,0.08)', color: showColumnPicker ? '#667eea' : '#888', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }} whileHover={{ background: 'rgba(255,255,255,0.06)' }}>
                  ⚙️ Columns
                </motion.button>
                <AnimatePresence>
                  {showColumnPicker && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, padding: 12, borderRadius: 12, background: 'rgba(25, 25, 40, 0.98)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 100, minWidth: 180 }}>
                      {allColumns.filter(c => c.key !== 'actions').map(col => (
                        <label key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', color: visibleColumns.includes(col.key) ? '#fff' : '#888' }}>
                          <input type="checkbox" checked={visibleColumns.includes(col.key)} onChange={() => setVisibleColumns(prev => prev.includes(col.key) ? prev.filter(c => c !== col.key) : [...prev, col.key])} style={{ accentColor: '#667eea' }} />
                          {col.label}
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.button style={{ padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                + Add User
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 15 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ color: '#666' }}>🔍</span>
              <input type="text" placeholder="Search by name or email..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', outline: 'none' }} />
              {searchFilter && <motion.button onClick={() => setSearchFilter('')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }} whileHover={{ color: '#fff' }}>✕</motion.button>}
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Bulk Actions */}
          <AnimatePresence>
            {selectedRows.size > 0 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', marginBottom: 10, borderRadius: 10, background: 'rgba(102, 126, 234, 0.1)', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
                <span style={{ fontSize: '0.8rem', color: '#667eea', fontWeight: 600 }}>{selectedRows.size} selected</span>
                <div style={{ flex: 1 }} />
                <motion.button style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Export</motion.button>
                <motion.button style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Edit</motion.button>
                <motion.button onClick={deleteSelected} style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ background: 'rgba(239, 68, 68, 0.25)' }}>Delete</motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table */}
          <div style={{ flex: 1, borderRadius: 12, background: 'rgba(15, 15, 25, 0.8)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: gridTemplate, gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10, 10, 20, 0.9)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" checked={selectedRows.size === paginatedData.length && paginatedData.length > 0} onChange={selectAll} style={{ accentColor: '#667eea' }} />
              </div>
              {activeColumns.map(col => (
                <motion.div key={col.key} onClick={() => handleSort(col.key)} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, cursor: col.key !== 'actions' ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 4 }} whileHover={col.key !== 'actions' ? { color: '#fff' } : {}}>
                  {col.label}
                  {sortConfig.key === col.key && <span style={{ color: '#667eea' }}>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>}
                </motion.div>
              ))}
            </div>

            {/* Rows */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <AnimatePresence mode="popLayout">
                {paginatedData.map((row, index) => (
                  <motion.div key={row.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: index * 0.03 }}
                    onMouseEnter={() => setHoveredRow(row.id)} onMouseLeave={() => setHoveredRow(null)}
                    style={{ display: 'grid', gridTemplateColumns: gridTemplate, gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)', background: selectedRows.has(row.id) ? 'rgba(102, 126, 234, 0.08)' : hoveredRow === row.id ? 'rgba(255,255,255,0.02)' : 'transparent', borderLeft: selectedRows.has(row.id) ? '3px solid #667eea' : '3px solid transparent' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="checkbox" checked={selectedRows.has(row.id)} onChange={(e) => toggleRowSelection(row.id, e)} style={{ accentColor: '#667eea' }} />
                    </div>
                    {visibleColumns.includes('name') && (
                      <div style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${getRoleColor(row.role)}, ${getRoleColor(row.role)}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{row.name.charAt(0)}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{row.name}</div>
                          {visibleColumns.includes('department') && <div style={{ fontSize: '0.7rem', color: '#666' }}>{row.department}</div>}
                        </div>
                      </div>
                    )}
                    {visibleColumns.includes('email') && <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center' }}>{row.email}</div>}
                    {visibleColumns.includes('role') && <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ padding: '4px 10px', borderRadius: 6, background: `${getRoleColor(row.role)}20`, color: getRoleColor(row.role), fontSize: '0.7rem', fontWeight: 600 }}>{row.role}</span></div>}
                    {visibleColumns.includes('department') && <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center' }}>{row.department}</div>}
                    {visibleColumns.includes('status') && <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ padding: '4px 10px', borderRadius: 12, background: `${getStatusColor(row.status)}20`, color: getStatusColor(row.status), fontSize: '0.7rem', fontWeight: 600 }}>{row.status}</span></div>}
                    {visibleColumns.includes('location') && <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center' }}>{row.location}</div>}
                    {visibleColumns.includes('lastLogin') && <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center' }}>{row.lastLogin}</div>}
                    {visibleColumns.includes('actions') && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: hoveredRow === row.id ? 1 : 0, transition: 'opacity 0.2s' }}>
                        <motion.button style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.8rem' }} whileHover={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>✏️</motion.button>
                        <motion.button style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }} whileHover={{ background: 'rgba(239, 68, 68, 0.2)' }}>🗑️</motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, padding: '12px 16px', borderRadius: 10, background: 'rgba(15, 15, 25, 0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Showing {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <motion.button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: currentPage === 1 ? '#555' : '#fff', fontSize: '0.8rem', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }} whileHover={currentPage !== 1 ? { background: 'rgba(255,255,255,0.06)' } : {}}>←</motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <motion.button key={page} onClick={() => setCurrentPage(page)} style={{ width: 32, height: 32, borderRadius: 8, background: currentPage === page ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.03)', border: currentPage === page ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(255,255,255,0.08)', color: currentPage === page ? '#667eea' : '#888', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{page}</motion.button>
              ))}
              <motion.button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: currentPage === totalPages ? '#555' : '#fff', fontSize: '0.8rem', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }} whileHover={currentPage !== totalPages ? { background: 'rgba(255,255,255,0.06)' } : {}}>→</motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
