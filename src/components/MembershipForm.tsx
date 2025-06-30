
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { getRegions, getDistricts } from "@/data/regions";
import { CheckCircle, Upload } from "lucide-react";

interface MembershipFormProps {
  membershipType: string;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const MembershipForm = ({ membershipType, onSubmit, isSubmitting }: MembershipFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [selectedRegion, setSelectedRegion] = useState("");
  const [districts, setDistricts] = useState<Array<{value: string, label: string}>>([]);

  const regions = getRegions();

  useEffect(() => {
    if (selectedRegion) {
      const districtOptions = getDistricts(selectedRegion);
      setDistricts(districtOptions);
      // Clear selected district when region changes
      setFormData(prev => ({ ...prev, district: "" }));
    }
  }, [selectedRegion]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTotalSteps = () => {
    switch (membershipType) {
      case 'institutional': return 4;
      case 'teacher': return 3;
      case 'parent': return 3;
      case 'proprietor': return 3;
      case 'service-provider': return 3;
      case 'non-teaching': return 3;
      default: return 3;
    }
  };

  const renderPersonalInformation = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
      
      <div className="grid md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Select onValueChange={(value) => updateFormData('title', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
              <SelectItem value="ms">Ms.</SelectItem>
              <SelectItem value="dr">Dr.</SelectItem>
              <SelectItem value="prof">Prof.</SelectItem>
              <SelectItem value="rev">Rev.</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input 
            id="firstName" 
            placeholder="Enter first name" 
            required 
            onChange={(e) => updateFormData('firstName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input 
            id="middleName" 
            placeholder="Enter middle name"
            onChange={(e) => updateFormData('middleName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="surname">Surname *</Label>
          <Input 
            id="surname" 
            placeholder="Enter surname" 
            required 
            onChange={(e) => updateFormData('surname', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input 
            id="dateOfBirth" 
            type="date" 
            required 
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <Input 
            id="placeOfBirth" 
            placeholder="Enter place of birth"
            onChange={(e) => updateFormData('placeOfBirth', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="homeTown">Home Town</Label>
          <Input 
            id="homeTown" 
            placeholder="Enter home town"
            onChange={(e) => updateFormData('homeTown', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select onValueChange={(value) => updateFormData('maritalStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spouseName">Name of Spouse</Label>
          <Input 
            id="spouseName" 
            placeholder="Enter spouse name"
            onChange={(e) => updateFormData('spouseName', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfChildren">Number of Children</Label>
          <Input 
            id="numberOfChildren" 
            type="number" 
            placeholder="0"
            onChange={(e) => updateFormData('numberOfChildren', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input 
            id="nationality" 
            placeholder="Enter nationality" 
            defaultValue="Ghanaian"
            onChange={(e) => updateFormData('nationality', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <Select required onValueChange={(value) => {
            setSelectedRegion(value);
            updateFormData('region', value);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="district">District *</Label>
          <Select 
            disabled={!selectedRegion} 
            required 
            onValueChange={(value) => updateFormData('district', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={selectedRegion ? "Select district" : "Select region first"} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district.value} value={district.value}>
                  {district.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="residentialAddress">Residential Address *</Label>
        <Textarea 
          id="residentialAddress" 
          placeholder="Enter your full residential address" 
          required 
          onChange={(e) => updateFormData('residentialAddress', e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+233 XX XXX XXXX" 
            required 
            onChange={(e) => updateFormData('phone', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email address" 
            required 
            onChange={(e) => updateFormData('email', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderInstitutionalDetails = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Institutional Information</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="institutionName">Name of Institution *</Label>
          <Input 
            id="institutionName" 
            placeholder="Enter institution name" 
            required 
            onChange={(e) => updateFormData('institutionName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="institutionLocation">Location *</Label>
          <Input 
            id="institutionLocation" 
            placeholder="Enter institution location" 
            required 
            onChange={(e) => updateFormData('institutionLocation', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rgdNumber">Registration (RGD) Number</Label>
          <Input 
            id="rgdNumber" 
            placeholder="Enter RGD number"
            onChange={(e) => updateFormData('rgdNumber', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateEstablished">Date of Establishment</Label>
          <Input 
            id="dateEstablished" 
            type="date"
            onChange={(e) => updateFormData('dateEstablished', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessType">Type of Business (Education Type) *</Label>
        <Select required onValueChange={(value) => updateFormData('businessType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select education type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="preschool">Preschool/Nursery</SelectItem>
            <SelectItem value="primary">Primary School</SelectItem>
            <SelectItem value="jhs">Junior High School</SelectItem>
            <SelectItem value="shs">Senior High School</SelectItem>
            <SelectItem value="mixed">Mixed Levels</SelectItem>
            <SelectItem value="tertiary">Tertiary Institution</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="visionStatement">Vision Statement</Label>
          <Textarea 
            id="visionStatement" 
            placeholder="Enter your institution's vision"
            onChange={(e) => updateFormData('visionStatement', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="missionStatement">Mission Statement</Label>
          <Textarea 
            id="missionStatement" 
            placeholder="Enter your institution's mission"
            onChange={(e) => updateFormData('missionStatement', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photograph">Institution Photograph</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <Input 
            id="photograph" 
            type="file" 
            accept="image/*" 
            className="hidden"
            onChange={(e) => updateFormData('photograph', e.target.files?.[0])}
          />
        </div>
      </div>
    </div>
  );

  const renderEnrollmentBreakdown = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Enrollment & Staff Breakdown</h3>
      
      <div className="space-y-4">
        <h4 className="font-medium">Student Enrollment by Level</h4>
        
        {['Preschool', 'Primary', 'JHS', 'SHS', 'Tertiary'].map((level) => (
          <div key={level} className="grid grid-cols-4 gap-4 items-center">
            <Label className="font-medium">{level}</Label>
            <div className="space-y-1">
              <Label htmlFor={`${level.toLowerCase()}-boys`} className="text-xs">Boys</Label>
              <Input 
                id={`${level.toLowerCase()}-boys`}
                type="number" 
                placeholder="0"
                onChange={(e) => updateFormData(`${level.toLowerCase()}Boys`, e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${level.toLowerCase()}-girls`} className="text-xs">Girls</Label>
              <Input 
                id={`${level.toLowerCase()}-girls`}
                type="number" 
                placeholder="0"
                onChange={(e) => updateFormData(`${level.toLowerCase()}Girls`, e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${level.toLowerCase()}-total`} className="text-xs">Total</Label>
              <Input 
                id={`${level.toLowerCase()}-total`}
                type="number" 
                placeholder="0"
                onChange={(e) => updateFormData(`${level.toLowerCase()}Total`, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="teachingStaff">Number of Teaching Staff</Label>
          <Input 
            id="teachingStaff" 
            type="number" 
            placeholder="0"
            onChange={(e) => updateFormData('teachingStaff', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nonTeachingStaff">Number of Non-Teaching Staff</Label>
          <Input 
            id="nonTeachingStaff" 
            type="number" 
            placeholder="0"
            onChange={(e) => updateFormData('nonTeachingStaff', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderContactsAndAgreement = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Institution Contacts & Agreement</h3>
      
      <div className="space-y-4">
        <h4 className="font-medium">Associate Directors</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="headmasterName">Headmaster Name</Label>
            <Input 
              id="headmasterName" 
              placeholder="Enter headmaster name"
              onChange={(e) => updateFormData('headmasterName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="headmasterContact">Headmaster Contact</Label>
            <Input 
              id="headmasterContact" 
              placeholder="Phone number"
              onChange={(e) => updateFormData('headmasterContact', e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="assistantHead">Assistant Head</Label>
            <Input 
              id="assistantHead" 
              placeholder="Enter assistant head name"
              onChange={(e) => updateFormData('assistantHead', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ptaChair">PTA Chair</Label>
            <Input 
              id="ptaChair" 
              placeholder="Enter PTA chair name"
              onChange={(e) => updateFormData('ptaChair', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-warm-cream rounded-lg">
        <h4 className="font-semibold mb-2">Terms and Conditions</h4>
        <p className="text-sm text-muted-foreground mb-4">
          By submitting this application, I agree to:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Abide by GNACOPS constitution and regulations</li>
          <li>Pay membership dues as determined by the council</li>
          <li>Participate actively in council activities</li>
          <li>Provide accurate and truthful information</li>
          <li>Support the advancement of private education in Ghana</li>
        </ul>
      </div>

      <div className="space-y-3">
        <label className="flex items-start space-x-3">
          <Checkbox required />
          <span className="text-sm">
            I certify that all information provided is true and accurate to the best of my knowledge.
          </span>
        </label>
        
        <label className="flex items-start space-x-3">
          <Checkbox required />
          <span className="text-sm">
            I agree to the GNACOPS terms and conditions and privacy policy.
          </span>
        </label>
        
        <label className="flex items-start space-x-3">
          <Checkbox />
          <span className="text-sm">
            I would like to receive updates and communications from GNACOPS.
          </span>
        </label>
      </div>
    </div>
  );

  const renderTeacherForm = () => {
    if (currentStep === 1) return renderPersonalInformation();
    
    if (currentStep === 2) return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentSchool">Current School Name *</Label>
            <Input 
              id="currentSchool" 
              placeholder="Enter school name" 
              required 
              onChange={(e) => updateFormData('currentSchool', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subjectLevel">Subject/Grade Level *</Label>
            <Input 
              id="subjectLevel" 
              placeholder="e.g., Mathematics, Primary 3" 
              required 
              onChange={(e) => updateFormData('subjectLevel', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolAddress">School Address</Label>
          <Textarea 
            id="schoolAddress" 
            placeholder="Enter school address"
            onChange={(e) => updateFormData('schoolAddress', e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="qualification">Highest Academic Qualification *</Label>
            <Select required onValueChange={(value) => updateFormData('qualification', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diploma">Diploma in Education</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Teaching Experience *</Label>
            <Input 
              id="experience" 
              type="number" 
              placeholder="0" 
              required 
              onChange={(e) => updateFormData('experience', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="certifications">Professional Certifications</Label>
          <Textarea 
            id="certifications" 
            placeholder="List any professional certifications"
            onChange={(e) => updateFormData('certifications', e.target.value)}
          />
        </div>
      </div>
    );

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Interest in GNACOPS & Agreement</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whyJoin">Why do you want to join GNACOPS? *</Label>
            <Textarea 
              id="whyJoin" 
              placeholder="Explain your motivation..." 
              required 
              onChange={(e) => updateFormData('whyJoin', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contribution">How will you contribute? *</Label>
            <Textarea 
              id="contribution" 
              placeholder="Describe how you plan to contribute..." 
              required 
              onChange={(e) => updateFormData('contribution', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="developmentPrograms">Are you in any professional development programs?</Label>
            <Select onValueChange={(value) => updateFormData('developmentPrograms', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.developmentPrograms === 'yes' && (
            <div className="space-y-2">
              <Label htmlFor="programDetails">Please specify the programs</Label>
              <Textarea 
                id="programDetails" 
                placeholder="Describe the programs..."
                onChange={(e) => updateFormData('programDetails', e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="p-4 bg-warm-cream rounded-lg">
          <h4 className="font-semibold mb-2">Agreement</h4>
          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <Checkbox required />
              <span className="text-sm">
                I agree to GNACOPS policies and constitution.
              </span>
            </label>
            
            <label className="flex items-start space-x-3">
              <Checkbox required />
              <span className="text-sm">
                I certify that all information provided is accurate.
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (membershipType) {
      case 'institutional':
        if (currentStep === 1) return renderPersonalInformation();
        if (currentStep === 2) return renderInstitutionalDetails();
        if (currentStep === 3) return renderEnrollmentBreakdown();
        return renderContactsAndAgreement();
      
      case 'teacher':
        return renderTeacherForm();
      
      // Add other membership types with their specific forms here
      default:
        return renderPersonalInformation();
    }
  };

  const handleNext = () => {
    if (currentStep < getTotalSteps()) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / getTotalSteps()) * 100;

  return (
    <Card className="gradient-card border-2 border-ghana-gold/20">
      <CardHeader>
        <CardTitle>Membership Registration Form</CardTitle>
        <CardDescription>
          Step {currentStep} of {getTotalSteps()} - Please fill in all required fields
        </CardDescription>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
          {renderStepContent()}
          
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            
            <Button 
              type="submit" 
              className="ml-auto bg-ghana-gold hover:bg-ghana-gold/90 text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : currentStep === getTotalSteps() ? (
                <>
                  Submit Application
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Next Step"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MembershipForm;
