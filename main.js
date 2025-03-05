class ExpenseTracker {
  constructor() {
    this.transactions = [];
    this.modal = document.getElementById('modal');
    this.form = document.getElementById('transactionForm');
    this.addTransactionBtn = document.getElementById('addTransactionBtn');
    this.cancelBtn = document.getElementById('cancelBtn');
    this.transactionsList = document.getElementById('transactionsList');
    
    this.initializeEventListeners();
    this.updateUI();
  }

  initializeEventListeners() {
    this.addTransactionBtn.addEventListener('click', () => this.openModal());
    this.cancelBtn.addEventListener('click', () => this.closeModal());
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  openModal() {
    this.modal.classList.add('active');
  }

  closeModal() {
    this.modal.classList.remove('active');
    this.form.reset();
  }

  handleSubmit(e) {
    e.preventDefault();

    const transaction = {
      id: Date.now().toString(),
      type: document.getElementById('type').value,
      amount: parseFloat(document.getElementById('amount').value),
      category: document.getElementById('category').value,
      description: document.getElementById('description').value,
      date: new Date().toISOString()
    };

    this.transactions.push(transaction);
    this.updateUI();
    this.closeModal();
  }

  calculateTotals() {
    return this.transactions.reduce(
      (acc, curr) => {
        const amount = curr.amount;
        if (curr.type === 'income') {
          acc.income += amount;
          acc.balance += amount;
        } else {
          acc.expenses += amount;
          acc.balance -= amount;
        }
        return acc;
      },
      { balance: 0, income: 0, expenses: 0 }
    );
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  updateUI() {
    const { balance, income, expenses } = this.calculateTotals();

    document.getElementById('totalBalance').textContent = this.formatCurrency(balance);
    document.getElementById('totalIncome').textContent = this.formatCurrency(income);
    document.getElementById('totalExpenses').textContent = this.formatCurrency(expenses);

    this.updateTransactionsList();
  }

  updateTransactionsList() {
    if (this.transactions.length === 0) {
      this.transactionsList.innerHTML = '<p class="no-transactions">No transactions yet</p>';
      return;
    }

    this.transactionsList.innerHTML = this.transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(transaction => `
        <div class="transaction-item">
          <div class="transaction-info">
            <h3>${transaction.description}</h3>
            <span class="transaction-category">${transaction.category}</span>
          </div>
          <span class="transaction-amount ${transaction.type}">
            ${transaction.type === 'income' ? '+' : '-'}${this.formatCurrency(transaction.amount)}
          </span>
        </div>
      `)
      .join('');
  }
}

// Initialize the expense tracker
new ExpenseTracker();