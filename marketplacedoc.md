# Admin Panel

## Page: /admin/dashboard
### Purpose:
Overview of platform stats, charts, and recent activity for administrators.
### Components:
- Stats cards (orders, revenue, users, vendors)
- Line/bar/pie charts (sales, traffic)
- Recent orders table
- Sidebar navigation
- Topbar (search, notifications)
- Quick actions (add product, view reports)
### Actions:
- View stats
- Filter by date range
- Navigate to other admin pages
- View recent orders
### Special Logic:
- Dynamic stats based on real-time data
- Role-based access to certain stats

---

## Page: /admin/products
### Purpose:
Manage all products in the system (view, add, edit, delete, filter).
### Components:
- Products table (name, SKU, price, status, vendor)
- Search bar
- Filters (category, status, vendor)
- Add/Edit product modal
- Bulk actions (delete, status update)
- Pagination
- Status badges
### Actions:
- Add new product
- Edit product details
- Delete product(s)
- Filter/search products
- Bulk update status
### Special Logic:
- Conditional actions based on product status
- Vendor assignment

---

## Page: /admin/orders
### Purpose:
View and manage all customer orders.
### Components:
- Orders table (order ID, customer, status, total, date)
- Search/filter (status, date, customer)
- Order details modal
- Refund/return button
- Invoice view/download
- Pagination
### Actions:
- View order details
- Update order status
- Process refunds/returns
- Download invoice
### Special Logic:
- Status-based actions (e.g., only refund if delivered)
- Dynamic badge colors for status

---

## Page: /admin/users
### Purpose:
Manage all users (customers, vendors, staff).
### Components:
- Users table (name, email, role, status)
- Filter by role/status
- Search bar
- Ban/delete button
- User details modal
- Pagination
### Actions:
- Ban/delete user
- Edit user details
- Filter/search users
### Special Logic:
- Role-based display (show vendor info for vendors)
- Conditional actions (cannot delete admin)

---

## Page: /admin/vendors
### Purpose:
Manage vendor accounts and stores.
### Components:
- Vendor list table (name, store, status, verification)
- Verify/approve button
- View store button
- Vendor details modal
- Search/filter
- Pagination
### Actions:
- Approve/verify vendor
- View vendor store
- Edit vendor details
### Special Logic:
- Show verification status
- Conditional actions for pending/approved vendors

---

## Page: /admin/workers
### Purpose:
Manage internal staff and their roles/permissions.
### Components:
- Staff table (name, email, role)
- Add staff button
- Create/Edit staff modal
- Permissions form (checkbox list)
- Search/filter by role
### Actions:
- Add/edit staff
- Assign roles/permissions
- Delete staff
### Special Logic:
- Role-based access to permissions

---

## Page: /admin/settings
### Purpose:
Configure platform settings (general, email, notifications, payments).
### Components:
- Tabs (General, Email, Notifications, Payments)
- Forms (input fields, toggles, selects)
- Save button
### Actions:
- Update settings
- Toggle features
### Special Logic:
- Conditional fields based on selected tab

---

## Page: /admin/profile
### Purpose:
Admin's personal profile and account settings.
### Components:
- Profile info form
- Change password form
- Profile picture upload
- Save button
### Actions:
- Update profile info
- Change password
### Special Logic:
- Show success/error toasts

---

# User Panel

## Page: /account
### Purpose:
User's account profile and personal info.
### Components:
- Profile picture
- Personal info form
- Change password form
- Save button
- Success/Error toast
### Actions:
- Update personal info
- Change password
### Special Logic:
- Show toasts on save

---

## Page: /orders
### Purpose:
View and track all user orders.
### Components:
- Orders list/table (order ID, status, total, date)
- Order details modal
- Track order button
- Status badges
- Empty state
### Actions:
- View order details
- Track order
### Special Logic:
- Status-based display (e.g., show tracking only if shipped)

---

## Page: /wishlist
### Purpose:
Manage user's wishlist items.
### Components:
- Product grid/list
- Remove from wishlist button
- Add to cart button
- Empty state
### Actions:
- Remove item
- Add item to cart
### Special Logic:
- Show empty state if no items

---

## Page: /cart
### Purpose:
View and manage shopping cart.
### Components:
- Cart table (product, qty, price, total)
- Quantity selector
- Remove button
- Cart summary
- Checkout button
- Empty state
### Actions:
- Update quantity
- Remove item
- Proceed to checkout
### Special Logic:
- Disable checkout if cart is empty

---

## Page: /checkout
### Purpose:
Complete purchase and payment.
### Components:
- Address form
- Payment method selector
- Order summary
- Place order button
- Success/Error message
### Actions:
- Enter address
- Select payment method
- Place order
### Special Logic:
- Show payment options based on country

---

## Page: /addresses
### Purpose:
Manage shipping/billing addresses.
### Components:
- Address list
- Add/Edit address form
- Delete button
### Actions:
- Add/edit/delete address
### Special Logic:
- Show default address

---

