
## Overview

This document outlines the technical tasks for Cursor to implement and complete the functionality of the Narcos project. The UI and UX designs from Lovable have been completed and imported into the project. However, several buttons, pages, and modules are non-functional and require back-end logic, routing, and database integration. Below are the specific implementation tasks.

---

## 1. Membership Module — Admin Panel

### 🚫 Current Issues

* The following buttons are non-functional:

  * `View` (should open detailed member profile)
  * `Edit` (to allow admins to correct membership info)
  * `Suspend` (temporarily disable user access)
  * `Revoke` (permanently disable/delete membership)
  * `Export` (download all membership data in CSV/PDF)
  * `Add Membership` (should open a new form modal or page)

### ✅ What Needs to Be Done

* Create individual routes, pages, and back-end actions for each button.
* Hook the view/edit/suspend/revoke actions to actual data models.
* Ensure `Export` downloads filtered or full data in CSV and PDF.
* Link `Add Membership` to form builder or internal form model.

---

## 2. Application Module — Admin Panel

### 🚫 Current Issues

* Buttons not working:

  * `View`
  * `Contact` (open internal messaging or send email)
  * `Start Review` (begin review process — change status, notify user)
  * `Export All`

### ✅ What Needs to Be Done

* Build `view` pages for each application with full submitted form data.
* Set up `contact` interaction flow (either modal for email or internal thread).
* Implement `Start Review` workflow — admin notes + status change.
* Hook `Export All` to export complete application data.

---

## 3. Form Builder Module

### 🚫 Current Issues

* `View`, `Share`, `Download` buttons are not functional.
* No "Recycle Bin" or restore system for deleted forms.

### ✅ What Needs to Be Done

* Implement form preview via `view` button.
* Enable sharing (generate shareable links with form ID/token).
* Build form download (PDF version or JSON export).
* Create "Trash" module:

  * Automatically move deleted forms to trash.
  * Allow restore of deleted forms.
  * Permanent delete option.

---

## 4. Certificates Module

### 🚫 Current Issues

* Non-functional buttons:

  * `Download`
  * `Email Send`
  * `Revoke`
  * `View`

### ✅ What Needs to Be Done

* Create certificate preview modal/page.
* Implement download button (PDF certificate export).
* Build `Email Send` logic (send certificate to member email).
* Add `Revoke` (disable visibility or mark as invalid).

### 🧩 Certificate Generator Engine & Template Builder

* Implement a dynamic certificate generator engine.
* Create a **Certificate Template Builder** within the admin panel:

  * Drag-and-drop UI to design certificate layout
  * Add components like **Logo**, **User Name**, **Signature**, **QR Code**, **Award Title**, **Date**
  * Font selection, spacing, and color options
  * Preview mode before saving
* Allow saving and reusing templates for different programs.
* Generated certificates should inherit saved templates and merge user data dynamically.
* Store templates and allow updating by Super Admin or Admin Workers.
* Create certificate preview modal/page.
* Implement download button (PDF certificate export).
* Build `Email Send` logic (send certificate to member email).
* Add `Revoke` (disable visibility or mark as invalid).

---

## Notes

* Many issues stem from missing backend logic or undefined routes/components.
* Cursor should:

  * Define and register new routes
  * Build necessary controller methods
  * Link buttons to these methods
  * Ensure UI feedback and error handling

---

## Next Steps

1. Prioritize modules (Start with Membership)
2. Confirm DB models for membership, applications, forms, and certificates
3. Create missing views and components
4. Connect all buttons to logic and backend actions
5. Test flow for each user role
