# Cath Aesthetics Admin Dashboard - Function Reference & API Guide

## 🔐 AUTHENTICATION FUNCTIONS

### `onAuthStateChanged(auth, callback)`
Checks if user is logged in and redirects if necessary.
```javascript
// Real-time listener automatically calls when auth changes
// Handles: login → dashboard show, logout → redirect to login
```

### `signOut(auth)`
Logs out current user.
```javascript
document.getElementById('logout-btn').addEventListener('click', async () => {
  await signOut(auth);
  window.location.replace("login.html");
});
```

---

## 🧭 NAVIGATION FUNCTIONS

### `navigateTo(page)`
Navigate to a specific page section.
```javascript
navigateTo('clients');      // Go to Client Profiles
navigateTo('appointments'); // Go to Appointments
navigateTo('services');     // Go to Services
navigateTo('inventory');    // Go to Inventory
navigateTo('analytics');    // Go to Analytics
navigateTo('activity');     // Go to Activity Logs
navigateTo('settings');     // Go to Settings
```

---

## 👥 CLIENT MANAGEMENT FUNCTIONS

### `loadClients()`
Real-time listener that loads all clients from Firestore.
```javascript
// Automatically called on page load
// Keeps data synced with database
```

### `openAddClientModal()`
Opens modal to add new client.
```javascript
// Form fields:
// - new-client-name (required)
// - new-client-contact (required)
// - new-client-address
// - new-client-birthdate (optional)
// - new-client-medical (optional)
```

### `closeAddClientModal()`
Closes the add client modal.
```javascript
closeAddClientModal(); // Clears form and hides modal
```

### `viewClientDetail(clientId)`
Opens detailed client profile modal.
```javascript
viewClientDetail('abc123');
// Shows: client info, treatment history, total visits/spending
```

### `deleteClientWithCascade(clientId)`
Deletes client and all related appointments.
```javascript
// Confirms before deletion
// Deletes: client record + all appointments + treatment history
await deleteClientWithCascade('abc123');
```

### `applyClientFilter()`
Applies search and sort filters to client list.
```javascript
// Filters: newest, oldest, most-visits, most-spent
// Search: by name or contact number
```

### `renderClients(clients)`
Renders array of clients as cards.
```javascript
renderClients(allClients);
// Shows: avatar, name, contact, visits, spending, actions
```

### `updateClientOverview()`
Updates client statistics in overview cards.
```javascript
// Updates: total clients, active, total visits, total revenue
```

### `loadRecentClients()`
Loads and displays 5 most recent clients.
```javascript
// Called by: loadDashboardStats()
```

### `loadTopClients()`
Loads and displays top 5 clients by spending.
```javascript
// Shows: name, total spent, medal emoji
```

---

## 📅 APPOINTMENT FUNCTIONS

### `loadAppointments()`
Real-time listener that loads all appointments.
```javascript
// Automatically keeps appointments in sync
```

### `openAddAppointmentModal(prefillClientId, prefillDate)`
Opens appointment creation modal.
```javascript
// Optional parameters to pre-fill form:
openAddAppointmentModal('clientId', '2025-04-15');

// Form fields:
// - modal-appointment-client (required)
// - modal-appointment-date (required)
// - modal-appointment-time (required)
// - modal-appointment-staff (required)
// - service-selector-container (required: select min 1)
// - modal-appointment-mop (payment method)
// - modal-appointment-partial-payment (checkbox)
// - modal-appointment-amount-paid
// - modal-appointment-notes
```

### `closeAddAppointmentModal()`
Closes appointment modal and clears form.
```javascript
closeAddAppointmentModal();
```

### `openWalkInClientModal()`
Opens walk-in appointment dialog.
```javascript
// Auto-fills date/time with current values
// Creates client and appointment simultaneously
```

### `closeWalkInClientModal()`
Closes walk-in appointment modal.
```javascript
closeWalkInClientModal();
```

### `selectCalendarDate(dateStr)`
Shows appointments for selected calendar date.
```javascript
selectCalendarDate('2025-04-15');
// Opens popup showing all appointments for that date
```

### `closeAppointmentDatePopup()`
Closes the appointment date popup.
```javascript
closeAppointmentDatePopup();
```

### `previousMonth()`
Navigate to previous calendar month.
```javascript
previousMonth();
```

### `nextMonth()`
Navigate to next calendar month.
```javascript
nextMonth();
```

