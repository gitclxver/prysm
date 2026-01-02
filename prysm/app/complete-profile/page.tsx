"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { updateUserProfile } from "@/lib/firebase/profile";
import {
  countryRegions,
  gradeLevels,
  countrySyllabi,
  universities,
} from "@/lib/data/regions";
import { getDepartmentsForUniversity } from "@/lib/data/departments";
import { SchoolSearch } from "@/components/SchoolSearch";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { motion, AnimatePresence } from "framer-motion";
import { incrementSchoolStudentCount } from "@/lib/firebase/schools";
import { sanitizeError } from "@/lib/utils/errorHandler";
import { withFirebaseDelay } from "@/lib/utils/firebaseDelay";

type Country = "Namibia" | "South Africa" | "Eswatini" | "";
type StudentType = "highschool" | "tertiary" | "";

export default function CompleteProfilePage() {
  const { user, userProfile, refreshUserProfile, isProfileComplete } =
    useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [country, setCountry] = useState<Country>(userProfile?.country || "");
  const [region, setRegion] = useState(userProfile?.region || "");
  const [school, setSchool] = useState(userProfile?.school || "");
  const [schoolId, setSchoolId] = useState<string | undefined>(undefined);
  const [studentType, setStudentType] = useState<StudentType>(
    userProfile?.isUniversityStudent
      ? "tertiary"
      : userProfile?.grade || userProfile?.level
      ? "highschool"
      : ""
  );
  const [grade, setGrade] = useState(userProfile?.grade || "");
  const [level, setLevel] = useState(userProfile?.level || "");
  const [university, setUniversity] = useState(userProfile?.university || "");
  const [otherUniversity, setOtherUniversity] = useState("");
  const [department, setDepartment] = useState(userProfile?.department || "");
  const [syllabus, setSyllabus] = useState(userProfile?.syllabus || "");
  const availableRegions = country ? countryRegions[country] || [] : [];
  const availableGrades = country ? gradeLevels[country]?.grades || [] : [];
  const availableLevels = country ? gradeLevels[country]?.levels || [] : [];
  const availableUniversities = country ? universities[country] || [] : [];
  const availableSyllabi = country ? countrySyllabi[country] || [] : [];

  // Check if profile is already complete
  useEffect(() => {
    if (userProfile && isProfileComplete(userProfile)) {
      router.push("/dashboard");
    }
  }, [userProfile, router, isProfileComplete]);

  // Reset dependent fields when country changes
  useEffect(() => {
    if (country && userProfile?.country !== country) {
      setRegion("");
      setSchool("");
      setSchoolId(undefined);
      setGrade("");
      setLevel("");
      setUniversity("");
      setOtherUniversity("");
      setDepartment("");
      setSyllabus("");
      // If country changes and we're past step 1, go back to step 2
      if (currentStep > 1) {
        setCurrentStep(2);
      }
    }
  }, [country, userProfile?.country, currentStep]);

  const saveStep = async (stepData: Record<string, any>) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    await withFirebaseDelay(updateUserProfile(user.uid, stepData), 500);
    await withFirebaseDelay(refreshUserProfile(), 500);
  };

  const handleNext = async () => {
    setError("");

    try {
      // Validate current step
      if (currentStep === 1 && !country) {
        setError("Please select your country");
        return;
      }
      if (currentStep === 2 && !region) {
        setError("Please select your region");
        return;
      }
      if (currentStep === 3) {
        if (!studentType) {
          setError("Please select whether you are in high school or tertiary");
          return;
        }
      }
      if (currentStep === 4 && !school) {
        setError("Please select or enter your school/institution");
        return;
      }
      // Note: Grade/Level validation moved - will be handled when we add that step
      if (currentStep === 5) {
        if (studentType === "highschool") {
          if (!grade && !level) {
            setError("Please select your grade or level");
            return;
          }
          if (!syllabus) {
            setError("Please select your syllabus");
            return;
          }
        } else if (studentType === "tertiary") {
          if (!department) {
            setError("Please select your department");
            return;
          }
        }
      }

      // Save current step data
      setLoading(true);
      if (currentStep === 1) {
        await saveStep({
          country: country as "Namibia" | "South Africa" | "Eswatini",
        });
      } else if (currentStep === 2) {
        await saveStep({ region });
      } else if (currentStep === 3) {
        // Save education level type
        if (studentType === "highschool") {
          await saveStep({ isUniversityStudent: false });
        } else if (studentType === "tertiary") {
          await saveStep({ isUniversityStudent: true });
        }
      } else if (currentStep === 4) {
        await saveStep({ school });
        // For tertiary, also save university if school name matches
        if (studentType === "tertiary") {
          await saveStep({ university: school || undefined });
        }
        // Increment school student count if school was selected
        if (schoolId && school) {
          try {
            await incrementSchoolStudentCount(schoolId);
          } catch (error) {
            console.error("Error incrementing school student count:", error);
            // Don't fail the profile update if this fails
          }
        }
      } else if (currentStep === 5) {
        if (studentType === "highschool") {
          // Save grade/level and syllabus for high school (final step)
          await saveStep({
            grade: grade || undefined,
            level: level || undefined,
            syllabus: syllabus as any,
          });
          // Refresh profile to ensure latest data is loaded (delay handled in saveStep)
          // Profile is complete, redirect to dashboard with firstLogin flag
          router.push("/dashboard?firstLogin=true");
          return;
        } else if (studentType === "tertiary") {
          // Save department for tertiary (final step)
          await saveStep({ department: department || undefined });
          // Refresh profile to ensure latest data is loaded (delay handled in saveStep)
          // Profile is complete, redirect to dashboard with firstLogin flag
          router.push("/dashboard?firstLogin=true");
          return;
        }
      }

      setLoading(false);
      setCurrentStep(currentStep + 1);
    } catch (err: any) {
      const friendlyError = sanitizeError(err);
      if (friendlyError) {
        setError(friendlyError);
      } else {
        setError('Failed to save. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  // Dynamic step titles and icons based on student type
  const stepConfig =
    studentType === "tertiary"
      ? [
          { title: "Country", icon: "fa-globe" },
          { title: "Region", icon: "fa-map-marker-alt" },
          { title: "Education", icon: "fa-graduation-cap" },
          { title: "School", icon: "fa-school" },
          { title: "Department", icon: "fa-building" },
        ]
      : [
          { title: "Country", icon: "fa-globe" },
          { title: "Region", icon: "fa-map-marker-alt" },
          { title: "Education", icon: "fa-graduation-cap" },
          { title: "School", icon: "fa-school" },
          { title: "Grade", icon: "fa-book" },
        ];

  const totalSteps = stepConfig.length;

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-12 bg-[var(--prysm-bg)]">
        <Card className="max-w-2xl w-full p-4 sm:p-6 md:p-8">
          {/* Progress Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold">Complete Your Profile</h1>
              <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              {stepConfig.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-1.5 flex-1"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-[var(--lime)] text-[var(--prysm-bg)]"
                          : isCurrent
                          ? "bg-[var(--lime)]/20 text-[var(--lime)] border-2 border-[var(--lime)]"
                          : "bg-[var(--bg-overlay)] text-[var(--text-tertiary)] border border-[var(--border-color)]"
                      }`}
                    >
                      <i className={`fa-solid ${step.icon} text-sm`}></i>
                    </div>
                    <span
                      className={`text-xs text-center ${
                        isCompleted || isCurrent
                          ? "text-[var(--lime)] font-semibold"
                          : "text-[var(--text-tertiary)]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-[var(--bg-overlay)] rounded-full h-2 overflow-hidden mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--lime)] to-[var(--lime)]/80"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep - 0.5) / totalSteps) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                Select Your{" "}
                {stepConfig[currentStep - 1]?.title || "Information"}
              </h2>

              {/* Step 1: Country */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)] mb-4">
                    Let's start by selecting your country. This helps us provide
                    the right educational resources for you.
                  </p>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value as Country)}
                    className="w-full px-4 py-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer text-lg"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="Namibia">Namibia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Eswatini">Eswatini</option>
                  </select>
                </div>
              )}

              {/* Step 2: Region */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)] mb-4">
                    Now select your region or province in {country}.
                  </p>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer text-lg"
                    required
                  >
                    <option value="">Select your region</option>
                    {availableRegions.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Step 3: Education Level (High School vs Tertiary) */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)] mb-4">
                    Are you currently in high school or tertiary/university
                    education?
                  </p>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Education Level <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={studentType}
                      onChange={(e) => {
                        const newType = e.target.value as StudentType;
                        setStudentType(newType);
                        // Reset dependent fields when type changes
                        setSchool("");
                        setSchoolId(undefined);
                        if (newType === "highschool") {
                          setUniversity("");
                          setOtherUniversity("");
                        } else {
                          setGrade("");
                          setLevel("");
                        }
                      }}
                      className="w-full px-4 py-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer text-lg"
                      required
                    >
                      <option value="">Select your education level</option>
                      <option value="highschool">High School</option>
                      <option value="tertiary">Tertiary/University</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: School/Institution (filtered by type from step 3) */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)] mb-4">
                    {studentType === "tertiary"
                      ? "Search for your university or institution, or add it if it's not in our database."
                      : "Search for your school or add it if it's not in our database."}
                  </p>
                  <SchoolSearch
                    value={school}
                    onChange={(schoolName, id) => {
                      setSchool(schoolName);
                      setSchoolId(id);
                      // For tertiary, also set university field
                      if (studentType === "tertiary") {
                        setUniversity(schoolName);
                      }
                    }}
                    country={country}
                    region={region}
                    type={studentType || undefined}
                    placeholder={
                      studentType === "tertiary"
                        ? "Search for your university..."
                        : "Search for your school..."
                    }
                  />
                </div>
              )}

              {/* Step 5: Grade/Level (for high school) OR Syllabus (for tertiary) */}
              {currentStep === 5 && studentType === "highschool" && (
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)] mb-4">
                    Select your current grade or level, and your syllabus.
                  </p>
                  {availableGrades.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Grade <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={grade}
                        onChange={(e) => {
                          setGrade(e.target.value);
                          setLevel("");
                        }}
                        className="w-full px-4 py-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer text-lg mb-4"
                        required
                      >
                        <option value="">Select your grade</option>
                        {availableGrades.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {availableLevels.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Level (Optional)
                      </label>
                      <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full px-4 py-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer text-lg mb-4"
                      >
                        <option value="">Select your level (optional)</option>
                        {availableLevels.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Syllabus/Curriculum{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={syllabus}
                      onChange={(e) => setSyllabus(e.target.value)}
                      className="w-full px-4 py-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer text-lg"
                      required
                    >
                      <option value="">Select your syllabus</option>
                      {availableSyllabi.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {country === "South Africa" && (
                      <p className="text-xs text-[var(--text-secondary)] mt-2">
                        CAPS: Public schools | IEB: Private/Independent schools
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Department Selection (for tertiary) */}
              {currentStep === 5 && studentType === "tertiary" && (
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)] mb-4">
                    Select your department from the list below. Departments are
                    filtered based on your selected university.
                  </p>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-4 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--lime)] transition-colors appearance-none cursor-pointer text-lg"
                    required
                  >
                    <option value="">Select your department</option>
                    {getDepartmentsForUniversity(school || "Other").map(
                      (dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      )
                    )}
                  </select>
                  {!school && (
                    <p className="text-xs text-[var(--text-secondary)] mt-2">
                      Please select your university first to see relevant
                      departments.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 pt-6 border-t border-[var(--border-color)]">
            <div className="flex gap-3">
              {currentStep === 1 ? (
                <Link href="/">
                  <Button variant="outline" className="px-6">
                    <i className="fa-solid fa-home mr-2"></i>
                    Back to Website
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                  className="px-6"
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  Back
                </Button>
              )}
            </div>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={loading}
              className="px-6"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Saving...
                </>
              ) : currentStep === totalSteps ? (
                <>
                  Complete <i className="fa-solid fa-check ml-2"></i>
                </>
              ) : (
                <>
                  Next <i className="fa-solid fa-arrow-right ml-2"></i>
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
