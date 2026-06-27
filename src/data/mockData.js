export const products = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Analgesics', manufacturer: 'GSK Pharma', batch: 'BT-2024-001', expiry: '2026-08-15', stock: 1250, minStock: 200, price: 12.50, costPrice: 8.00, status: 'In Stock' },
  { id: 2, name: 'Ibuprofen 400mg', category: 'Analgesics', manufacturer: 'Abbott Labs', batch: 'BT-2024-002', expiry: '2026-05-20', stock: 85, minStock: 100, price: 18.00, costPrice: 11.50, status: 'Low Stock' },
  { id: 3, name: 'Amoxicillin 250mg', category: 'Antibiotics', manufacturer: 'Cipla Ltd', batch: 'BT-2024-003', expiry: '2025-12-10', stock: 430, minStock: 150, price: 45.00, costPrice: 28.00, status: 'In Stock' },
  { id: 4, name: 'Metformin 500mg', category: 'Antidiabetics', manufacturer: 'Sun Pharma', batch: 'BT-2024-004', expiry: '2027-01-30', stock: 620, minStock: 200, price: 22.00, costPrice: 14.00, status: 'In Stock' },
  { id: 5, name: 'Atorvastatin 20mg', category: 'Cardiovascular', manufacturer: 'Pfizer Inc', batch: 'BT-2024-005', expiry: '2026-11-25', stock: 310, minStock: 100, price: 68.00, costPrice: 42.00, status: 'In Stock' },
  { id: 6, name: 'Omeprazole 20mg', category: 'Gastrointestinal', manufacturer: 'AstraZeneca', batch: 'BT-2024-006', expiry: '2025-09-15', stock: 45, minStock: 150, price: 35.00, costPrice: 22.00, status: 'Low Stock' },
  { id: 7, name: 'Cetirizine 10mg', category: 'Antihistamines', manufacturer: 'Zydus Cadila', batch: 'BT-2024-007', expiry: '2026-07-22', stock: 780, minStock: 200, price: 15.00, costPrice: 9.50, status: 'In Stock' },
  { id: 8, name: 'Azithromycin 500mg', category: 'Antibiotics', manufacturer: 'Cipla Ltd', batch: 'BT-2024-008', expiry: '2025-07-05', stock: 165, minStock: 100, price: 85.00, costPrice: 55.00, status: 'In Stock' },
  { id: 9, name: 'Vitamin D3 60K IU', category: 'Vitamins', manufacturer: 'Mankind Pharma', batch: 'BT-2024-009', expiry: '2027-03-18', stock: 920, minStock: 300, price: 28.00, costPrice: 16.00, status: 'In Stock' },
  { id: 10, name: 'Aspirin 75mg', category: 'Cardiovascular', manufacturer: 'Bayer AG', batch: 'BT-2024-010', expiry: '2024-11-30', stock: 0, minStock: 100, price: 10.00, costPrice: 6.50, status: 'Expired' },
  { id: 11, name: 'Pantoprazole 40mg', category: 'Gastrointestinal', manufacturer: 'Torrent Pharma', batch: 'BT-2024-011', expiry: '2026-09-12', stock: 540, minStock: 150, price: 42.00, costPrice: 26.00, status: 'In Stock' },
  { id: 12, name: 'Dolo 650mg', category: 'Analgesics', manufacturer: 'Micro Labs', batch: 'BT-2024-012', expiry: '2026-04-08', stock: 60, minStock: 200, price: 30.00, costPrice: 18.00, status: 'Low Stock' },
  { id: 13, name: 'Levocetirizine 5mg', category: 'Antihistamines', manufacturer: 'UCB Pharma', batch: 'BT-2024-013', expiry: '2027-06-14', stock: 380, minStock: 100, price: 25.00, costPrice: 15.00, status: 'In Stock' },
  { id: 14, name: 'Insulin Glargine', category: 'Antidiabetics', manufacturer: 'Sanofi', batch: 'BT-2024-014', expiry: '2025-10-28', stock: 120, minStock: 50, price: 890.00, costPrice: 620.00, status: 'In Stock' },
  { id: 15, name: 'Amlodipine 5mg', category: 'Cardiovascular', manufacturer: 'Sun Pharma', batch: 'BT-2024-015', expiry: '2025-08-19', stock: 0, minStock: 100, price: 20.00, costPrice: 12.00, status: 'Expired' },
  { id: 16, name: 'Multivitamin Tablet', category: 'Vitamins', manufacturer: 'Pfizer Inc', batch: 'BT-2024-016', expiry: '2026-12-31', stock: 1100, minStock: 300, price: 55.00, costPrice: 32.00, status: 'In Stock' },
  { id: 17, name: 'Clopidogrel 75mg', category: 'Cardiovascular', manufacturer: 'Intas Pharma', batch: 'BT-2024-017', expiry: '2026-10-05', stock: 275, minStock: 100, price: 48.00, costPrice: 30.00, status: 'In Stock' },
  { id: 18, name: 'Montelukast 10mg', category: 'Respiratory', manufacturer: 'Cipla Ltd', batch: 'BT-2024-018', expiry: '2027-02-20', stock: 490, minStock: 150, price: 72.00, costPrice: 46.00, status: 'In Stock' },
  { id: 19, name: 'Ranitidine 150mg', category: 'Gastrointestinal', manufacturer: 'GSK Pharma', batch: 'BT-2024-019', expiry: '2026-06-17', stock: 30, minStock: 100, price: 16.00, costPrice: 10.00, status: 'Low Stock' },
  { id: 20, name: 'Folic Acid 5mg', category: 'Vitamins', manufacturer: 'Mankind Pharma', batch: 'BT-2024-020', expiry: '2027-08-25', stock: 850, minStock: 200, price: 8.00, costPrice: 4.50, status: 'In Stock' },
]

