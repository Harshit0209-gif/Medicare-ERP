# GOBT ERP — Medical Inventory Management System

A full-featured ERP frontend for pharmacies, hospitals, and medical distributors. Built with React 18, Vite, and Tailwind CSS v3. Mobile-first, responsive, and designed for real-world pharmaceutical operations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (hooks-based, no class components) |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v3 with custom design tokens |
| Charts | Recharts (Area, Bar, Pie, Line) |
| Icons | Lucide React |
| Routing | React Router v6 |
| State | useState, useContext (AuthContext) |
| Auth Persistence | sessionStorage |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build
```

---

## Login Credentials

The app ships with two demo accounts:

| Role | Email | Password |
|---|---|---|
| Administrator | admin@gobt-erp.com | admin123 |
| Staff | user@gobt-erp.com | user123 |

> The Administrator sees the full dashboard with KPIs, revenue charts, and all management modules. The Staff role sees a simplified task-focused view.

---

## Application Workflow

### 1. Authentication

- User lands on the Login page
- Selects role (Admin / Staff) using the toggle
- Enters credentials or clicks **Auto-fill Demo** to populate them
- On success, session is stored in `sessionStorage` and the user is redirected to the Dashboard
- Logout clears the session and returns to Login

---

### 2. Dashboard

**Admin view includes:**
- Monthly Revenue card with mini bar chart showing last 6 months trend
- Total Stock Units card with stock-out risk counter
- Active Suppliers card
- Pending Invoices card
- Animated number counters on all KPIs
- Revenue area chart (monthly, 12 months)
- Stock by Category pie chart
- Sales by Category doughnut chart
- Metric strip: Today's Sales, Avg Invoice Value, Stock Turnover, Gross Margin
- Low Stock Alerts panel — products below minimum stock level
- Expiry Alerts panel — products expiring within 30 days
- Recent Activity feed — last 10 actions (sales, stock updates, purchases, expiry flags)

**Staff view includes:**
- Quick action buttons (New Sale, Add Stock, New PO, View Reports)
- Pending Tasks panel
- Today's sales summary
- Low stock alert strip

---

### 3. Inventory Management

**Workflow:**
1. View all products in a paginated, sortable table
2. Filter by category (Tablets, Syrup, Injection, Ointment, etc.) and stock status (In Stock, Low Stock, Out of Stock, Expired)
3. Search by product name, manufacturer, or batch number
4. Click column headers to sort ascending/descending
5. Click **Add Product** to open the product modal — fill name, category, manufacturer, batch, expiry date, stock quantity, min stock level, selling price, cost price
6. Click the edit icon on any row to update product details
7. Click the delete icon — confirm deletion in the confirmation modal
8. Table shows: Medicine Name, Category, Batch, Expiry, Stock (color-coded), Min Level, Price, Margin %, Status badge

**Stock status logic:**
- `Out of Stock` — quantity = 0
- `Low Stock` — quantity > 0 but below minimum level
- `Expired` — expiry date has passed
- `In Stock` — everything else

---

### 4. Sales & Billing

**Tabs:** Sales Invoices | E-Invoice

#### Sales Invoices Workflow:
1. View all invoices with summary KPI cards (Total Revenue, Total Invoices, Paid, Pending)
2. Filter by status (Paid, Pending, Overdue), payment method, or customer type
3. Search by invoice number, customer name, or amount
4. Click **New Invoice** to raise a new sale — enter customer name, type, items count, subtotal, discount, GST; total auto-calculates
5. **1-Day Edit Limit:** Invoices can only be edited on the same day they were created. Older invoices show a lock icon — clicking it opens an informational modal directing the user to raise a Credit/Debit Note instead
6. Delete an invoice via the trash icon (with confirmation)

#### E-Invoice Workflow:
1. View all invoices with their IRN (Invoice Reference Number) status
2. Invoices marked **Pending** show a **Generate IRN** button
3. Clicking generates a simulated IRN + Acknowledgement Number, marking the invoice as **Generated**
4. Generated invoices show the IRN, ACK number, ACK date, and E-Way Bill number

---

### 5. Suppliers & Purchase Orders

**Tabs:** Suppliers | Purchase Orders | Vendor Purchase

#### Suppliers Workflow:
1. Browse supplier cards with contact info, payment terms, rating, and outstanding balance
2. Click **Add Supplier** — fill company name, contact person, phone, email, category, address, status
3. Edit or delete suppliers using the action buttons on each card
4. Search suppliers by name, contact person, or city
5. Sort by Name, Outstanding, or Rating

#### Purchase Orders Workflow:
1. View purchase orders in a table with order date, delivery date, amount, and status
2. Status badges: Delivered (green), In Transit (blue), Ordered (gray), Partial (amber)
3. Click **New PO** to create a purchase order — select supplier, set items, amount, expected delivery date
4. Edit status of existing POs

#### Vendor Purchase Workflow:
1. View all vendor purchases categorized as **Medicine** or **Others** (devices, consumables, etc.)
2. Filter by category using pill buttons (All / Medicine / Others)
3. Summary KPIs: Total Purchases, Medicine Spend, Others Spend, Pending Payments
4. Click **Add Purchase** — enter vendor name, category, date, items, base amount, GST rate (GST and total auto-calculate), remarks
5. Export filtered data as CSV

---

### 6. Accounts

**Tabs:** Payment Receipt | Receipt Register | Credit & Debit Note | Trial Balance | Day-wise Outstanding

#### Payment Receipt Workflow:
1. View all received payments with mode, UTR reference, and cleared/pending status
2. Filter by payment mode (Cash, UPI, Card, Bank Transfer)
3. Search by party name, receipt number, or UTR
4. Click **New Receipt** — enter party name, date, amount, payment mode, UTR/reference number, bank, against-invoice, remarks
5. **UTR Duplicate Alert:** If the entered UTR number already exists in the system, an amber warning banner appears immediately — "This UTR number is already recorded. Please verify before saving." This prevents duplicate payment booking
6. Export receipts as CSV

#### Receipt Register:
- Read-only chronological register of all receipts
- Columns: Receipt No., Date, Party, Invoice Reference, Mode, UTR, Amount, Bank, Status
- Totals row at the bottom

#### Credit & Debit Note Workflow:
1. View all credit notes (issued to customers) and debit notes (raised against vendors)
2. Filter by type (Credit / Debit) and status
3. Click **New Note** — select type (Credit/Debit), date, party name, against-invoice, amount, GST rate, reason
4. GST and net amount auto-calculate and display in a preview panel
5. Notes are used to adjust invoices beyond the 1-day edit window

#### Trial Balance:
- Accounting-style table with dark header rows (like Tally/Busy)
- Columns: Account, Group, Opening Dr, Opening Cr, Period Debit, Period Credit, Closing Dr, Closing Cr
- Auto-tally check: shows balance confirmation or mismatch warning
- Export as CSV

#### Day-wise Outstanding:
- Ageing analysis table for both Customer and Vendor outstanding balances
- Columns: Party, Type, Total Invoices, 0–30 days, 31–60 days, 61–90 days, 90+ days, Total Outstanding
- Color-coded by age bucket: green (current), amber (31–60), orange (61–90), red (90+)
- Summary KPIs: Total Outstanding, Customers, Vendors, Critical (90+ days)

---

### 7. Reports & Analytics

**Tabs:** Revenue | Inventory | Sales | Expiry | GST Report | Sales MIS

#### Revenue Tab:
- Revenue trend area chart (monthly)
- Revenue breakdown by category bar chart
- Top products table by revenue contribution

#### Inventory Tab:
- Stock level bar chart by category
- Stock valuation pie chart
- Low stock and out-of-stock summary cards

#### Sales Tab:
- Sales performance trend line chart
- Top customers by revenue table
- Payment method distribution chart

#### Expiry Tab:
- Products expiring in 0–7 days, 8–30 days, 31–90 days
- **Batch-wise Expiry Alert Table:** Columns: Product, Batch No., Manufacturer, Expiry Date, Days Left, Units, Risk Level (Critical/High/Medium)
- Risk color coding: red (Critical, ≤7 days), orange (High, ≤30 days), amber (Medium, ≤90 days)
- Export batch report as CSV

#### GST Report Tab:
- Period selector (month/year) with sub-tabs for GSTR-1, GSTR-2, GSTR-3B
- GSTR-1 B2B table: GSTIN, Party, No. of Invoices, Taxable Value, CGST, SGST, IGST, Total Tax
- Totals row with dark background
- ITC Summary cards: Total ITC Available, ITC Utilized, ITC Balance, Reversal

#### Sales MIS Tab (Consolidated Report):
- 4 KPI cards: Medicine Sales Total, Others Sales Total, Total Invoices, Unique Customers
- Month-wise breakdown table: Month, Medicine, Others, Total, Invoices, Customers, Medicine %
- Grouped bar chart: Medicine vs Others per month
- **Export to CSV/Excel:** Downloads a spreadsheet-compatible file of the full MIS data

---

### 8. Settings

**Tabs:** Profile | Users | Notifications | System

#### Profile:
- Edit personal details: name, email, phone, department, address
- Change password (with current password verification)

#### Users:
- View all system users with role, department, status, last login
- Activate/deactivate users
- Role badges: Admin, Pharmacist, Store Manager, Sales Executive, Accountant

#### Notifications:
- Toggle alerts: Low Stock, Expiry Warning, New Sale, New PO, Payments, System Alerts
- Channel selection: Email Alerts, SMS Alerts

#### System:
- Organisation settings: company name, GST number, drug license, address, phone, email
- System preferences: currency, timezone, date format, language

---

## Mobile Usage

The application is fully responsive with a mobile-first layout:

- **≥ 1024px (Desktop):** Fixed sidebar (collapsible to icon-only), full navbar with user info
- **< 1024px (Mobile/Tablet):** Bottom navigation bar (Home, Inventory, Sales, Accounts, More), hamburger button in the top-left opens the full sidebar as a slide-in drawer with backdrop overlay
- All modals open as **bottom sheets** on mobile (slide up from the bottom, full width)
- All tables scroll horizontally on narrow screens
- Form grids stack to single column on mobile

---

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Layout.jsx       # Root layout: sidebar + navbar + main content
│       ├── Sidebar.jsx      # Navigation drawer (desktop collapse + mobile overlay)
│       ├── Navbar.jsx       # Top bar with page title, hamburger, user menu
│       └── BottomNav.jsx    # Mobile bottom tab navigation
├── context/
│   └── AuthContext.jsx      # Global auth state (user object, login/logout)
├── data/
│   └── mockData.js          # All demo data: products, sales, suppliers, receipts, etc.
├── pages/
│   ├── Login.jsx            # Auth screen with role switcher
│   ├── Dashboard.jsx        # KPI overview (Admin + Staff views)
│   ├── Inventory.jsx        # Product CRUD, stock status, pagination
│   ├── Sales.jsx            # Invoices, E-Invoice, 1-day edit lock
│   ├── Suppliers.jsx        # Suppliers, POs, Vendor Purchase by category
│   ├── Accounts.jsx         # Payment Receipt, Trial Balance, Outstanding, C/D Notes
│   ├── Reports.jsx          # Revenue, Expiry, GST Report, Sales MIS
│   └── Settings.jsx         # Profile, Users, Notifications, System config
├── App.jsx                  # Router setup with protected routes
├── main.jsx                 # React root + AuthProvider
└── index.css                # Tailwind base + component classes
```

