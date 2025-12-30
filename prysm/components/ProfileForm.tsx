'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { updateUserProfile } from '@/lib/firebase/profile';
import { getUserAvatarUrl } from '@/lib/avatar';
import { countryRegions, gradeLevels, countrySyllabi, universities } from '@/lib/data/regions';
import { Button } from './Button';
import { Card } from './Card';
import { motion } from 'framer-motion';

export function ProfileForm() {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(userProfile?.theme || 'system');
  const [emailNotifications, setEmailNotifications] = useState(userProfile?.notifications?.email ?? true);
  const [pushNotifications, setPushNotifications] = useState(userProfile?.notifications?.push ?? false);
  
  // Academic Information
  const [country, setCountry] = useState<'Namibia' | 'South Africa' | 'Eswatini' | ''>(userProfile?.country || '');
  const [region, setRegion] = useState(userProfile?.region || '');
  const [school, setSchool] = useState(userProfile?.school || '');
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
  
  const avatarUrl = getUserAvatarUrl(displayName || user?.email || 'User', 96);

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
      const photoURL = getUserAvatarUrl(displayName || user.email || 'User');

      // Determine syllabus if not set but country is selected
      let finalSyllabus = syllabus;
      if (!finalSyllabus && country) {
        const countrySyllabus = countrySyllabi[country];
        if (countrySyllabus && countrySyllabus.length === 1) {
          finalSyllabus = countrySyllabus[0] as any;
        }
      }

      // Update profile
      await updateUserProfile(user.uid, {
        displayName,
        bio,
        theme,
        notifications: {
          email: emailNotifications,
          push: pushNotifications,
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

      // Refresh user profile
      await refreshUserProfile();
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d4ff80]/10 border border-[#d4ff80]/20 rounded-lg text-[#d4ff80] text-sm"
        >
          Profile updated successfully!
        </motion.div>
      )}

      {/* Avatar Display */}
      <Card hover={false} className="academy-card">
        <label className="block text-sm font-semibold mb-4">Profile Picture</label>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/5 border-2 border-white/10">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">
              Your avatar is automatically generated from your display name. Change your name above to update it.
            </p>
          </div>
        </div>
      </Card>

      {/* Display Name */}
      <Card hover={false} className="academy-card">
        <label htmlFor="displayName" className="block text-sm font-semibold mb-2">
          Display Name <span className="text-red-400">*</span>
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors"
          placeholder="Enter your display name"
          required
        />
      </Card>

      {/* Bio */}
      <Card hover={false} className="academy-card">
        <label htmlFor="bio" className="block text-sm font-semibold mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors resize-none"
          placeholder="Tell us about yourself..."
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-2">{bio.length}/500</p>
      </Card>

      {/* Academic Information Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-400/30 to-transparent"></div>
          <h2 className="text-xl font-extrabold text-white">Academic Information</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-400/30 to-transparent"></div>
        </div>

        {/* Country */}
        <Card hover={false} className="academy-card">
          <label htmlFor="country" className="block text-sm font-semibold mb-2">
            Country <span className="text-red-400">*</span>
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value as 'Namibia' | 'South Africa' | 'Eswatini' | '')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4ff80] transition-colors appearance-none cursor-pointer"
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
            <Card hover={false} className="academy-card">
              <label htmlFor="region" className="block text-sm font-semibold mb-2">
                Region/Province
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4ff80] transition-colors appearance-none cursor-pointer"
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

        {/* School */}
        <Card hover={false} className="academy-card">
          <label htmlFor="school" className="block text-sm font-semibold mb-2">
            School Name
          </label>
          <input
            id="school"
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors"
            placeholder="Enter your school name"
          />
        </Card>

        {/* Grade */}
        {country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card hover={false} className="academy-card">
              <label htmlFor="grade" className="block text-sm font-semibold mb-2">
                Grade/Form
              </label>
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4ff80] transition-colors appearance-none cursor-pointer"
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
            <Card hover={false} className="academy-card">
              <label htmlFor="level" className="block text-sm font-semibold mb-2">
                Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4ff80] transition-colors appearance-none cursor-pointer"
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
            <Card hover={false} className="academy-card">
              <label htmlFor="syllabus" className="block text-sm font-semibold mb-2">
                Syllabus/Curriculum
              </label>
              <select
                id="syllabus"
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4ff80] transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select your syllabus</option>
                {availableSyllabi.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {country === 'South Africa' && (
                <p className="text-xs text-gray-400 mt-2">
                  CAPS: Public schools | IEB: Private/Independent schools
                </p>
              )}
            </Card>
          </motion.div>
        )}

        {/* University Student Toggle */}
        <Card hover={false} className="academy-card">
          <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
            <div>
              <span className="text-white font-semibold block">I am a University Student</span>
              <span className="text-xs text-gray-400">Check this if you're currently studying at a university</span>
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
              className="w-5 h-5 text-[#d4ff80] focus:ring-[#d4ff80] rounded"
            />
          </label>
        </Card>

        {/* University Selection */}
        {isUniversityStudent && country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card hover={false} className="academy-card">
              <label htmlFor="university" className="block text-sm font-semibold mb-2">
                University
              </label>
              <select
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4ff80] transition-colors appearance-none cursor-pointer"
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
                >
                  <input
                    type="text"
                    value={otherUniversity}
                    onChange={(e) => setOtherUniversity(e.target.value)}
                    className="w-full mt-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors"
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
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-400/30 to-transparent"></div>
          <h2 className="text-xl font-extrabold text-white">Preferences</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-400/30 to-transparent"></div>
        </div>

        {/* Theme Preference */}
        <Card hover={false} className="academy-card">
          <label className="block text-sm font-semibold mb-4">Theme Preference</label>
          <div className="space-y-2">
            {(['light', 'dark', 'system'] as const).map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              >
                <input
                  type="radio"
                  name="theme"
                  value={option}
                  checked={theme === option}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                  className="w-4 h-4 text-[#d4ff80] focus:ring-[#d4ff80]"
                />
                <span className="text-white capitalize">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Notification Settings */}
        <Card hover={false} className="academy-card">
          <label className="block text-sm font-semibold mb-4">Notification Settings</label>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Email Notifications</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 text-[#d4ff80] focus:ring-[#d4ff80] rounded"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Push Notifications</span>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="w-5 h-5 text-[#d4ff80] focus:ring-[#d4ff80] rounded"
              />
            </label>
          </div>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="primary" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