### `renderCalendar()`
Re-renders calendar with current month.
```javascript
renderCalendar();
```

### `toggleService(serviceId, serviceName, price)`
Toggle service selection in appointment modal.
```javascript
// Adds/removes from selectedServices array
// Updates price calculation
```

### `updateSelectedServicesDisplay()`
Updates display of selected services.
```javascript
// Shows service tags with prices
```

### `removeService(serviceId)`
Removes service from appointment.
```javascript
removeService('service123');
```

### `updateAppointmentPrice()`
Recalculates appointment total price.
```javascript
// Sum of all selected service prices
```

### `quickUpdateStatus(appointmentId, newStatus)`
Quick update appointment status.
```javascript
// Statuses: 'pending', 'confirmed', 'completed', 'cancelled'
await quickUpdateStatus('apt123', 'completed');
```

### `openAppointmentDetailsModal(appointmentId)`
Opens detailed appointment view.
```javascript
await openAppointmentDetailsModal('apt123');
```

---

## 🛎️ SERVICE FUNCTIONS

### `loadServices()`
Real-time listener for services.
```javascript
// Automatically syncs services from Firestore
```

### `openAddServiceModal()`
Opens service creation modal.
```javascript
// Form fields:
// - service-category (required)
// - service-name (required)
// - service-price (required)
// - service-package-sessions
// - service-package-price (required)
// - service-free-sessions
// - service-description
```

### `closeAddServiceModal()`
Closes service modal.
```javascript
closeAddServiceModal();
```

### `filterServicesByCategory(category)`
Filter services by category.
```javascript
filterServicesByCategory('diode');   // Diode Laser
filterServicesByCategory('emsculpt'); // EmSculpt
filterServicesByCategory('aurelift'); // AureLift
filterServicesByCategory('all');     // Show all
```

### `renderServices(services)`
Renders array of services as cards.
```javascript
renderServices(allServices);
```

### `deleteService(serviceId)`
Delete service.
```javascript
// Confirms before deletion
await deleteService('svc123');
```

### `initializePresetServices()`
Creates default services on first load.
```javascript
// Auto-created on init:
// - Upper Lip & Lower Lip (Diode)
// - Underarm (Diode)
// - Tummy (EmSculpt)
// - Face (AureLift)
```

### `openServicePricingEditor()`
Opens modal to edit service pricing.
```javascript
openServicePricingEditor();
// Edit: per-session price, package sessions, package price, free sessions
```

### `updateServicePricing(serviceId)`
Save updated service pricing.
```javascript
// Validates prices before saving
await updateServicePricing('svc123');
```

---

## 📦 INVENTORY FUNCTIONS

### `loadInventory()`
Real-time listener for inventory.
```javascript
// Automatically syncs inventory from Firestore
```

### `updateInventoryStats()`
Updates inventory statistics.
```javascript
// Shows: total products, low stock count, total value
```

### `openAddInventoryModal()`
Opens inventory add modal.
```javascript
// Form fields:
// - inventory-product-name (required)
// - inventory-category (required)
// - inventory-quantity (required)
// - inventory-min-stock (required)
// - inventory-price
// - inventory-supplier
// - inventory-notes
```

### `closeAddInventoryModal()`
Closes inventory modal.
```javascript
closeAddInventoryModal();
```

### `renderInventory()`
Renders inventory items as cards.
```javascript
renderInventory();
// Shows: name, stock, category, price, value
// Highlights: low stock items in red
```

### `updateInventoryQuantity(productId, change)`
Add or remove inventory quantity.
```javascript
// change: positive (add) or negative (remove)
await updateInventoryQuantity('prod123', 5);   // Add 5
await updateInventoryQuantity('prod123', -2);  // Remove 2
```

### `deleteInventoryProduct(productId)`
Delete inventory product.
```javascript
// Confirms before deletion
await deleteInventoryProduct('prod123');
```

---

## 📊 ANALYTICS & CHARTS FUNCTIONS

### `loadAnalyticsData()`
Loads all data for analytics charts.
```javascript
// Generates:
// - Daily revenue chart
// - Revenue by service
// - Top services
// - Appointment status
// - Payment status
// - Category revenue
// - Monthly trends
// - Performance summary
```

### `filterAnalyticsByDateRange()`
Filter analytics by date range.
```javascript
// Uses: analytics-start-date, analytics-end-date
// Refreshes all charts
```

