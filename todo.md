# Cursor Task Implementation Documentation

**Project:** Narcos Platform
**Environment:** Cursor IDE (GitHub Clone)
**Stage:** Post-UI Development / Backend Functional Integration

---

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

#### 📄 Example Template Structure (Based on Josan Blooming School PDF)

```html
<div class="certificate-container" style="width: 1000px; padding: 60px; border: 10px solid #000; text-align: center; font-family: 'Georgia', serif;">
  <h1 style="font-size: 36px; margin-bottom: 40px;">{{ school_name }}</h1>

  <div style="font-size: 22px; margin: 30px 0;">
    <strong>Membership ID:</strong> {{ membership_id }}
  </div>

  <div style="font-size: 20px; margin-bottom: 30px;">
    <strong>Date of Issuance:</strong> {{ issuance_date }}
  </div>

  <div style="font-size: 18px; margin-bottom: 10px;">
    <strong>Validity:</strong> Valid for {{ validity_period }}
  </div>

  <div style="position: absolute; bottom: 60px; left: 60px;">
    <img src="{{ signature_url }}" alt="Signature" height="60px">
    <p style="margin: 0;">Authorized Signature</p>
  </div>

  <div style="position: absolute; bottom: 60px; right: 60px;">
    <img src="{{ logo_url }}" alt="Logo" height="80px">
  </div>
</div>
```

#### 🔑 Template Fields Required

| Field Name       | Key (Variable)    | Type         | Example                         |
| ---------------- | ----------------- | ------------ | ------------------------------- |
| School Name      | `school_name`     | String       | Josan Blooming Community School |
| Membership ID    | `membership_id`   | String       | CG12N/25/7501/AR                |
| Date of Issuance | `issuance_date`   | Date         | 29th April, 2025                |
| Validity Period  | `validity_period` | String       | 1 year                          |
| Logo             | `logo_url`        | Image Upload | /assets/logos/gnacops.png       |
| Signature        | `signature_url`   | Image Upload | /assets/signatures/director.png |

#### 🛠 Integration Notes for Cursor

* Store templates as HTML with handlebars-style variables.
* Backend should replace variables with user data.
* Render final certificate as HTML and export to PDF.
* Allow send via email or download.
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

---

**Maintained By:** Narcos Engineering Lead
**Version:** 1.0.0
**Last Updated:** August 1, 2025
