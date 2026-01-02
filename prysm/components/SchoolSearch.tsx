"use client";

import { useState, useEffect, useRef } from "react";
import { searchSchools, createSchool, getRecommendedSchools, type School } from "@/lib/firebase/schools";
import { motion, AnimatePresence } from "framer-motion";

interface SchoolSearchProps {
  value: string;
  onChange: (schoolName: string, schoolId?: string) => void;
  country: "Namibia" | "South Africa" | "Eswatini" | "";
  region?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: 'highschool' | 'tertiary'; // Filter by school type
}

export function SchoolSearch({
  value,
  onChange,
  country,
  region,
  placeholder = "Search for your school...",
  required = false,
  className = "",
  type,
}: SchoolSearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<School[]>([]);
  const [recommendations, setRecommendations] = useState<School[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | undefined>();
  const [originalValue, setOriginalValue] = useState(value); // Track original value when user starts typing
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update search term and original value when value prop changes
  useEffect(() => {
    setSearchTerm(value);
    setOriginalValue(value);
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load recommendations when country/region/type changes (but no search term)
  useEffect(() => {
    if (!country) {
      setRecommendations([]);
      return;
    }

    // Only show recommendations if no search term or search term is very short
    if (searchTerm.length >= 2) {
      setRecommendations([]);
      return;
    }

    const loadRecommendations = async () => {
      try {
        const recs = await getRecommendedSchools(
          country as "Namibia" | "South Africa" | "Eswatini",
          region,
          type,
          8 // Show 8 recommendations
        );
        setRecommendations(recs);
      } catch (error) {
        console.error("Error loading recommendations:", error);
        setRecommendations([]);
      }
    };

    loadRecommendations();
  }, [country, region, type, searchTerm]);

  // Manual search function - only called when user explicitly searches
  const performSearch = async () => {
    if (!country || searchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const results = await searchSchools(
        searchTerm,
        country as "Namibia" | "South Africa" | "Eswatini",
        10,
        type
      );
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch (error) {
      console.error("Error searching schools:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    // Don't call onChange here - only update when school is selected
    // This allows us to revert if user clicks away
    setSelectedSchoolId(undefined);
    // Clear suggestions when typing (don't auto-search)
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    // Store the original value when user starts interacting
    setOriginalValue(value);
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // If user clicked away without selecting a school, revert to original value
    if (!selectedSchoolId && searchTerm !== originalValue) {
      setSearchTerm(originalValue);
      // Don't call onChange here - we want to keep the original value
    }
    // Hide suggestions after a short delay to allow click events to fire
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Search when Enter is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  };

  const handleSelectSchool = (school: School) => {
    setSearchTerm(school.name);
    setSelectedSchoolId(school.id);
    setOriginalValue(school.name); // Update original value when school is selected
    onChange(school.name, school.id);
    setShowSuggestions(false);
  };

  const handleAddNewSchool = async () => {
    if (!country || !searchTerm.trim()) return;

    try {
      setLoading(true);
      const newSchool = await createSchool(
        searchTerm.trim(),
        country as "Namibia" | "South Africa" | "Eswatini",
        region
      );
      setSelectedSchoolId(newSchool.id);
      setOriginalValue(newSchool.name); // Update original value when school is added
      onChange(newSchool.name, newSchool.id);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error creating school:", error);
      // Still allow user to continue with the school name
      setOriginalValue(searchTerm.trim()); // Update original value
      onChange(searchTerm.trim());
    } finally {
      setLoading(false);
    }
  };

  // Only show "add school" option when:
  // 1. Search term is at least 3 characters
  // 2. No school is currently selected (no selectedSchoolId)
  // 3. Search has completed (not loading)
  // 4. No suggestions are showing and no suggestions were found (school not found in database)
  // 5. The search term doesn't match the current value (school is not already selected/displayed)
  const isSchoolAlreadySelected = selectedSchoolId || (value && searchTerm.trim().toLowerCase() === value.toLowerCase());
  const canAddNew = searchTerm.trim().length >= 3 && !isSchoolAlreadySelected && !loading && !showSuggestions && suggestions.length === 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] transition-colors pr-10"
            placeholder={placeholder}
            required={required}
          />
          {!loading && searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setOriginalValue("");
                onChange("");
                setSelectedSchoolId(undefined);
                setShowSuggestions(false);
                setSuggestions([]);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          )}
        </div>
        {searchTerm.length >= 2 && (
          <button
            type="button"
            onClick={performSearch}
            disabled={loading}
            className="px-4 py-3 bg-[var(--lime)] text-[var(--prysm-bg)] font-semibold rounded-lg hover:bg-[var(--lime)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fa-solid fa-search"></i>
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Recommendations (shown when no search term) */}
      {recommendations.length > 0 && searchTerm.length < 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3"
        >
          <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
            Popular {type === 'tertiary' ? 'Institutions' : type === 'highschool' ? 'Schools' : 'Schools & Institutions'}
          </p>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((school) => (
              <button
                key={school.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur before click
                  handleSelectSchool(school);
                }}
                className="px-3 py-2 text-sm bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-overlay-hover)] hover:border-[var(--lime)]/30 transition-all hover:scale-105"
              >
                {school.name}
                {school.city && (
                  <span className="text-xs text-[var(--text-secondary)] ml-1">
                    • {school.city}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[var(--prysm-card)] border border-[var(--border-color)] rounded-lg shadow-2xl max-h-64 overflow-y-auto"
          >
            <div className="p-2">
              {suggestions.map((school) => (
                <button
                  key={school.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur before click
                    handleSelectSchool(school);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[var(--text-primary)] truncate">
                        {school.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {school.region && (
                          <span className="text-xs text-[var(--text-secondary)]">
                            {school.region}
                          </span>
                        )}
                        {school.city && (
                          <span className="text-xs text-[var(--text-secondary)]">
                            • {school.city}
                          </span>
                        )}
                        {school.studentCount !== undefined && school.studentCount > 0 && (
                          <span className="text-xs text-[var(--lime)]">
                            • {school.studentCount} student
                            {school.studentCount !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-[var(--text-tertiary)] group-hover:text-[var(--lime)] transition-colors ml-2"></i>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {canAddNew && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-3 bg-[var(--bg-overlay)] border border-[var(--lime)]/30 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-plus-circle text-[var(--lime)] mt-0.5"></i>
            <div className="flex-1">
              <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">
                School not found?
              </p>
              <p className="text-xs text-[var(--text-secondary)] mb-2">
                Add &quot;{searchTerm.trim()}&quot; as a new school to help build our
                community.
              </p>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur before click
                  handleAddNewSchool();
                }}
                disabled={loading}
                className="text-xs px-3 py-1.5 bg-[var(--lime)] text-[var(--prysm-bg)] rounded-lg font-semibold hover:bg-[var(--lime)]/80 transition-colors disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add School"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}


