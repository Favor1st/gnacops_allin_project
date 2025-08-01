import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payments.js';
import vendorRoutes from './routes/vendors.js';
import settingsRoutes from './routes/settings.js';
import installerRoutes from './routes/installer-routes.js';
import membersRoutes from './routes/members.js';
import applicationsRoutes from './routes/applications.js';
import formsRoutes from './routes/forms.js';
import certificatesRoutes from './routes/certificates.js';
import certificateTemplatesRoutes from './routes/certificate-templates.js';

// Import database connection
import { sequelize } from './database/config.js';
import { User } from './models/User.js';
import { Payment } from './models/Payment.js';
import { Application } from './models/Application.js';
import { Form } from './models/Form.js';
import { Certificate } from './models/Certificate.js';
import { CertificateTemplate } from './models/CertificateTemplate.js';
import { Settings } from './models/Settings.js';

// Sample data creation function
const createSampleData = async () => {
  try {
    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@gnacops.com',
      password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      role: 'admin',
      status: 'active',
      membershipNumber: 'ADMIN-001',
      membershipType: 'admin'
    });

    // Create sample members
    const sampleMembers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'member',
        status: 'active',
        membershipNumber: 'MEM-001',
        membershipType: 'Teacher Council',
        phone: '+233123456789',
        region: 'Greater Accra'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'member',
        status: 'active',
        membershipNumber: 'MEM-002',
        membershipType: 'Parent Council',
        phone: '+233987654321',
        region: 'Ashanti'
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'member',
        status: 'pending',
        membershipNumber: 'MEM-003',
        membershipType: 'Institutional',
        phone: '+233555666777',
        region: 'Western'
      }
    ];

    for (const memberData of sampleMembers) {
      await User.create(memberData);
    }

    // Create sample applications
    const sampleApplications = [
      {
        userId: (await User.findOne({ where: { email: 'john.doe@example.com' } })).id,
        type: 'Teacher Council',
        status: 'approved',
        priority: 'normal',
        region: 'Greater Accra',
        contactEmail: 'john.doe@example.com',
        contactPhone: '+233123456789',
        organizationName: 'Accra Academy',
        position: 'Senior Teacher',
        experience: 5,
        education: 'Bachelor of Education',
        additionalNotes: 'Experienced teacher with strong leadership skills.'
      },
      {
        userId: (await User.findOne({ where: { email: 'jane.smith@example.com' } })).id,
        type: 'Parent Council',
        status: 'under_review',
        priority: 'high',
        region: 'Ashanti',
        contactEmail: 'jane.smith@example.com',
        contactPhone: '+233987654321',
        organizationName: 'Kumasi Academy',
        position: 'Parent Representative',
        experience: 3,
        education: 'Bachelor of Arts',
        additionalNotes: 'Active parent with community involvement.'
      }
    ];

    for (const appData of sampleApplications) {
      await Application.create(appData);
    }

    // Create sample forms
    const sampleForms = [
      {
        title: 'Teacher Registration Form',
        description: 'Form for new teacher registrations',
        createdBy: adminUser.id,
        status: 'active',
        type: 'registration',
        fields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'school', label: 'School Name', type: 'text', required: true },
          { name: 'experience', label: 'Years of Experience', type: 'number', required: true }
        ],
        settings: { allowMultipleSubmissions: true }
      },
      {
        title: 'Parent Council Application',
        description: 'Application form for parent council membership',
        createdBy: adminUser.id,
        status: 'active',
        type: 'application',
        fields: [
          { name: 'parentName', label: 'Parent Name', type: 'text', required: true },
          { name: 'childName', label: 'Child Name', type: 'text', required: true },
          { name: 'grade', label: 'Child Grade', type: 'select', options: ['K-5', '6-8', '9-12'], required: true },
          { name: 'reason', label: 'Reason for Joining', type: 'textarea', required: true }
        ],
        settings: { allowMultipleSubmissions: false }
      }
    ];

    for (const formData of sampleForms) {
      await Form.create(formData);
    }

    // Create sample certificates
    const sampleCertificates = [
      {
        userId: (await User.findOne({ where: { email: 'john.doe@example.com' } })).id,
        issuedBy: adminUser.id,
        title: 'Teacher Council Membership',
        description: 'Official membership certificate for Teacher Council',
        type: 'membership',
        status: 'active',
        programName: 'Teacher Council Program',
        achievementTitle: 'Certified Teacher Council Member'
      },
      {
        userId: (await User.findOne({ where: { email: 'jane.smith@example.com' } })).id,
        issuedBy: adminUser.id,
        title: 'Parent Council Membership',
        description: 'Official membership certificate for Parent Council',
        type: 'membership',
        status: 'pending',
        programName: 'Parent Council Program',
        achievementTitle: 'Certified Parent Council Member'
      }
    ];

    for (const certData of sampleCertificates) {
      await Certificate.create(certData);
    }

    // Create sample certificate template
    const sampleTemplate = await CertificateTemplate.create({
      name: 'Default Membership Certificate',
      description: 'Standard membership certificate template',
      createdBy: adminUser.id,
      status: 'active',
      templateHtml: `
        <div class="certificate-container" style="width: 1000px; padding: 60px; border: 10px solid #000; text-align: center; font-family: 'Georgia', serif;">
          <h1 style="font-size: 36px; margin-bottom: 40px;">{{school_name}}</h1>
          <div style="font-size: 22px; margin: 30px 0;">
            <strong>Membership ID:</strong> {{membership_id}}
          </div>
          <div style="font-size: 20px; margin-bottom: 30px;">
            <strong>Date of Issuance:</strong> {{issuance_date}}
          </div>
          <div style="font-size: 18px; margin-bottom: 10px;">
            <strong>Validity:</strong> Valid for {{validity_period}}
          </div>
          <div style="position: absolute; bottom: 60px; left: 60px;">
            <img src="{{signature_url}}" alt="Signature" height="60px">
            <p style="margin: 0;">Authorized Signature</p>
          </div>
          <div style="position: absolute; bottom: 60px; right: 60px;">
            <img src="{{logo_url}}" alt="Logo" height="80px">
          </div>
        </div>
      `,
      settings: {
        width: 1000,
        height: 700,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 10,
        fontFamily: 'Georgia, serif',
        primaryColor: '#000000',
        secondaryColor: '#666666'
      },
      variables: ['school_name', 'membership_id', 'issuance_date', 'validity_period', 'signature_url', 'logo_url'],
      isDefault: true
    });

    console.log('✅ Sample data created successfully');
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  }
};

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Middleware
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/installer', installerRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/certificate-templates', certificateTemplatesRoutes);
// Serve installer
app.get('/installer', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/installer.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database health check endpoint
app.get('/api/db-health', async (req, res) => {
  try {
    await sequelize.authenticate();
    const userCount = await User.count();
    const applicationCount = await Application.count();
    const formCount = await Form.count();
    const certificateCount = await Certificate.count();
    
    res.json({
      status: 'OK',
      database: 'Connected',
      tables: {
        users: userCount,
        applications: applicationCount,
        forms: formCount,
        certificates: certificateCount
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      database: 'Connection Failed',
      error: error.message
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync database models (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');
    
    // Create sample data if no users exist
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('📝 Creating sample data...');
      await createSampleData();
      console.log('✅ Sample data created.');
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app; 