### `resetAnalyticsFilter()`
Clear date filters and reload all analytics.
```javascript
resetAnalyticsFilter();
```

### `renderDailyRevenueChart(dailyRevenue)`
Bar chart of daily revenue.
```javascript
```

### `renderRevenueChart(revenueByService)`
Pie chart of revenue by service.
```javascript
```

### `renderTopServicesChart(revenueByService, serviceAppointments)`
Horizontal bar chart of top services.
```javascript
```

### `renderStatusChart(appointmentsByStatus)`
Bar chart of appointment statuses.
```javascript
```

### `renderCategoryRevenueChart(revenueByCategory)`
Pie chart of revenue by category.
```javascript
```

### `renderPaymentStatusChart(paymentStatus)`
Doughnut chart of payment statuses.
```javascript
```

### `renderMonthlyTrendsChart(appointments)`
Line chart of 6-month revenue trends.
```javascript
```

### `renderPerformanceSummary(revenueByService, serviceAppointments, totalAppointments)`
Table with service performance metrics.
```javascript
```

### `renderWeekdayLoadChart()`
Bar chart of appointments by day of week.
```javascript
```

---

## 📄 REPORT FUNCTIONS

### `generateDailySummaryReport()`
Generate daily summary PDF.
```javascript
// Includes: date, total appointments, revenue, completed/pending count
// Downloads as: Daily_Report_YYYY-MM-DD.pdf
```

### `generateMonthlySummaryReport()`
Generate monthly summary PDF.
```javascript
// Includes: month, total appointments, revenue, breakdown by service
// Downloads as: Monthly_Report_YYYY_M.pdf
```

### `generateSalesSummaryReport()`
Generate sales summary PDF.
```javascript
// Includes: total sales, fully paid, partial payments, outstanding balance
// Downloads as: Sales_Summary_YYYY_M.pdf
```

### `printClientProfile()`
Print client profile.
```javascript
// Uses browser print dialog
// Requires: currentDetailClientId set
```

### `downloadClientProfilePDF()`
Download client profile as PDF.
```javascript
// Downloads as: Client_Profile_[NAME].pdf
// Requires: currentDetailClientId set
```

---

## 📋 ACTIVITY LOG FUNCTIONS

### `addActivity(content, isError)`
Log activity to Firestore and dashboard.
```javascript
// Parameters:
// - content: string describing action
// - isError: boolean (default false)

addActivity('Added new client: Maria Santos');
addActivity('Error saving appointment', true);
```

### `loadActivityLogs()`
Load all activity logs from Firestore.
```javascript
// Sorts by most recent first
// Called on page load
```

### `renderActivityLogs(logs)`
Render activity logs table.
```javascript
// Shows: timestamp, staff, action, details, status
```

### `filterActivityLogs()`
Filter logs by date and staff.
```javascript
// Uses: activity-filter-date, activity-filter-staff
```

### `clearActivityFilters()`
Clear all activity filters.
```javascript
clearActivityFilters();
```

### `exportActivityLogs()`
Export logs as CSV file.
```javascript
// Downloads as: Activity_Logs_YYYY-MM-DD.csv
```

---

## 🎯 UTILITY FUNCTIONS

### `loadDashboardStats()`
Update all dashboard statistics.
```javascript
// Updates:
// - Total clients
// - Today's appointments
// - Pending appointments
// - Monthly revenue
// - Recent clients
// - Top clients
```

### `escapeHtml(text)`
Escape HTML special characters.
```javascript
// Prevents XSS attacks
const safe = escapeHtml('<script>alert("XSS")</script>');
// Returns: &lt;script&gt;...
```

### `formatDate(date)`
Format date for display.
```javascript
// Format: "Apr 15, 2025" (en-PH locale)
const display = formatDate(new Date());
```

### `getStatusClass(status)`
Get CSS class for appointment status.
```javascript
// Returns:
// 'confirmed' → badge badge-success
// 'pending' → badge badge-warning
// 'completed' → badge badge-info
// 'cancelled' → badge badge-danger
```

---

## 🔥 FIREBASE FUNCTIONS (From firebase.js)

### `initializeApp(firebaseConfig)`
Initialize Firebase connection.
```javascript
// Called automatically on page load
```

