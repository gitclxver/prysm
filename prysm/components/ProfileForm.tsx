'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { updateUserProfile } from '@/lib/firebase/profile';
import { deleteUserAccount } from '@/lib/firebase/users';
import { getUserAvatarUrl } from '@/lib/avatar';
import { countryRegions, gradeLevels, countrySyllabi, universities } from '@/lib/data/regions';
import { SchoolSearch } from './SchoolSearch';
import { incrementSchoolStudentCount } from '@/lib/firebase/schools';
import { Button } from './Button';
import { Card } from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export function ProfileForm() {
  const { user, userProfile, refreshUserProfile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [emailNotifications, setEmailNotifications] = useState(userProfile?.notifications?.email ?? true);
  
  // Academic Information
  const [country, setCountry] = useState<'Namibia' | 'South Africa' | 'Eswatini' | ''>(userProfile?.country || '');
  const [region, setRegion] = useState(userProfile?.region || '');
  const [school, setSchool] = useState(userProfile?.school || '');
  const [schoolId, setSchoolId] = useState<string | undefined>(undefined);
  const [grade, setGrade] = useState(userProfile?.grade || '');
  const [level, setLevel] = useState(userProfile?.level || '');
  const [syllabus, setSyllabus] = useState(userProfile?.syllabus || '');
  const [isUniversityStudent, setIsUniversityStudent] = useState(userProfile?.isUniversityStudent || false);
  const [university, setUniversity] = useState(() => {
    const uni = userProfile?.university || '';
    if (uni && !universities[userProfile?.country || '']?.includes(uni)) {
      return 'Other';
    }
    return uni;
  });
  const [otherUniversity, setOtherUniversity] = useState(() => {
    const uni = userProfile?.university || '';
    if (uni && !universities[userProfile?.country || '']?.includes(uni)) {
      return uni;
    }
    return '';
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  const displayName = userProfile?.displayName || user?.displayName || 'User';
  const avatarUrl = getUserAvatarUrl(
    displayName,
    userProfile?.photoURL || user?.photoURL || null,
    96
  );


  // Update available regions when country changes
  const availableRegions = country ? countryRegions[country] || [] : [];
  const availableGrades = country ? gradeLevels[country]?.grades || [] : [];
  const availableLevels = country ? gradeLevels[country]?.levels || [] : [];
  const availableSyllabi = country ? countrySyllabi[country] || [] : [];
  const availableUniversities = country ? universities[country] || [] : [];

  // Reset dependent fields when country changes
  useEffect(() => {
    if (country && userProfile?.country !== country) {
      setRegion('');
      setSyllabus('');
      // Check if current university is in the new country's list
      if (university && !availableUniversities.includes(university)) {
        if (university !== 'Other') {
          setOtherUniversity(university);
          setUniversity('Other');
        }
      } else if (university === 'Other' && !otherUniversity) {
        setUniversity('');
      }
    }
  }, [country, userProfile?.country, university, availableUniversities, otherUniversity]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      if (!country) {
        throw new Error('Please select your country');
      }

      // Generate avatar URL based on display name
      const photoURL = getUserAvatarUrl(
        displayName,
        userProfile?.photoURL || user?.photoURL || null
      );

      // Determine syllabus if not set but country is selected
      let finalSyllabus = syllabus;
      if (!finalSyllabus && country) {
        const countrySyllabus = countrySyllabi[country];
        if (countrySyllabus && countrySyllabus.length === 1) {
          finalSyllabus = countrySyllabus[0] as any;
        }
      }

      // Update profile (displayName is not editable, so we don't update it)
      // Note: Theme is handled by ThemeContext and saved automatically via toggleTheme
      await updateUserProfile(user.uid, {
        bio,
        notifications: {
          email: emailNotifications,
          push: false,
        },
        photoURL,
        country: country as 'Namibia' | 'South Africa' | 'Eswatini',
        region: region || undefined,
        school: school || undefined,
        grade: grade || undefined,
        level: level || undefined,
        syllabus: finalSyllabus as any || undefined,
        isUniversityStudent: isUniversityStudent || undefined,
        university: (university === 'Other' ? otherUniversity : university) || undefined,
      });

      // Increment school student count if school was selected
      if (schoolId && school) {
        try {
          await incrementSchoolStudentCount(schoolId);
        } catch (error) {
          console.error("Error incrementing school student count:", error);
          // Don't fail the profile update if this fails
        }
      }

      // Refresh user profile (ThemeContext will automatically sync theme from userProfile)
      await refreshUserProfile();
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setDeleteError('');
    setDeleteLoading(true);

    try {
      // Soft delete: mark account as deleted (can be recovered within 21 days)
      await deleteUserAccount(user.uid);
      
      // Sign out first
      await signOut();
      
      // Use window.location for hard redirect to bypass React router/auth checks
      if (typeof window !== 'undefined') {
        window.location.href = '/account-deleted';
      }
    } catch (err: any) {
      console.error('Error deleting account:', err);
      setDeleteError(err.message || 'Failed to delete account. Please try again.');
      setDeleteLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-[var(--lime)]/10 border border-[var(--lime)]/20 rounded-xl text-[var(--lime)] text-sm"
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check-circle"></i>
              <span>Profile updated successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Header */}
      <Card className="overflow-hidden border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--bg-overlay)] border-2 border-[var(--lime)]/30 ring-4 ring-[var(--lime)]/10">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[var(--lime)] rounded-full flex items-center justify-center border-4 border-[var(--prysm-card)]">
              <i className="fa-solid fa-user text-[var(--prysm-bg)] text-xs"></i>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-extrabold mb-2 text-[var(--text-primary)] truncate">
              {displayName}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-1 truncate">
              {user?.email}
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">
              Your avatar is automatically generated from your name
            </p>
          </div>
        </div>
      </Card>

      {/* Bio */}
      <Card className="border-[var(--border-color)]">
        <label htmlFor="bio" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all resize-none"
          placeholder="Tell us about yourself..."
          maxLength={500}
        />
        <p className="text-xs text-[var(--text-tertiary)] mt-2">{bio.length}/500</p>
      </Card>

      {/* Academic Information Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--lime)]/30 to-transparent"></div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap text-[var(--lime)]"></i>
            Academic Information
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--lime)]/30 to-transparent"></div>
        </div>

        {/* Country */}
        <Card className="border-[var(--border-color)]">
          <label htmlFor="country" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
            Country <span className="text-red-400">*</span>
            {country && (
              <span className="text-xs text-[var(--text-secondary)] ml-2 font-normal">
                (Cannot be changed)
              </span>
            )}
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value as 'Namibia' | 'South Africa' | 'Eswatini' | '')}
            disabled={!!country}
            className={`w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all appearance-none ${
              country ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            }`}
            required
          >
            <option value="">Select your country</option>
            <option value="Namibia">Namibia</option>
            <option value="South Africa">South Africa</option>
            <option value="Eswatini">Eswatini</option>
          </select>
        </Card>

        {/* Region */}
        {country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-[var(--border-color)]">
              <label htmlFor="region" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
                Region/Province
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select your region</option>
                {availableRegions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </Card>
          </motion.div>
        )}

        {/* School - Smart Search */}
        {country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-[var(--border-color)]">
              <label htmlFor="school" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
                School Name
              </label>
              <SchoolSearch
                value={school}
                onChange={(schoolName, schoolId) => {
                  setSchool(schoolName);
                  setSchoolId(schoolId);
                }}
                country={country}
                region={region}
                placeholder="Search for your school..."
              />
              <p className="text-xs text-[var(--text-tertiary)] mt-2">
                Search for your school or add it if it&apos;s not in our database. This helps us connect you with students and tutors at your school.
              </p>
            </Card>
          </motion.div>
        )}

        {/* Grade */}
        {country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-[var(--border-color)]">
              <label htmlFor="grade" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
                Grade/Form
              </label>
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select your grade</option>
                {availableGrades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Card>
          </motion.div>
        )}

        {/* Level */}
        {country && availableLevels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-[var(--border-color)]">
              <label htmlFor="level" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
                Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select your level</option>
                {availableLevels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Card>
          </motion.div>
        )}

        {/* Syllabus */}
        {country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-[var(--border-color)]">
              <label htmlFor="syllabus" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
                Syllabus/Curriculum
              </label>
              <select
                id="syllabus"
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select your syllabus</option>
                {availableSyllabi.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {country === 'South Africa' && (
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  CAPS: Public schools | IEB: Private/Independent schools
                </p>
              )}
            </Card>
          </motion.div>
        )}

        {/* University Student Toggle - Only show if not already a university student */}
        {!userProfile?.isUniversityStudent && (
          <Card className="border-[var(--border-color)]">
            <label className="flex items-center justify-between p-4 bg-[var(--bg-overlay)] rounded-lg cursor-pointer hover:bg-[var(--bg-overlay)]/80 transition-colors">
              <div>
                <span className="text-[var(--text-primary)] font-semibold block">I am a University Student</span>
                <span className="text-xs text-[var(--text-secondary)]">Check this if you&apos;re currently studying at a university</span>
              </div>
              <input
                type="checkbox"
                checked={isUniversityStudent}
                onChange={(e) => {
                  setIsUniversityStudent(e.target.checked);
                  if (!e.target.checked) {
                    setUniversity('');
                  }
                }}
                className="w-5 h-5 text-[var(--lime)] focus:ring-[var(--lime)] rounded cursor-pointer"
              />
            </label>
          </Card>
        )}

        {/* University Selection */}
        {isUniversityStudent && country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-[var(--border-color)]">
              <label htmlFor="university" className="block text-sm font-semibold mb-3 text-[var(--text-primary)]">
                University
              </label>
              <select
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select your university</option>
                {availableUniversities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
              {university === 'Other' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <input
                    type="text"
                    value={otherUniversity}
                    onChange={(e) => setOtherUniversity(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/20 transition-all"
                    placeholder="Enter your university name"
                  />
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </div>

      {/* Preferences Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--lime)]/30 to-transparent"></div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <i className="fa-solid fa-cog text-[var(--lime)]"></i>
            Preferences
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--lime)]/30 to-transparent"></div>
        </div>

        {/* Theme Toggle */}
        <Card className="border-[var(--border-color)]">
          <label className="block text-sm font-semibold mb-4 text-[var(--text-primary)]">Theme</label>
          <button
            onClick={toggleTheme}
            className="w-full p-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-overlay)]/80 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-[var(--lime)]' : 'bg-gray-400'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
              <span className="text-[var(--text-primary)] font-semibold capitalize">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} text-[var(--lime)]`}></i>
          </button>
        </Card>

        {/* Notification Settings */}
        <Card className="border-[var(--border-color)]">
          <label className="block text-sm font-semibold mb-4 text-[var(--text-primary)]">Notification Settings</label>
          <label className="flex items-center justify-between p-3 bg-[var(--bg-overlay)] rounded-lg hover:bg-[var(--bg-overlay)]/80 transition-colors cursor-pointer">
            <span className="text-[var(--text-primary)]">Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-5 h-5 text-[var(--lime)] focus:ring-[var(--lime)] rounded cursor-pointer"
            />
          </label>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="primary" disabled={loading} className="flex-1">
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Saving...
            </>
          ) : (
            <>
              <i className="fa-solid fa-save mr-2"></i>
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Delete Account Section */}
      <Card className="border-red-500/20 bg-red-500/5">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-base font-extrabold mb-1 text-red-400 flex items-center gap-2">
                <i className="fa-solid fa-exclamation-triangle text-sm"></i>
                Danger Zone
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Once deleted, there is no going back.
              </p>
            </div>
            
            {deleteError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-xs mr-3"
              >
                {deleteError}
              </motion.div>
            )}

            {!showDeleteConfirm ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 text-sm px-4 py-2"
              >
                <i className="fa-solid fa-trash mr-2"></i>
                Delete Account
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-red-400 mr-2">
                  Are you sure?
                </p>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="bg-red-500 hover:bg-red-600 border-red-500 text-sm px-3 py-2"
                >
                  {deleteLoading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-trash mr-2"></i>
                      Delete
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteError('');
                  }}
                  disabled={deleteLoading}
                  className="text-sm px-3 py-2"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </form>
  );
}
