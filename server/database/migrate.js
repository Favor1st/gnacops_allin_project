import { sequelize } from './config.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import Settings from '../models/Settings.js';
import bcrypt from 'bcryptjs';

const migrate = async () => {
  try {
    console.log('🔄 Starting database migration...');

    // Sync all models
    await sequelize.sync({ force: true });
    console.log('✅ Database tables created successfully');

    // Create default admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await User.create({
      email: 'admin@gnacops.org',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      status: 'active',
      membershipNumber: 'GNACOPS-2024-ADMIN',
      emailVerified: true
    });
    console.log('✅ Default admin user created');

    // Create default settings
    const defaultSettings = [
      // General Settings
      {
        key: 'organizationName',
        value: 'Ghana National Association of Community Pharmacists (GNACOPS)',
        category: 'general',
        description: 'Organization name',
        isPublic: true
      },
      {
        key: 'website',
        value: 'https://gnacops.org',
        category: 'general',
        description: 'Organization website',
        isPublic: true
      },
      {
        key: 'contactEmail',
        value: 'info@gnacops.org',
        category: 'general',
        description: 'Contact email',
        isPublic: true
      },
      {
        key: 'address',
        value: '123 Pharmacy Street, Accra, Ghana',
        category: 'general',
        description: 'Organization address',
        isPublic: true
      },
      {
        key: 'phone',
        value: '+233 123 456 789',
        category: 'general',
        description: 'Contact phone',
        isPublic: true
      },

      // Payment Settings
      {
        key: 'currency',
        value: 'GHS',
        category: 'payment',
        description: 'Default currency',
        isPublic: true
      },
      {
        key: 'membershipFee',
        value: '200',
        category: 'payment',
        description: 'Annual membership fee',
        isPublic: true
      },
      {
        key: 'latePaymentFee',
        value: '50',
        category: 'payment',
        description: 'Late payment fee',
        isPublic: true
      },
      {
        key: 'autoReminders',
        value: 'true',
        category: 'payment',
        description: 'Enable automatic payment reminders',
        isPublic: false
      },
      {
        key: 'reminderDays',
        value: '7',
        category: 'payment',
        description: 'Days before payment reminder',
        isPublic: false
      },

      // System Settings
      {
        key: 'maintenanceMode',
        value: 'false',
        category: 'system',
        description: 'Maintenance mode status',
        isPublic: false
      },
      {
        key: 'allowRegistrations',
        value: 'true',
        category: 'system',
        description: 'Allow new user registrations',
        isPublic: false
      },
      {
        key: 'requireEmailVerification',
        value: 'true',
        category: 'system',
        description: 'Require email verification for new users',
        isPublic: false
      },
      {
        key: 'autoApproveApplications',
        value: 'false',
        category: 'system',
        description: 'Auto-approve new applications',
        isPublic: false
      },
      {
        key: 'sessionTimeout',
        value: '30',
        category: 'system',
        description: 'Session timeout in minutes',
        isPublic: false
      },
      {
        key: 'maxLoginAttempts',
        value: '5',
        category: 'system',
        description: 'Maximum login attempts',
        isPublic: false
      },

      // Email Settings
      {
        key: 'smtpHost',
        value: 'smtp.gmail.com',
        category: 'email',
        description: 'SMTP host',
        isPublic: false
      },
      {
        key: 'smtpPort',
        value: '587',
        category: 'email',
        description: 'SMTP port',
        isPublic: false
      },
      {
        key: 'smtpUsername',
        value: 'noreply@gnacops.org',
        category: 'email',
        description: 'SMTP username',
        isPublic: false
      },
      {
        key: 'smtpPassword',
        value: '',
        category: 'email',
        description: 'SMTP password',
        isPublic: false
      },
      {
        key: 'fromName',
        value: 'GNACOPS Admin',
        category: 'email',
        description: 'Email sender name',
        isPublic: false
      },
      {
        key: 'fromEmail',
        value: 'noreply@gnacops.org',
        category: 'email',
        description: 'Email sender address',
        isPublic: false
      },

      // Paystack Settings
      {
        key: 'secretKey',
        value: process.env.PAYSTACK_SECRET_KEY || '',
        category: 'paystack',
        description: 'Paystack secret key',
        isPublic: false
      },
      {
        key: 'publicKey',
        value: process.env.PAYSTACK_PUBLIC_KEY || '',
        category: 'paystack',
        description: 'Paystack public key',
        isPublic: false
      },
      {
        key: 'webhookSecret',
        value: '',
        category: 'paystack',
        description: 'Paystack webhook secret',
        isPublic: false
      },
      {
        key: 'testMode',
        value: 'true',
        category: 'paystack',
        description: 'Paystack test mode',
        isPublic: false
      }
    ];

    for (const setting of defaultSettings) {
      await Settings.create(setting);
    }
    console.log('✅ Default settings created');

    console.log('🎉 Database migration completed successfully!');
    console.log('\n📋 Default Admin Credentials:');
    console.log('Email: admin@gnacops.org');
    console.log('Password: admin123');
    console.log('\n⚠️  Please change the default admin password after first login!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

migrate(); 