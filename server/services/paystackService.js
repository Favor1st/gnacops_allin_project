import axios from 'axios';
import crypto from 'crypto';
import Settings from '../models/Settings.js';

class PaystackService {
  constructor() {
    this.baseURL = 'https://api.paystack.co';
    this.secretKey = process.env.PAYSTACK_SECRET_KEY;
    this.publicKey = process.env.PAYSTACK_PUBLIC_KEY;
  }

  // Initialize payment transaction
  async initializePayment(data) {
    try {
      const response = await axios.post(
        `${this.baseURL}/transaction/initialize`,
        {
          email: data.email,
          amount: data.amount * 100, // Convert to kobo (smallest currency unit)
          reference: data.reference,
          callback_url: data.callbackUrl,
          metadata: {
            userId: data.userId,
            paymentType: data.paymentType,
            description: data.description
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data.data,
        message: 'Payment initialized successfully'
      };
    } catch (error) {
      console.error('Paystack initialization error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to initialize payment',
        code: error.response?.status
      };
    }
  }

  // Verify payment transaction
  async verifyPayment(reference) {
    try {
      const response = await axios.get(
        `${this.baseURL}/transaction/verify/${reference}`,
        {
          headers: {
            'Authorization': `Bearer ${this.secretKey}`
          }
        }
      );

      const transaction = response.data.data;
      
      return {
        success: true,
        data: {
          status: transaction.status,
          amount: transaction.amount / 100, // Convert from kobo
          reference: transaction.reference,
          transactionId: transaction.id,
          paidAt: transaction.paid_at,
          gateway: transaction.gateway,
          channel: transaction.channel,
          metadata: transaction.metadata
        },
        message: 'Payment verified successfully'
      };
    } catch (error) {
      console.error('Paystack verification error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to verify payment',
        code: error.response?.status
      };
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(payload, signature) {
    try {
      const hash = crypto
        .createHmac('sha512', this.secretKey)
        .update(JSON.stringify(payload))
        .digest('hex');

      return hash === signature;
    } catch (error) {
      console.error('Webhook signature verification error:', error);
      return false;
    }
  }

  // Process webhook event
  async processWebhook(event) {
    try {
      const { event: eventType, data } = event;

      switch (eventType) {
        case 'charge.success':
          return await this.handleSuccessfulPayment(data);
        case 'charge.failed':
          return await this.handleFailedPayment(data);
        case 'transfer.success':
          return await this.handleSuccessfulTransfer(data);
        case 'transfer.failed':
          return await this.handleFailedTransfer(data);
        default:
          return {
            success: false,
            error: `Unhandled event type: ${eventType}`
          };
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
      return {
        success: false,
        error: 'Failed to process webhook'
      };
    }
  }

  // Handle successful payment
  async handleSuccessfulPayment(data) {
    try {
      const { reference, amount, metadata } = data;
      
      // Update payment status in database
      const Payment = (await import('../models/Payment.js')).default;
      const payment = await Payment.findOne({ where: { paystackReference: reference } });
      
      if (payment) {
        await payment.update({
          status: 'successful',
          paystackTransactionId: data.id,
          paidAt: new Date(),
          gatewayResponse: data
        });
      }

      return {
        success: true,
        message: 'Payment processed successfully',
        reference
      };
    } catch (error) {
      console.error('Error handling successful payment:', error);
      return {
        success: false,
        error: 'Failed to process successful payment'
      };
    }
  }

  // Handle failed payment
  async handleFailedPayment(data) {
    try {
      const { reference, failure_reason } = data;
      
      const Payment = (await import('../models/Payment.js')).default;
      const payment = await Payment.findOne({ where: { paystackReference: reference } });
      
      if (payment) {
        await payment.update({
          status: 'failed',
          failureReason: failure_reason,
          gatewayResponse: data
        });
      }

      return {
        success: true,
        message: 'Failed payment processed',
        reference
      };
    } catch (error) {
      console.error('Error handling failed payment:', error);
      return {
        success: false,
        error: 'Failed to process failed payment'
      };
    }
  }

  // Handle successful transfer
  async handleSuccessfulTransfer(data) {
    // Implement transfer success logic
    return {
      success: true,
      message: 'Transfer processed successfully'
    };
  }

  // Handle failed transfer
  async handleFailedTransfer(data) {
    // Implement transfer failure logic
    return {
      success: true,
      message: 'Failed transfer processed'
    };
  }

  // Get payment settings from database
  async getPaymentSettings() {
    try {
      const settings = await Settings.findAll({
        where: {
          category: 'paystack'
        }
      });

      const paymentSettings = {};
      settings.forEach(setting => {
        paymentSettings[setting.key] = setting.value;
      });

      return paymentSettings;
    } catch (error) {
      console.error('Error fetching payment settings:', error);
      return {};
    }
  }

  // Update payment settings
  async updatePaymentSettings(settings) {
    try {
      for (const [key, value] of Object.entries(settings)) {
        await Settings.upsert({
          key,
          value: JSON.stringify(value),
          category: 'paystack',
          description: `Paystack ${key} setting`
        });
      }

      return {
        success: true,
        message: 'Payment settings updated successfully'
      };
    } catch (error) {
      console.error('Error updating payment settings:', error);
      return {
        success: false,
        error: 'Failed to update payment settings'
      };
    }
  }
}

export default new PaystackService(); 