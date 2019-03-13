import { Map } from 'immutable';

export function clearToken() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function getToken() {
  try {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    return new Map({ access_token, refresh_token });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function formatPesos(n = 0) {
  if (typeof n == 'string') {
    n = n.replace(',', '');
  }
  var parts = parseFloat(n)
    .toFixed(2)
    .split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

export function getAmmortization(monthlySalary = 0) {
  let x, y, ammortization;
  x = monthlySalary * 0.3;
  y = x * 0.08;
  ammortization = x + y;
  return ammortization;
}

export function getTotalAmount(
  ammortization = 0,
  loanTenure = 0,
  downpayment = 0
) {
  let ta, z, totalAmount;
  ta = ammortization * (loanTenure * 12);
  z = ta * (downpayment / 100);
  totalAmount = ta - z;
  return totalAmount;
}
