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