## Page: /password-reset
### Purpose:
Reset user password.
### Components:
- Email input
- Send reset link button
- Success/Error message
### Actions:
- Request password reset
### Special Logic:
- Show message after request

---

## Page: /support-tickets
### Purpose:
User support and helpdesk.
### Components:
- Ticket list
- New ticket form
- Ticket details/chat
- Status badge
### Actions:
- Create new ticket
- Reply to ticket
### Special Logic:
- Show status (open/closed)

---

## Page: /notifications
### Purpose:
View all user notifications.
### Components:
- Notification list
- Mark as read button
- Empty state
### Actions:
- Mark notification as read
### Special Logic:
- Show unread badge

---

## Page: /wallet (or /transactions)
### Purpose:
View wallet balance and transaction history.
### Components:
- Balance card
- Transactions table
- Filter by date/type
### Actions:
- Filter/search transactions
### Special Logic:
- Show empty state if no transactions

---

# Vendor Panel

## Page: /vendor/dashboard
### Purpose:
Overview of vendor sales, stats, and recent activity.
### Components:
- Sales stats cards
- Charts (earnings, orders)
- Recent orders table
- Sidebar navigation
- Topbar
### Actions:
- View stats
- Navigate to other vendor pages
### Special Logic:
- Dynamic stats based on vendor data

---

## Page: /vendor/products
### Purpose:
Manage vendor's products (upload, edit, delete).
### Components:
- Product table/list
- Add/Edit product modal
- Status toggle
- Search/filter
- Pagination
### Actions:
- Add/edit/delete product
- Filter/search products
### Special Logic:
- Status-based actions (active/inactive)

---

## Page: /vendor/orders
### Purpose:
View and manage vendor's orders.
### Components:
- Orders table
- Order details modal
- Status update button
- Invoice view/download
- Pagination
### Actions:
- Update order status
- View/download invoice
### Special Logic:
- Status-based actions

---

## Page: /vendor/analytics
### Purpose:
View analytics and performance metrics.
### Components:
- Charts (sales, traffic)
- Date range filter
- Stats cards
### Actions:
- Filter by date
### Special Logic:
- Dynamic chart data

---

## Page: /vendor/earnings
### Purpose:
View earnings and withdrawal history.
### Components:
- Earnings summary card
- Withdrawal request form
- Withdrawal history table
### Actions:
- Request withdrawal
### Special Logic:
- Show pending/approved status

---

## Page: /vendor/settings
### Purpose:
Configure vendor account and store settings.
### Components:
- Tabs (Profile, Store, Payments)
- Forms (input fields, toggles)
- Save button
### Actions:
- Update settings
### Special Logic:
- Conditional fields based on tab

---

## Page: /vendor/profile
### Purpose:
Vendor's public profile and store info.
### Components:
- Store info card
- Edit profile form
- Profile picture upload
### Actions:
- Update profile info
### Special Logic:
- Show success/error toasts

---

# Landing Page / Public Site

## Page: /
### Purpose:
Homepage with featured products, categories, and banners.
### Components:
- Hero banner
- Featured products grid
- Categories section
- Testimonials
- Newsletter signup
### Actions:
- Browse products
- Signup for newsletter
### Special Logic:
- Dynamic featured products

---

## Page: /products
### Purpose:
Browse all products with filters and sorting.
### Components:
- Product grid
- Filters (category, price, rating)
- Sort dropdown
- Pagination
### Actions:
- Filter/sort products
- Add to cart/wishlist
### Special Logic:
- Dynamic filters based on available data

---

## Page: /product/:id
### Purpose:
View single product details.
### Components:
- Product image gallery
- Product info (name, price, description)
- Add to cart/wishlist button
- Reviews section
- Related products
### Actions:
- Add to cart/wishlist
- Submit review
### Special Logic:
- Show out-of-stock state

---

## Page: /about
### Purpose:
About the company/marketplace.
### Components:
- Info sections
- Team members
- Mission/vision
### Actions:
- None (informational)
### Special Logic:
- None

---

## Page: /contact
### Purpose:
Contact form and company info.
### Components:
- Contact form
- Map/location
- Info cards (email, phone)
### Actions:
- Submit contact form
### Special Logic:
- Show success/error message

---

## Page: /faq
### Purpose:
Frequently asked questions.
### Components:
- Accordion/FAQ list
### Actions:
- Expand/collapse FAQ
### Special Logic:
- None

---

## Page: /login
### Purpose:
User/vendor/admin login.
### Components:
- Login form
- Social login buttons
- Forgot password link
### Actions:
- Login
### Special Logic:
- Show error on failed login

---

## Page: /register
### Purpose:
User/vendor registration.
### Components:
- Registration form
- Social signup buttons
### Actions:
- Register
### Special Logic:
- Show error/success message

---

## Page: /forgot-password
### Purpose:
Request password reset link.
### Components:
- Email input
- Send reset link button
### Actions:
- Request reset link
### Special Logic:
- Show message after request

---
