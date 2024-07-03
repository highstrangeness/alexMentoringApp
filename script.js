let aprTable = {};

// Function to fetch the APR table from the JSON file
async function fetchAprTable() {
    try {
        const response = await fetch('aprTable.json');
        aprTable = await response.json();
    } catch (error) {
        console.error('Error fetching APR table:', error);
    }
}

function calculateFinanceCharge() {
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    let financeCharge;
    for (let key in aprTable) {
        if (aprTable[key] == interestRate) { // Use '==' to compare number with string
            financeCharge = key;
            break;
        }
    }
    document.getElementById('finance-charge-result').textContent = financeCharge ? `Finance Charge per $100: $${financeCharge}` : 'Interest rate not found';
}

function calculateInterestRate() {
    const financeCharge = parseFloat(document.getElementById('finance-charge').value).toFixed(2);
    const interestRate = aprTable[financeCharge];
    document.getElementById('interest-rate-result').textContent = interestRate ? `Interest Rate: ${interestRate}%` : 'Finance charge not found';
}

function calculatePrincipal() {
    // Get values from inputs
    var I = parseFloat(document.getElementById('interest').value);
    var r_annual = parseFloat(document.getElementById('rate').value); // Input as annual interest rate percentage
    
    // Convert annual percentage rate to monthly interest rate as decimal
    var r_monthly = r_annual / 100 / 12;
    
    var n = parseInt(document.getElementById('months').value);
    
    // Calculate the principal using the formula P = I / (r * n)
    var P = I / (r_monthly * n);
    
    // Display the result
    document.getElementById('result').innerHTML = "Minimum Borrowed Amount: $" + P.toFixed(2);
}

// Fetch the APR table when the page loads
window.onload = fetchAprTable;