### `logActivity(action, details, staffName, staffId, errorStatus)`
Log activity to Firestore.
```javascript
import { logActivity } from './firebase.js';
await logActivity('Added client', 'Client: Maria', 'admin@example.com', 'uid123');
```

### `getUserRole(email)`
Get user role from Firestore.
```javascript
import { getUserRole, db } from './firebase.js';
const role = await getUserRole('admin@example.com');
// Returns: 'admin' or 'employee'
```

### `initializeDefaultServices()`
Create default services collection.
```javascript
import { initializeDefaultServices } from './firebase.js';
await initializeDefaultServices();
// Creates Diode, EmSculpt, AureLift categories
```

---

## 📱 EVENT LISTENERS

All these functions are automatically attached to events:

| Element ID | Event | Function |
|-----------|-------|----------|
| logout-btn | click | signOut & redirect |
| toggle-sidebar | click | Toggle sidebar expand |
| client-filter | change | applyClientFilter |
| client-search | input | applyClientFilter |
| add-client-form | submit | Add client & save |
| add-appointment-form-modal | submit | Create appointment |
| walk-in-client-form | submit | Create walk-in |
| add-service-form | submit | Add service |
| add-inventory-form | submit | Add inventory |
| menu-link | click | navigateTo |

---

## 🔔 GLOBAL VARIABLES

```javascript
let allClients = [];           // All clients from Firestore
let allAppointments = [];      // All appointments from Firestore
let allServices = [];          // All services from Firestore
let allInventory = [];         // All inventory items
let selectedServices = [];     // Services selected in appointment modal
let walkInSelectedServices = [];// Services selected in walk-in modal
let allActivityLogs = [];      // All activity logs
let currentDetailClientId = null; // Currently viewed client
let currentPopupDate = null;   // Currently selected calendar date
let currentUserEmail = '';     // Current user's email
let analyticsCharts = {};      // Chart.js instances
```

---

## 💾 FIRESTORE REAL-TIME LISTENERS

These functions set up real-time listeners that keep data synced:

```javascript
loadClients()      // Syncs client collection
loadAppointments() // Syncs appointment collection
loadServices()     // Syncs services collection
loadInventory()    // Syncs inventory collection
loadActivityLogs() // Syncs activity logs collection
loadClientTreatments(clientId) // Syncs client treatments subcollection
```

---

## ✨ EXAMPLE WORKFLOWS

### Workflow 1: Schedule New Appointment
```javascript
// 1. Open appointment modal
openAddAppointmentModal();

// 2. User selects client, date, time, services (done in UI)

// 3. Form submission triggers:
// - toggleService() called for each selected service
// - updateAppointmentPrice() recalculates total
// - Form validates all fields

// 4. addDoc() saves to Firestore
// 5. addActivity() logs the action
// 6. loadAppointments() refreshes data
```

### Workflow 2: View Client History
```javascript
// 1. Click client card
viewClientDetail(clientId);

// 2. Function calls:
// - getDoc() fetches client data
// - onSnapshot() listens to treatments collection
// - Populates modal with info

// 3. User can:
// - Print profile
// - Download PDF
// - Book appointment
// - Delete client
```

### Workflow 3: Generate Revenue Report
```javascript
// 1. Go to Analytics section
// 2. Click "Sales Summary" button
// 3. generateSalesSummaryReport() called

// 4. Function:
// - Filters appointments by month
// - Groups by payment status
// - Creates HTML report
// - Uses html2pdf to convert

// 5. PDF downloads automatically
```

---

## 🐛 DEBUGGING TIPS

### Check Console for Errors
```javascript
// Open: F12 → Console tab
// Look for red errors
// Most errors include helpful messages
```

### Real-Time Data Sync
```javascript
// All listeners use console.log to show data:
// ✅ Clients loaded: 15 clients
// ✅ Services loaded: 10 services
// etc
```

### Activity Log Tracking
```javascript
// View Activity Logs section for:
// - All user actions
// - Timestamps
// - Error messages
```

---

## 🎓 BEST PRACTICES

1. **Always use addActivity()** when making changes
2. **Validate user input** before submitting forms
3. **Use cascading deletes** for data integrity
4. **Check currentDetailClientId** before operations
5. **Use selectedServices array** for multi-service logic
6. **Format all prices** with toLocaleString() for display
7. **Use formatDate()** for consistent date display
8. **Clone arrays** before sorting to avoid mutations

---

Happy coding! 🚀
