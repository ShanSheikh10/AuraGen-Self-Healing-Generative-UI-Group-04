"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";

import {
  calculateFrictionScore,
  getFrictionLevel,
  shouldAdaptUI,
  FrictionEvent,
  initialFrictionMetrics,
  FrictionMetrics,
} from "../lib/frictionEngine";

export default function Home() {
  const [stats, setStats] = useState<FrictionMetrics>(
    initialFrictionMetrics
  );

  const [frictionScore, setFrictionScore] = useState(0);

  const frictionLevel = getFrictionLevel(frictionScore);
  const adaptationTriggered = shouldAdaptUI(frictionScore);

  const [events, setEvents] = useState<FrictionEvent[]>([]);

  const [submitted, setSubmitted] = useState(false);

  const focusTime = useRef<number | null>(null);
  const activeField = useRef<string | null>(null);

  // Step 4: Record field focus events.
  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = event.currentTarget.name;

    focusTime.current = Date.now();
    activeField.current = field;

    const interactionEvent: FrictionEvent = {
      id: crypto.randomUUID(),
      field,
      type: "field_focus",
      timestamp: Date.now(),
    };

    setEvents((previous) => [
      ...previous,
      interactionEvent,
    ]);

    setStats((previous) => ({
      ...previous,
      fieldFocuses: previous.fieldFocuses + 1,
    }));
  };

  // Step 5: Measure dwell time and detect hesitation.
  const handleBlur = (
    _event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (
      focusTime.current === null ||
      activeField.current === null
    ) {
      return;
    }

    const durationMs = Date.now() - focusTime.current;
    const field = activeField.current;

    const blurEvent: FrictionEvent = {
      id: crypto.randomUUID(),
      field,
      type: "field_blur",
      timestamp: Date.now(),
      durationMs,
    };

    setEvents((previous) => [
      ...previous,
      blurEvent,
    ]);

    const hesitation = durationMs >= 3000;

    if (hesitation) {
      const hesitationEvent: FrictionEvent = {
        id: crypto.randomUUID(),
        field,
        type: "hesitation",
        timestamp: Date.now(),
        durationMs,
      };

      setEvents((previous) => [
        ...previous,
        hesitationEvent,
      ]);
    }

    setStats((previous) => {
      const nextStats: FrictionMetrics = {
        ...previous,
        totalDwellTime:
          previous.totalDwellTime + durationMs,
        hesitations:
          previous.hesitations +
          (hesitation ? 1 : 0),
      };

      setFrictionScore(
        calculateFrictionScore(nextStats)
      );

      return nextStats;
    });

    focusTime.current = null;
    activeField.current = null;
  };

  // Step 6: Record Backspace corrections.
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Backspace") {
      return;
    }

    const field = event.currentTarget.name;

    const correctionEvent: FrictionEvent = {
      id: crypto.randomUUID(),
      field,
      type: "correction",
      timestamp: Date.now(),
    };

    setEvents((previous) => [
      ...previous,
      correctionEvent,
    ]);

    setStats((previous) => {
      const nextStats: FrictionMetrics = {
        ...previous,
        corrections: previous.corrections + 1,
      };

      setFrictionScore(
        calculateFrictionScore(nextStats)
      );

      return nextStats;
    });
  };

  // Step 7: Record browser validation errors.
  const handleInvalid = (
    event: React.InvalidEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = event.currentTarget.name;

    const validationEvent: FrictionEvent = {
      id: crypto.randomUUID(),
      field,
      type: "validation_error",
      timestamp: Date.now(),
    };

    setEvents((previous) => [
      ...previous,
      validationEvent,
    ]);

    setStats((previous) => {
      const nextStats: FrictionMetrics = {
        ...previous,
        validationErrors:
          previous.validationErrors + 1,
      };

      setFrictionScore(
        calculateFrictionScore(nextStats)
      );

      return nextStats;
    });
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Interaction Monitor */}
        <div className="mb-6 rounded-xl bg-white p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                AuraGen
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                Interaction Monitor
              </h2>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-700">
                Friction Score
              </p>

              <p className="text-3xl font-bold text-red-600">
                {frictionScore}/100
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-700">
                Friction Level
              </p>

              <p className="text-lg font-bold text-gray-600">
                {frictionLevel}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-700">
                Adaptive UI
              </p>

              <p className="text-lg font-bold text-gray-600">
                {adaptationTriggered ? "Triggered" : "Not Triggered"}
              </p>
            </div>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-600">
                Field Focuses
              </p>

              <p className="text-lg font-bold text-blue-600">
                {stats.fieldFocuses}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-600">
                Hesitations
              </p>

              <p className="text-lg font-bold text-purple-600">
                {stats.hesitations}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-600">
                Errors
              </p>

              <p className="text-lg font-bold text-red-600">
                {stats.validationErrors}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-600">
                Corrections
              </p>

              <p className="text-lg font-bold text-green-600">
                {stats.corrections}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Application */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-600">
              AuraGen Financial Services
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Financial Application
            </h1>

            <p className="mt-2 text-gray-600">
              Please provide the following information to
              continue your application.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Personal Information */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Personal Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleInvalid}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>

                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleInvalid}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </section>

            {/* Employment Information */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Employment Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="employmentType"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Employment Type
                  </label>

                  <select
                    id="employmentType"
                    name="employmentType"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select employment type
                    </option>
                    <option value="salaried">
                      Salaried
                    </option>
                    <option value="self-employed">
                      Self-employed
                    </option>
                    <option value="business-owner">
                      Business Owner
                    </option>
                    <option value="student">
                      Student
                    </option>
                    <option value="retired">
                      Retired
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="annualIncome"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Annual Income
                  </label>

                  <input
                    id="annualIncome"
                    name="annualIncome"
                    type="number"
                    min="0"
                    placeholder="Enter annual income"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleInvalid}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </section>

            {/* Financial Information */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Financial Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="monthlyExpenses"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Monthly Expenses
                  </label>

                  <input
                    id="monthlyExpenses"
                    name="monthlyExpenses"
                    type="number"
                    min="0"
                    placeholder="Enter monthly expenses"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleInvalid}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="existingLoans"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Existing Loans
                  </label>

                  <select
                    id="existingLoans"
                    name="existingLoans"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select an option
                    </option>
                    <option value="none">
                      No existing loans
                    </option>
                    <option value="one">
                      1 existing loan
                    </option>
                    <option value="multiple">
                      Multiple loans
                    </option>
                  </select>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Continue Application
              </button>
            </div>

            {submitted && (
              <div className="rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-700">
                Application information submitted successfully.
              </div>
            )}
          </form>
        </div>

        {/* Step 9: Recent Friction Events */}
        <div className="mt-6 rounded-xl bg-white p-5 shadow">
          <h2 className="text-lg font-bold text-gray-900">
            Recent Friction Events
          </h2>

          <div className="mt-4 max-h-48 space-y-2 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-sm text-gray-500">
                No interaction events recorded yet.
              </p>
            ) : (
              events
                .slice(-8)
                .reverse()
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-2 text-sm"
                  >
                    <span className="font-medium text-gray-800">
                      {event.field}
                    </span>

                    <span className="text-gray-600">
                      {event.type}
                    </span>

                    {event.durationMs !== undefined && (
                      <span className="text-gray-500">
                        {event.durationMs} ms
                      </span>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
