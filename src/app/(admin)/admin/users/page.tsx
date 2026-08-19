'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { userApi } from '@/features/users/api';
import { User, UserRole, CreateUserInput, UpdateUserInput } from '@/features/users/types';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const parseValidationErrors = (err: any): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (err && err.errors) {
      const zodErr = err.errors;
      if (zodErr.name === 'ZodError') {
        if (typeof zodErr.message === 'string') {
          try {
            const issues = JSON.parse(zodErr.message);
            issues.forEach((issue: any) => {
              const field = issue.path[0];
              if (field) {
                errors[field.toString()] = issue.message;
              }
            });
          } catch (e) {}
        } else if (Array.isArray(zodErr.issues)) {
          zodErr.issues.forEach((issue: any) => {
            const field = issue.path[0];
            if (field) {
              errors[field.toString()] = issue.message;
            }
          });
        }
      }
    } else if (err && err.message && err.statusCode === 400) {
      if (err.message.toLowerCase().includes('email')) {
        errors.email = err.message;
      } else {
        errors.general = err.message;
      }
    } else {
      errors.general = err?.message || 'Failed to save user.';
    }
    return errors;
  };

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
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFieldErrors({});
    try {
      const data = { ...formData };
      if (!data.phone) delete data.phone;
      
      if (editingUser) {
        if (!data.password) delete data.password;
        await userApi.updateUser(editingUser.id, data);
      } else {
        await userApi.createUser(data);
      }
      await loadUsers();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      const parsedErrors = parseValidationErrors(err);
      setFieldErrors(parsedErrors);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await userApi.deleteUser(id);
      await loadUsers();
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
      (u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [users, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Users & Roles</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage admins, team members, and clients.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <UserPlusIcon />
          Add User
        </button>
      </div>

      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200/50 dark:border-white/5 flex items-center justify-between gap-4">
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
        </div>

        {/* User List */}
        <div className="divide-y divide-gray-200/50 dark:divide-white/5">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No users found.</div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {user.name || 'No Name'}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' :
                    user.role === 'TEAM_MEMBER' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                    'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20'
                  }`}>
                    {user.role}
                  </span>
                  
                  <span className={`flex items-center gap-1.5 text-sm ${
                    user.isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>

                  <button 
                    onClick={() => handleOpenEdit(user)}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 px-2 py-1 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 px-2 py-1 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-xl font-bold">{editingUser ? 'Edit User' : 'Add New User'}</h3>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {fieldErrors.general && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                  {fieldErrors.general}
                </div>
              )}
              
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
                <label className="text-sm font-medium">{editingUser ? 'New Password (leave blank to keep current)' : 'Password'}</label>
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

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
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
