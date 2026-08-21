'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { userApi } from '@/features/users/api';
import { User, UserRole, CreateUserInput } from '@/features/users/types';
import { extractValidationErrors } from '@/lib/utils';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const TeamIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
);

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserInput>({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'CLIENT',
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', phone: '', role: 'CLIENT', isActive: true });
    setSelectedFile(null);
    setPreviewUrl(null);
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      isActive: user.isActive,
      password: '', // Leave blank for edit unless changing
    });
    setSelectedFile(null);
    setPreviewUrl(user.image || null);
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFieldErrors({});
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('role', formData.role);
      payload.append('isActive', (formData.isActive ?? true).toString());

      if (formData.phone) {
        payload.append('phone', formData.phone);
      } else {
        payload.append('phone', '');
      }

      if (formData.password) {
        payload.append('password', formData.password);
      }

      if (selectedFile) {
        payload.append('image', selectedFile);
      } else if (previewUrl) {
        payload.append('image', previewUrl);
      } else {
        payload.append('image', '');
      }

      if (editingUser) {
        await userApi.updateUser(editingUser.id, payload);
        setSuccessMessage('User updated successfully.');
      } else {
        await userApi.createUser(payload);
        setSuccessMessage('User created successfully.');
      }

      await loadUsers();
      setIsModalOpen(false);

      // Auto-dismiss success message
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err: any) {
      console.error(err);
      const parsedErrors = extractValidationErrors(err);
      if (Object.keys(parsedErrors).length > 0) {
        setFieldErrors(parsedErrors);
      } else {
        let friendlyMessage = 'Failed to save user. Please verify your input details.';
        if (err.message) {
          const lowerMsg = err.message.toLowerCase();
          if (lowerMsg.includes('prisma') || lowerMsg.includes('database') || lowerMsg.includes('sql') || lowerMsg.includes('unique constraint')) {
            friendlyMessage = 'A database error occurred. Please try again later.';
          } else if (lowerMsg.includes('email') && lowerMsg.includes('exist')) {
            friendlyMessage = 'A user with this email address already exists.';
          } else if (lowerMsg.includes('email') && lowerMsg.includes('use')) {
            friendlyMessage = 'This email address is already in use.';
          } else {
            friendlyMessage = err.message;
          }
        }
        setFieldErrors({ general: friendlyMessage });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await userApi.deleteUser(id);
      setSuccessMessage('User deleted successfully.');
      await loadUsers();
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err: any) {
      let friendlyMessage = 'Failed to delete user.';
      if (err.message) {
        const lowerMsg = err.message.toLowerCase();
        if (lowerMsg.includes('prisma') || lowerMsg.includes('database') || lowerMsg.includes('sql')) {
          friendlyMessage = 'A database error occurred while deleting the user.';
        } else {
          friendlyMessage = err.message;
        }
      }
      alert(friendlyMessage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFieldErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter(u => u.role === 'ADMIN').length,
      team: users.filter(u => u.role === 'TEAM_MEMBER').length,
      active: users.filter(u => u.isActive).length,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        (u.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
      const matchesStatus = 
        statusFilter === 'ALL' || 
        (statusFilter === 'ACTIVE' && u.isActive) || 
        (statusFilter === 'INACTIVE' && !u.isActive);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm rounded-xl flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="hover:opacity-75 transition-opacity">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:border-blue-500/30 transition-all duration-300">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Users</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1 group-hover:text-blue-500 transition-colors">{stats.total}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <UsersIcon />
          </div>
        </div>

        {/* Admins */}
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:border-purple-500/30 transition-all duration-300">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Administrators</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1 group-hover:text-purple-500 transition-colors">{stats.admins}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <ShieldIcon />
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:border-indigo-500/30 transition-all duration-300">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Team Roster</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1 group-hover:text-indigo-500 transition-colors">{stats.team}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <TeamIcon />
          </div>
        </div>

        {/* Active Accounts */}
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:border-emerald-500/30 transition-all duration-300">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Users</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1 group-hover:text-emerald-500 transition-colors">{stats.active}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ActivityIcon />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Users & Roles</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage admins, team members, and clients.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer"
        >
          <UserPlusIcon />
          Add User
        </button>
      </div>

      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200/50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative group flex-1 max-w-sm">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100/50 dark:bg-white/5 border border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-sm outline-none transition-all text-gray-800 dark:text-gray-200 placeholder:text-gray-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-100/50 dark:bg-white/5 border border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-xs font-medium outline-none text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                <option value="ALL" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">All Roles</option>
                <option value="ADMIN" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Admin</option>
                <option value="TEAM_MEMBER" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Team Member</option>
                <option value="CLIENT" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Client</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-100/50 dark:bg-white/5 border border-transparent dark:border-white/5 focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-xs font-medium outline-none text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                <option value="ALL" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">All Status</option>
                <option value="ACTIVE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Active</option>
                <option value="INACTIVE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200/50 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01]">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">User Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg className="animate-spin w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <span className="text-sm font-medium mt-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2 py-6">
                      <svg className="w-12 h-12 text-gray-300 dark:text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">No users found</h3>
                      <p className="text-sm text-gray-400">Try adjusting your filters or search query.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/30 dark:hover:bg-white/[0.01] transition-all group border-l-2 border-l-transparent hover:border-l-blue-500">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {user.image ? (
                          <img src={user.image} alt={user.name || ''} className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200/50 dark:border-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm select-none">
                            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {user.name || 'No Name'}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' :
                        user.role === 'TEAM_MEMBER' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                        'bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10'
                      }`}>
                        {user.role === 'TEAM_MEMBER' ? 'TEAM MEMBER' : user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                        user.isActive 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                          : 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(user)}
                          title="Edit User"
                          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all cursor-pointer"
                        >
                          <EditIcon />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          title="Delete User"
                          className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold">{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {fieldErrors.general && (
                  <div className="p-3 mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                    {fieldErrors.general}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        setFieldErrors(prev => ({ ...prev, name: '' }));
                      }}
                      className={`w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border ${fieldErrors.name ? 'border-red-500' : 'border-transparent dark:border-white/5'} focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-sm outline-none text-gray-800 dark:text-gray-200 transition-all`}
                    />
                    {fieldErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        setFieldErrors(prev => ({ ...prev, email: '' }));
                      }}
                      className={`w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border ${fieldErrors.email ? 'border-red-500' : 'border-transparent dark:border-white/5'} focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-sm outline-none text-gray-800 dark:text-gray-200 transition-all`}
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone || ''}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }));
                        setFieldErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border ${fieldErrors.phone ? 'border-red-500' : 'border-transparent dark:border-white/5'} focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-sm outline-none text-gray-800 dark:text-gray-200 transition-all`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">{editingUser ? 'New Password (optional)' : 'Password'}</label>
                    <input 
                      type="password" 
                      required={!editingUser}
                      value={formData.password}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, password: e.target.value }));
                        setFieldErrors(prev => ({ ...prev, password: '' }));
                      }}
                      className={`w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border ${fieldErrors.password ? 'border-red-500' : 'border-transparent dark:border-white/5'} focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-sm outline-none text-gray-800 dark:text-gray-200 transition-all`}
                    />
                    {fieldErrors.password && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Role</label>
                    <select 
                      value={formData.role}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, role: e.target.value as UserRole }));
                        setFieldErrors(prev => ({ ...prev, role: '' }));
                      }}
                      className={`w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border ${fieldErrors.role ? 'border-red-500' : 'border-transparent dark:border-white/5'} focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-sm outline-none text-gray-800 dark:text-gray-200 transition-all`}
                    >
                      <option value="CLIENT" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Client</option>
                      <option value="TEAM_MEMBER" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Team Member</option>
                      <option value="ADMIN" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Admin</option>
                    </select>
                    {fieldErrors.role && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.role}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Status</label>
                    <select 
                      value={formData.isActive ? 'true' : 'false'}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }));
                        setFieldErrors(prev => ({ ...prev, isActive: '' }));
                      }}
                      className={`w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border ${fieldErrors.isActive ? 'border-red-500' : 'border-transparent dark:border-white/5'} focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 rounded-lg text-sm outline-none text-gray-800 dark:text-gray-200 transition-all`}
                    >
                      <option value="true" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Active</option>
                      <option value="false" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Inactive</option>
                    </select>
                    {fieldErrors.isActive && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.isActive}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium">Profile Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-white/10 dark:file:text-white dark:hover:file:bg-white/20 transition-all cursor-pointer"
                    />
                    {previewUrl && (
                      <div className="mt-3 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-500/20 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                    {fieldErrors.image && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.image}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-white/10 shrink-0 bg-white dark:bg-gray-900">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  {isSaving ? 'Saving...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
