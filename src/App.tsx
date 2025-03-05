import React, { useState } from 'react';
import { PlusCircle, Wallet, PieChart, ArrowUpCircle, ArrowDownCircle, Tag } from 'lucide-react';

type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
};

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    type: 'expense'
  });

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: new Date().toISOString(),
      type: formData.type as 'income' | 'expense'
    };
    setExpenses([...expenses, newExpense]);
    setFormData({ amount: '', category: '', description: '', type: 'expense' });
    setShowForm(false);
  };

  const totalBalance = expenses.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );

  const totalIncome = expenses
    .filter(exp => exp.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = expenses
    .filter(exp => exp.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">ExpenseTracker</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Transaction
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Balance</h2>
              <Wallet className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${totalBalance.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Income</h2>
              <ArrowUpCircle className="h-5 w-5 text-green-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-green-500">
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Expenses</h2>
              <ArrowDownCircle className="h-5 w-5 text-red-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-red-500">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {expenses.length === 0 ? (
              <p className="py-8 text-center text-gray-500">No transactions yet</p>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                      <p className="text-sm text-gray-500">{expense.category}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add Transaction</h3>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;