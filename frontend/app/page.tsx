"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            AuraGen Financial Services
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Financial Application
          </h1>

          <p className="mt-2 text-gray-600">
            Please provide the following information to continue your
            application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select employment type</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="business-owner">Business Owner</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
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
                  placeholder="Enter annual income"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  placeholder="Enter monthly expenses"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select an option</option>
                  <option value="none">No existing loans</option>
                  <option value="one">1 existing loan</option>
                  <option value="multiple">Multiple loans</option>
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
    </main>
  );
}