"use client";

import { useState, useEffect, useRef } from "react";
import { searchCourses, createCourse, getRecommendedCourses, type Course } from "@/lib/firebase/courses";
import { courseCategories } from "@/lib/data/courses";
import { motion, AnimatePresence } from "framer-motion";

interface CourseSearchProps {
  value: string;
  onChange: (courseName: string, courseId?: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  category?: string; // Optional category filter
}

export function CourseSearch({
  value,
  onChange,
  placeholder = "Search for your course...",
  required = false,
  className = "",
  category,
}: CourseSearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update search term when value prop changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Update category when prop changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

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

  // Load recommendations when category changes (but no search term)
  useEffect(() => {
    // Only show recommendations if no search term or search term is very short
    if (searchTerm.length >= 2) {
      setRecommendations([]);
      return;
    }

    const loadRecommendations = async () => {
      try {
        const recs = await getRecommendedCourses(
          selectedCategory || undefined,
          8 // Show 8 recommendations
        );
        setRecommendations(recs);
      } catch (error) {
        console.error("Error loading recommendations:", error);
        setRecommendations([]);
      }
    };

    loadRecommendations();
  }, [selectedCategory, searchTerm]);

  // Search for courses when search term changes
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchCourses(
          searchTerm,
          selectedCategory || undefined,
          10
        );
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error("Error searching courses:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, selectedCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue, undefined);
    setSelectedCourseId(undefined);
    setShowSuggestions(true);
  };

  const handleSelectCourse = (course: Course) => {
    setSearchTerm(course.name);
    setSelectedCourseId(course.id);
    onChange(course.name, course.id);
    setShowSuggestions(false);
  };

  const handleAddNewCourse = async () => {
    if (!searchTerm.trim() || !selectedCategory) return;

    try {
      setLoading(true);
      const newCourse = await createCourse(
        searchTerm.trim(),
        selectedCategory
      );
      setSelectedCourseId(newCourse.id);
      onChange(newCourse.name, newCourse.id);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error creating course:", error);
      // Still allow user to continue with the course name
      onChange(searchTerm.trim());
    } finally {
      setLoading(false);
    }
  };

  const canAddNew = searchTerm.trim().length >= 3 && !selectedCourseId && selectedCategory;

  return (
    <div ref={containerRef} className={`space-y-3 ${className}`}>
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Department/Category <span className="text-red-400">*</span>
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchTerm('');
            setSelectedCourseId(undefined);
            onChange('', undefined);
          }}
          className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer"
          required
        >
          <option value="">Select a department/category</option>
          {courseCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Course Search */}
      {selectedCategory && (
        <div className="relative">
          <label className="block text-sm font-semibold mb-2">
            Course/Program <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] transition-colors pr-10"
              placeholder={placeholder}
              required={required}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <i className="fa-solid fa-spinner fa-spin text-[var(--text-tertiary)]"></i>
              </div>
            )}
            {!loading && searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  onChange("");
                  setSelectedCourseId(undefined);
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-times"></i>
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
                Popular Courses
              </p>
              <div className="flex flex-wrap gap-2">
                {recommendations.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => handleSelectCourse(course)}
                    className="px-3 py-2 text-sm bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-overlay-hover)] hover:border-[var(--lime)]/30 transition-all hover:scale-105"
                  >
                    {course.name}
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
                  {suggestions.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => handleSelectCourse(course)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[var(--text-primary)] truncate">
                            {course.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[var(--text-secondary)]">
                              {course.category}
                            </span>
                            {course.studentCount !== undefined && course.studentCount > 0 && (
                              <span className="text-xs text-[var(--lime)]">
                                • {course.studentCount} student
                                {course.studentCount !== 1 ? "s" : ""}
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
                    Course not found?
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">
                    Add &quot;{searchTerm.trim()}&quot; as a new course in {selectedCategory}.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddNewCourse}
                    disabled={loading}
                    className="text-xs px-3 py-1.5 bg-[var(--lime)] text-[var(--prysm-bg)] rounded-lg font-semibold hover:bg-[var(--lime)]/80 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Adding..." : "Add Course"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

