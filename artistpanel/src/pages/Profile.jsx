import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { X, Upload as UploadIcon } from 'lucide-react';
import UploadModal from '../components/UploadModal';
import Notifications from '../components/Notifications';

export default function Profile() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Zara Al-Mansouri',
    email: 'zara@zigguratss.art',
    specialisation: 'Contemporary Abstract, Gold-leaf',
    location: 'New Delhi, India',
    phone: '+91 98100 00000',
    website: 'zaraalmansouri.art',
    artistBio: 'Award-winning contemporary artist based in New Delhi. Known for gold-leaf compositions and abstract landscapes inspired by ancient Mesopotamian art forms and the Indus Valley civilisation.',
    instagram: '@zara.artworks',
    twitter: '@zaraart',
  });

  const [tempFormData, setTempFormData] = useState(formData);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setTempFormData(formData);
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setFormData(tempFormData);
      setIsSaving(false);
      setIsEditMode(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setTempFormData(formData);
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header
          onUploadClick={() => setIsUploadModalOpen(true)}
          onNotificationClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        />

        <div className="p-8">
          <div className="max-w-2xl">
            <div>
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <p className="text-gray-400 text-sm mt-1">Update your artist information, bio, and contact details.</p>
            </div>

            <div className="mt-8 space-y-4">
              {!isEditMode ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                      <p className="mt-2 text-white text-sm">{formData.fullName}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                      <p className="mt-2 text-white text-sm">{formData.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Specialisation</label>
                      <p className="mt-2 text-white text-sm">{formData.specialisation}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</label>
                      <p className="mt-2 text-white text-sm">{formData.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</label>
                      <p className="mt-2 text-white text-sm">{formData.phone}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Website</label>
                      <p className="mt-2 text-white text-sm">{formData.website}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Artist Bio</label>
                    <p className="mt-2 text-white text-sm">{formData.artistBio}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Instagram</label>
                      <p className="mt-2 text-white text-sm">{formData.instagram}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Twitter/X</label>
                      <p className="mt-2 text-white text-sm">{formData.twitter}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleEditClick}
                      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={tempFormData.fullName}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={tempFormData.email}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Specialisation</label>
                      <input
                        type="text"
                        name="specialisation"
                        value={tempFormData.specialisation}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={tempFormData.location}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={tempFormData.phone}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={tempFormData.website}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Artist Bio</label>
                    <textarea
                      name="artistBio"
                      value={tempFormData.artistBio}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Instagram</label>
                      <input
                        type="text"
                        name="instagram"
                        value={tempFormData.instagram}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Twitter/X</label>
                      <input
                        type="text"
                        name="twitter"
                        value={tempFormData.twitter}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:border-gray-700 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700 text-black font-semibold rounded-lg transition text-sm"
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition text-sm border border-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <Notifications
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
