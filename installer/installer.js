class InstallerWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.installationData = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.startSystemCheck();
        this.generateJWTSecret();
    }

    bindEvents() {
        // Navigation buttons
        document.getElementById('next-step1')?.addEventListener('click', () => this.nextStep());
        document.getElementById('next-step2')?.addEventListener('click', () => this.nextStep());
        document.getElementById('next-step3')?.addEventListener('click', () => this.nextStep());
        
        document.getElementById('prev-step2')?.addEventListener('click', () => this.previousStep());
        document.getElementById('prev-step3')?.addEventListener('click', () => this.previousStep());
        document.getElementById('prev-step4')?.addEventListener('click', () => this.previousStep());

        // Database test
        document.getElementById('test-db')?.addEventListener('click', () => this.testDatabase());

        // Installation
        document.getElementById('start-installation')?.addEventListener('click', () => this.startInstallation());
        document.getElementById('finish-installation')?.addEventListener('click', () => this.finishInstallation());
        document.getElementById('go-to-admin')?.addEventListener('click', () => this.goToAdmin());

        // JWT generation
        document.getElementById('generate-jwt')?.addEventListener('click', () => this.generateJWTSecret());
    }

    async startSystemCheck() {
        try {
            const response = await fetch('/api/installer/system-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.updateSystemStatus('nodejs-status', true, data.nodejs);
                this.updateSystemStatus('mysql-status', true, data.mysql);
                this.updateSystemStatus('permissions-status', true, data.permissions);
                
                if (data.nodejs && data.mysql && data.permissions) {
                    document.getElementById('next-step1').disabled = false;
                }
            } else {
                this.updateSystemStatus('nodejs-status', false, 'Check failed');
                this.updateSystemStatus('mysql-status', false, 'Check failed');
                this.updateSystemStatus('permissions-status', false, 'Check failed');
            }
        } catch (error) {
            console.error('System check failed:', error);
            this.updateSystemStatus('nodejs-status', false, 'Connection error');
            this.updateSystemStatus('mysql-status', false, 'Connection error');
            this.updateSystemStatus('permissions-status', false, 'Connection error');
        }
    }

    updateSystemStatus(elementId, success, message) {
        const element = document.getElementById(elementId);
        if (element) {
            const icon = element.querySelector('i');
            const text = element.querySelector('span');
            
            if (success) {
                icon.className = 'fas fa-check text-green-600';
                text.textContent = message;
            } else {
                icon.className = 'fas fa-times text-red-600';
                text.textContent = message;
            }
        }
    }

    async testDatabase() {
        const testButton = document.getElementById('test-db');
        const nextButton = document.getElementById('next-step2');
        
        testButton.disabled = true;
        testButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
        
        const dbConfig = {
            host: document.getElementById('db-host').value,
            port: document.getElementById('db-port').value,
            database: document.getElementById('db-name').value,
            username: document.getElementById('db-user').value,
            password: document.getElementById('db-password').value
        };

        try {
            const response = await fetch('/api/installer/test-database', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dbConfig)
            });
            
            const data = await response.json();
            
            if (data.success) {
                testButton.innerHTML = '<i class="fas fa-check"></i> Connection Successful';
                testButton.className = 'bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700';
                nextButton.disabled = false;
                this.installationData.database = dbConfig;
            } else {
                testButton.innerHTML = '<i class="fas fa-times"></i> Connection Failed';
                testButton.className = 'bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700';
                alert('Database connection failed: ' + data.error);
            }
        } catch (error) {
            console.error('Database test failed:', error);
            testButton.innerHTML = '<i class="fas fa-times"></i> Connection Failed';
            testButton.className = 'bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700';
            alert('Database connection failed: ' + error.message);
        }
        
        setTimeout(() => {
            testButton.disabled = false;
            testButton.innerHTML = 'Test Connection';
            testButton.className = 'bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700';
        }, 3000);
    }

    generateJWTSecret() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 32; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('jwt-secret').value = result;
    }

    collectConfiguration() {
        this.installationData.config = {
            appUrl: document.getElementById('app-url').value,
            adminEmail: document.getElementById('admin-email').value,
            paystackSecret: document.getElementById('paystack-secret').value,
            paystackPublic: document.getElementById('paystack-public').value,
            jwtSecret: document.getElementById('jwt-secret').value,
            environment: document.getElementById('environment').value
        };
    }

    async startInstallation() {
        this.collectConfiguration();
        
        const startButton = document.getElementById('start-installation');
        startButton.disabled = true;
        startButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Installing...';
        
        this.logMessage('Starting installation process...');
        
        try {
            const response = await fetch('/api/installer/install', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.installationData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.logMessage('Installation completed successfully!');
                this.showSuccessModal();
            } else {
                this.logMessage('Installation failed: ' + data.error);
                alert('Installation failed: ' + data.error);
            }
        } catch (error) {
            console.error('Installation failed:', error);
            this.logMessage('Installation failed: ' + error.message);
            alert('Installation failed: ' + error.message);
        }
        
        startButton.disabled = false;
        startButton.innerHTML = 'Start Installation';
    }

    logMessage(message) {
        const logElement = document.getElementById('installation-log');
        const timestamp = new Date().toLocaleTimeString();
        logElement.innerHTML += `<div>[${timestamp}] ${message}</div>`;
        logElement.scrollTop = logElement.scrollHeight;
    }

    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        const adminUrl = this.installationData.config.appUrl + '/admin';
        document.getElementById('admin-url').textContent = adminUrl;
        modal.classList.remove('hidden');
    }

    goToAdmin() {
        const adminUrl = this.installationData.config.appUrl + '/admin';
        window.location.href = adminUrl;
    }

    finishInstallation() {
        window.location.href = this.installationData.config.appUrl;
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.hideStep(this.currentStep);
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.hideStep(this.currentStep);
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
        }
    }

    showStep(step) {
        const stepContent = document.getElementById(`step${step}-content`);
        if (stepContent) {
            stepContent.classList.remove('hidden');
        }
    }

    hideStep(step) {
        const stepContent = document.getElementById(`step${step}-content`);
        if (stepContent) {
            stepContent.classList.add('hidden');
        }
    }

    updateProgress() {
        for (let i = 1; i <= this.totalSteps; i++) {
            const stepElement = document.getElementById(`step${i}`);
            if (stepElement) {
                stepElement.className = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold';
                
                if (i < this.currentStep) {
                    stepElement.classList.add('step-completed');
                } else if (i === this.currentStep) {
                    stepElement.classList.add('step-active');
                } else {
                    stepElement.classList.add('step-pending');
                }
            }
        }
    }
}

// Initialize installer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InstallerWizard();
}); 