export const suppliers = [
  { id: 1, name: 'MedPharm Distributors', contact: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@medpharm.in', address: '14, Industrial Area, Pune, MH 411014', category: 'Full Range', status: 'Active', totalOrders: 48, totalValue: 485000, rating: 4.8, joined: '2022-01-15' },
  { id: 2, name: 'HealthCare Suppliers', contact: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@hcsuppliers.com', address: '7, Sector 22, Gurgaon, HR 122001', category: 'Generic', status: 'Active', totalOrders: 36, totalValue: 312000, rating: 4.5, joined: '2022-05-20' },
  { id: 3, name: 'PharmaCo Ltd', contact: 'Amit Patel', phone: '+91 76543 21098', email: 'amit@pharmaco.co.in', address: '32, GIDC Estate, Ahmedabad, GJ 380015', category: 'Branded', status: 'Active', totalOrders: 62, totalValue: 728000, rating: 4.9, joined: '2021-08-10' },
  { id: 4, name: 'BioMed Enterprises', contact: 'Sunita Joshi', phone: '+91 65432 10987', email: 'sunita@biomed.in', address: '89, Andheri East, Mumbai, MH 400069', category: 'Specialty', status: 'Inactive', totalOrders: 18, totalValue: 156000, rating: 3.9, joined: '2023-02-28' },
  { id: 5, name: 'Global Pharma Imports', contact: 'Vikram Singh', phone: '+91 54321 09876', email: 'vikram@globalpharma.com', address: '5, Connaught Place, New Delhi, DL 110001', category: 'Imports', status: 'Active', totalOrders: 24, totalValue: 892000, rating: 4.7, joined: '2022-09-05' },
  { id: 6, name: 'Sunrise Medical', contact: 'Neha Gupta', phone: '+91 43210 98765', email: 'neha@sunrisemedical.in', address: '22, Whitefield, Bangalore, KA 560066', category: 'Full Range', status: 'Active', totalOrders: 41, totalValue: 389000, rating: 4.6, joined: '2021-11-14' },
]

export const purchaseOrders = [
  { id: 'PO-2024-001', supplier: 'PharmaCo Ltd', date: '2024-11-28', expectedDelivery: '2024-12-05', items: 12, total: 48500, status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'PO-2024-002', supplier: 'MedPharm Distributors', date: '2024-12-01', expectedDelivery: '2024-12-08', items: 8, total: 32000, status: 'In Transit', paymentStatus: 'Pending' },
  { id: 'PO-2024-003', supplier: 'HealthCare Suppliers', date: '2024-12-05', expectedDelivery: '2024-12-12', items: 15, total: 67200, status: 'Ordered', paymentStatus: 'Pending' },
  { id: 'PO-2024-004', supplier: 'Global Pharma Imports', date: '2024-12-08', expectedDelivery: '2024-12-18', items: 6, total: 125000, status: 'Ordered', paymentStatus: 'Partial' },
  { id: 'PO-2024-005', supplier: 'Sunrise Medical', date: '2024-11-20', expectedDelivery: '2024-11-28', items: 10, total: 41800, status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'PO-2024-006', supplier: 'BioMed Enterprises', date: '2024-11-15', expectedDelivery: '2024-11-25', items: 5, total: 28900, status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'PO-2024-007', supplier: 'PharmaCo Ltd', date: '2024-12-10', expectedDelivery: '2024-12-17', items: 9, total: 55300, status: 'Ordered', paymentStatus: 'Pending' },
]

export const sales = [
  { id: 'INV-2024-1028', date: '2024-12-10', customer: 'City Hospital', type: 'Hospital', items: 8, subtotal: 4850, discount: 242, tax: 218, total: 4826, status: 'Paid', paymentMethod: 'Bank Transfer' },
  { id: 'INV-2024-1027', date: '2024-12-10', customer: 'Wellness Clinic', type: 'Clinic', items: 5, subtotal: 2100, discount: 0, tax: 94, total: 2194, status: 'Paid', paymentMethod: 'Cash' },
  { id: 'INV-2024-1026', date: '2024-12-09', customer: 'MedCare Pharmacy', type: 'Pharmacy', items: 12, subtotal: 8920, discount: 446, tax: 386, total: 8860, status: 'Paid', paymentMethod: 'UPI' },
  { id: 'INV-2024-1025', date: '2024-12-09', customer: 'Sunrise Hospital', type: 'Hospital', items: 20, subtotal: 18500, discount: 925, tax: 790, total: 18365, status: 'Pending', paymentMethod: 'Bank Transfer' },
  { id: 'INV-2024-1024', date: '2024-12-08', customer: 'Dr. Priya Clinic', type: 'Clinic', items: 3, subtotal: 1250, discount: 0, tax: 56, total: 1306, status: 'Paid', paymentMethod: 'Cash' },
  { id: 'INV-2024-1023', date: '2024-12-08', customer: 'Apollo Pharmacy', type: 'Pharmacy', items: 18, subtotal: 12800, discount: 640, tax: 547, total: 12707, status: 'Paid', paymentMethod: 'Card' },
  { id: 'INV-2024-1022', date: '2024-12-07', customer: 'General Hospital', type: 'Hospital', items: 35, subtotal: 42600, discount: 2130, tax: 1820, total: 42290, status: 'Overdue', paymentMethod: 'Bank Transfer' },
  { id: 'INV-2024-1021', date: '2024-12-07', customer: 'LifeCare Stores', type: 'Pharmacy', items: 7, subtotal: 3200, discount: 160, tax: 144, total: 3184, status: 'Paid', paymentMethod: 'UPI' },
  { id: 'INV-2024-1020', date: '2024-12-06', customer: 'Healing Touch Clinic', type: 'Clinic', items: 4, subtotal: 1840, discount: 0, tax: 82, total: 1922, status: 'Paid', paymentMethod: 'Cash' },
  { id: 'INV-2024-1019', date: '2024-12-06', customer: 'Metro Pharmacy', type: 'Pharmacy', items: 9, subtotal: 5600, discount: 280, tax: 239, total: 5559, status: 'Pending', paymentMethod: 'Bank Transfer' },
]

export const revenueData = [
  { month: 'Jan', revenue: 285000, expenses: 198000, profit: 87000 },
  { month: 'Feb', revenue: 312000, expenses: 215000, profit: 97000 },
  { month: 'Mar', revenue: 298000, expenses: 207000, profit: 91000 },
  { month: 'Apr', revenue: 358000, expenses: 245000, profit: 113000 },
  { month: 'May', revenue: 342000, expenses: 238000, profit: 104000 },
  { month: 'Jun', revenue: 389000, expenses: 268000, profit: 121000 },
  { month: 'Jul', revenue: 415000, expenses: 285000, profit: 130000 },
  { month: 'Aug', revenue: 398000, expenses: 274000, profit: 124000 },
  { month: 'Sep', revenue: 445000, expenses: 304000, profit: 141000 },
  { month: 'Oct', revenue: 468000, expenses: 318000, profit: 150000 },
  { month: 'Nov', revenue: 492000, expenses: 335000, profit: 157000 },
  { month: 'Dec', revenue: 528000, expenses: 358000, profit: 170000 },
]

export const stockByCategory = [
  { category: 'Analgesics', stock: 1395, value: 28450 },
  { category: 'Antibiotics', stock: 595, value: 33150 },
  { category: 'Antidiabetics', stock: 740, value: 121400 },
  { category: 'Cardiovascular', stock: 585, value: 42200 },
  { category: 'Gastrointestinal', stock: 615, value: 28050 },
  { category: 'Antihistamines', stock: 1160, value: 21200 },
  { category: 'Vitamins', stock: 2870, value: 92600 },
  { category: 'Respiratory', stock: 490, value: 35280 },
]

export const salesByCategory = [
  { name: 'Analgesics', value: 28 },
  { name: 'Antibiotics', value: 18 },
  { name: 'Vitamins', value: 16 },
  { name: 'Cardiovascular', value: 14 },
  { name: 'Antidiabetics', value: 12 },
  { name: 'Others', value: 12 },
]

export const recentActivity = [
  { id: 1, type: 'sale', message: 'Invoice INV-2024-1028 raised for City Hospital', time: '2 min ago', amount: 4826 },
  { id: 2, type: 'stock', message: 'Ibuprofen 400mg stock below minimum threshold', time: '15 min ago', amount: null },
  { id: 3, type: 'purchase', message: 'PO-2024-003 placed with HealthCare Suppliers', time: '1 hr ago', amount: 67200 },
  { id: 4, type: 'expiry', message: 'Aspirin 75mg expired — 0 units in stock', time: '3 hr ago', amount: null },
  { id: 5, type: 'sale', message: 'Invoice INV-2024-1027 paid by Wellness Clinic', time: '5 hr ago', amount: 2194 },
  { id: 6, type: 'stock', message: 'Vitamin D3 60K IU restocked — 920 units added', time: 'Yesterday', amount: null },
]

export const kpiData = {
  totalProducts: 20,
  totalStock: 8450,
  todaySales: { count: 4, amount: 18152 },
  monthlyRevenue: 528000,
  lowStockCount: 4,
  expiredCount: 2,
}

export const users = [
  { id: 1, name: 'Dr. Harsh Agarwal', email: 'harsh@medicare-erp.com', role: 'Admin', department: 'Management', status: 'Active', lastLogin: '2024-12-10 09:15', avatar: 'HA' },
  { id: 2, name: 'Priya Sharma', email: 'priya@medicare-erp.com', role: 'Pharmacist', department: 'Pharmacy', status: 'Active', lastLogin: '2024-12-10 08:42', avatar: 'PS' },
  { id: 3, name: 'Rahul Gupta', email: 'rahul@medicare-erp.com', role: 'Store Manager', department: 'Inventory', status: 'Active', lastLogin: '2024-12-09 17:30', avatar: 'RG' },
  { id: 4, name: 'Anita Patel', email: 'anita@medicare-erp.com', role: 'Sales Executive', department: 'Sales', status: 'Active', lastLogin: '2024-12-10 10:05', avatar: 'AP' },
  { id: 5, name: 'Suresh Kumar', email: 'suresh@medicare-erp.com', role: 'Accountant', department: 'Finance', status: 'Inactive', lastLogin: '2024-11-28 14:20', avatar: 'SK' },
]

export const paymentReceipts = [
  { id: 'REC-2024-001', date: '2024-12-10', party: 'City Hospital',        amount: 4826,  mode: 'Bank Transfer', utr: 'HDFC2412100001', bank: 'HDFC Bank', status: 'Cleared', against: 'INV-2024-1028', remarks: '' },
  { id: 'REC-2024-002', date: '2024-12-10', party: 'Wellness Clinic',      amount: 2194,  mode: 'Cash',          utr: '-',              bank: '-',         status: 'Cleared', against: 'INV-2024-1027', remarks: 'Counter payment' },
  { id: 'REC-2024-003', date: '2024-12-09', party: 'MedCare Pharmacy',     amount: 8860,  mode: 'UPI',           utr: 'UPI2412090045',  bank: 'PhonePe',   status: 'Cleared', against: 'INV-2024-1026', remarks: '' },
  { id: 'REC-2024-004', date: '2024-12-08', party: 'Dr. Priya Clinic',     amount: 1306,  mode: 'Cash',          utr: '-',              bank: '-',         status: 'Cleared', against: 'INV-2024-1024', remarks: '' },
  { id: 'REC-2024-005', date: '2024-12-08', party: 'Apollo Pharmacy',      amount: 12707, mode: 'Card',          utr: 'TXN8812080092',  bank: 'SBI',       status: 'Cleared', against: 'INV-2024-1023', remarks: '' },
  { id: 'REC-2024-006', date: '2024-12-07', party: 'LifeCare Stores',      amount: 3184,  mode: 'UPI',           utr: 'UPI2412070033',  bank: 'GPay',      status: 'Cleared', against: 'INV-2024-1021', remarks: '' },
  { id: 'REC-2024-007', date: '2024-12-06', party: 'Healing Touch Clinic', amount: 1922,  mode: 'Cash',          utr: '-',              bank: '-',         status: 'Cleared', against: 'INV-2024-1020', remarks: '' },
]

export const creditDebitNotes = [
  { id: 'CN-2024-001', date: '2024-12-08', type: 'Credit', party: 'MedCare Pharmacy',     against: 'INV-2024-1026', amount: 640,  reason: 'Sales Return – Damaged Goods', status: 'Approved', gst: 28.80 },
  { id: 'CN-2024-002', date: '2024-12-07', type: 'Credit', party: 'Apollo Pharmacy',      against: 'INV-2024-1023', amount: 320,  reason: 'Price Difference Adjustment',  status: 'Approved', gst: 14.40 },
  { id: 'DN-2024-001', date: '2024-12-09', type: 'Debit',  party: 'MedPharm Distributors', against: 'PO-2024-002',  amount: 1200, reason: 'Short Quantity Received',      status: 'Pending',  gst: 54.00 },
  { id: 'DN-2024-002', date: '2024-12-06', type: 'Debit',  party: 'PharmaCo Ltd',         against: 'PO-2024-005',  amount: 850,  reason: 'Quality Rejection',            status: 'Approved', gst: 38.25 },
]

export const trialBalanceData = [
  { account: 'Sales Revenue',        group: 'Income',            openingDr: 0,      openingCr: 0,      debit: 0,      credit: 528000, closingDr: 0,      closingCr: 528000 },
  { account: 'Purchase Accounts',    group: 'Expense',           openingDr: 0,      openingCr: 0,      debit: 358000, credit: 0,      closingDr: 358000, closingCr: 0      },
  { account: 'Sundry Debtors',       group: 'Current Asset',     openingDr: 45000,  openingCr: 0,      debit: 62000,  credit: 48000,  closingDr: 59000,  closingCr: 0      },
  { account: 'Sundry Creditors',     group: 'Current Liability', openingDr: 0,      openingCr: 28000,  debit: 85000,  credit: 112000, closingDr: 0,      closingCr: 55000  },
  { account: 'Cash in Hand',         group: 'Cash & Bank',       openingDr: 12500,  openingCr: 0,      debit: 9412,   credit: 8250,   closingDr: 13662,  closingCr: 0      },
  { account: 'Bank Account (HDFC)',  group: 'Cash & Bank',       openingDr: 185000, openingCr: 0,      debit: 98240,  credit: 124500, closingDr: 158740, closingCr: 0      },
  { account: 'GST Payable (CGST)',   group: 'Tax Liability',     openingDr: 0,      openingCr: 8500,   debit: 8500,   credit: 12400,  closingDr: 0,      closingCr: 12400  },
  { account: 'GST Payable (SGST)',   group: 'Tax Liability',     openingDr: 0,      openingCr: 8500,   debit: 8500,   credit: 12400,  closingDr: 0,      closingCr: 12400  },
  { account: 'Input Tax Credit',     group: 'Tax Asset',         openingDr: 6200,   openingCr: 0,      debit: 18500,  credit: 0,      closingDr: 24700,  closingCr: 0      },
  { account: 'Capital Account',      group: 'Capital',           openingDr: 0,      openingCr: 500000, debit: 0,      credit: 0,      closingDr: 0,      closingCr: 500000 },
]

export const outstandingData = [
  { party: 'City Hospital',       type: 'Customer', invoices: 2, '0-30': 4826,  '31-60': 0,     '61-90': 0, '90+': 0, total: 4826  },
  { party: 'Sunrise Hospital',    type: 'Customer', invoices: 1, '0-30': 18365, '31-60': 0,     '61-90': 0, '90+': 0, total: 18365 },
  { party: 'General Hospital',    type: 'Customer', invoices: 1, '0-30': 0,     '31-60': 42290, '61-90': 0, '90+': 0, total: 42290 },
  { party: 'Metro Pharmacy',      type: 'Customer', invoices: 1, '0-30': 5559,  '31-60': 0,     '61-90': 0, '90+': 0, total: 5559  },
  { party: 'PharmaCo Ltd',        type: 'Vendor',   invoices: 3, '0-30': 55300, '31-60': 0,     '61-90': 0, '90+': 0, total: 55300 },
  { party: 'MedPharm Distributors', type: 'Vendor', invoices: 1, '0-30': 32000, '31-60': 0,     '61-90': 0, '90+': 0, total: 32000 },
  { party: 'HealthCare Suppliers', type: 'Vendor',  invoices: 1, '0-30': 67200, '31-60': 0,     '61-90': 0, '90+': 0, total: 67200 },
]

export const eInvoiceData = [
  { id: 'INV-2024-1028', date: '2024-12-10', party: 'City Hospital',     gstin: '27AABCH1234A1ZP', amount: 4826,  irn: 'IRN2412100028182838485900001', ackNo: 'ACK20241200001', ackDate: '2024-12-10', ewayBill: 'EWB24121000028', status: 'Generated' },
  { id: 'INV-2024-1026', date: '2024-12-09', party: 'MedCare Pharmacy',  gstin: '29XYZPH5678B1ZQ', amount: 8860,  irn: 'IRN2412090026123456789000002', ackNo: 'ACK20241200002', ackDate: '2024-12-09', ewayBill: '-',              status: 'Generated' },
  { id: 'INV-2024-1025', date: '2024-12-09', party: 'Sunrise Hospital',  gstin: '07SRHOS9012C1ZR', amount: 18365, irn: '',                              ackNo: '',              ackDate: '',            ewayBill: '',               status: 'Pending'   },
  { id: 'INV-2024-1023', date: '2024-12-08', party: 'Apollo Pharmacy',   gstin: '27APPOL1234X1ZM', amount: 12707, irn: 'IRN2412080023112233445500003', ackNo: 'ACK20241200003', ackDate: '2024-12-08', ewayBill: '-',              status: 'Generated' },
  { id: 'INV-2024-1022', date: '2024-12-07', party: 'General Hospital',  gstin: '06ABCDE9012C1ZR', amount: 42290, irn: 'IRN2412070022109876543200004', ackNo: 'ACK20241200004', ackDate: '2024-12-07', ewayBill: 'EWB24120700022', status: 'Generated' },
  { id: 'INV-2024-1019', date: '2024-12-06', party: 'Metro Pharmacy',    gstin: '27METRO5678Y1ZN', amount: 5559,  irn: '',                              ackNo: '',              ackDate: '',            ewayBill: '',               status: 'Pending'   },
]

export const vendorPurchases = [
  { id: 'VP-2024-001', date: '2024-12-08', vendor: 'Global Pharma Imports',  category: 'Medicine', items: 6,  amount: 125000, gst: 6250, total: 131250, status: 'In Transit', paymentStatus: 'Advance Paid' },
  { id: 'VP-2024-002', date: '2024-12-05', vendor: 'PharmaCo Ltd',           category: 'Medicine', items: 12, amount: 48500,  gst: 2425, total: 50925,  status: 'Received',   paymentStatus: 'Paid'         },
  { id: 'VP-2024-003', date: '2024-12-03', vendor: 'MedPharm Distributors',  category: 'Medicine', items: 8,  amount: 32000,  gst: 1600, total: 33600,  status: 'Received',   paymentStatus: 'Pending'      },
  { id: 'VP-2024-004', date: '2024-12-01', vendor: 'HealthCare Suppliers',   category: 'Others',   items: 5,  amount: 12500,  gst: 2250, total: 14750,  status: 'Received',   paymentStatus: 'Paid'         },
  { id: 'VP-2024-005', date: '2024-11-28', vendor: 'Sunrise Medical',        category: 'Medicine', items: 10, amount: 41800,  gst: 2090, total: 43890,  status: 'Received',   paymentStatus: 'Paid'         },
  { id: 'VP-2024-006', date: '2024-11-25', vendor: 'BioMed Enterprises',     category: 'Others',   items: 4,  amount: 8900,   gst: 1602, total: 10502,  status: 'Partial',    paymentStatus: 'Partial'      },
]

export const gstB2BData = [
  { gstin: '27AABCH1234A1ZP', party: 'City Hospital',     invoices: 2, taxable: 8900,  cgst: 400.5, sgst: 400.5, igst: 0,      total: 9701  },
  { gstin: '29XYZPH5678B1ZQ', party: 'MedCare Pharmacy',  invoices: 1, taxable: 8200,  cgst: 369,   sgst: 369,   igst: 0,      total: 8938  },
  { gstin: '06ABCDE9012C1ZR', party: 'General Hospital',  invoices: 1, taxable: 38500, cgst: 0,     sgst: 0,     igst: 1732.5, total: 40232 },
  { gstin: '27APPOL1234X1ZM', party: 'Apollo Pharmacy',   invoices: 1, taxable: 11000, cgst: 495,   sgst: 495,   igst: 0,      total: 11990 },
  { gstin: '07SRHOS9012C1ZR', party: 'Sunrise Hospital',  invoices: 1, taxable: 17200, cgst: 0,     sgst: 0,     igst: 774,    total: 17974 },
]

export const misSalesData = [
  { month: 'Jul 2024', medicine: 285000, others: 42000, total: 327000, invoices: 88,  customers: 38 },
  { month: 'Aug 2024', medicine: 265000, others: 38500, total: 303500, invoices: 82,  customers: 35 },
  { month: 'Sep 2024', medicine: 318000, others: 52000, total: 370000, invoices: 96,  customers: 42 },
  { month: 'Oct 2024', medicine: 342000, others: 48000, total: 390000, invoices: 104, customers: 44 },
  { month: 'Nov 2024', medicine: 368000, others: 55000, total: 423000, invoices: 112, customers: 48 },
  { month: 'Dec 2024', medicine: 398000, others: 62000, total: 460000, invoices: 128, customers: 55 },
]