---

## Key Business Rules

| Rule | Implementation |
|---|---|
| 1-day invoice edit limit | Invoices dated before today are locked; edit opens informational modal directing to Credit/Debit Note |
| UTR duplicate detection | Real-time check on keypress against existing payment receipts; amber warning shown inline in modal |
| Stock status auto-classification | Computed from quantity, minStock, and expiry date — no manual status entry |
| GST calculation | Entered as base amount + GST rate %; total auto-calculates across Vendor Purchase and Credit/Debit Note forms |
| Role-based dashboard | Admin sees full analytics; Staff sees task-focused quick-action view |
| E-Invoice IRN generation | Simulated client-side IRN generation with timestamp-based reference number |

---

## Demo Data Scope

The application ships with realistic mock data covering:
- 20 pharmaceutical products across 6 categories
- 12 months of revenue and sales trend data
- 10 suppliers with contact details and outstanding balances
- 15 sales invoices with varied statuses and payment methods
- 7 payment receipts with UTR references
- 4 credit/debit notes
- 6 e-invoice records
- 6 vendor purchases (Medicine and Others categories)
- 10 trial balance accounts
- 7 outstanding party records with ageing buckets
- 5 GSTR-1 B2B entries
- 6 months of Sales MIS data

---

*GOBT ERP — Built for clarity and speed in pharmaceutical operations.*
