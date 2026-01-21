import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calculator, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalculationResult {
  productValue: number;
  shippingCost: number;
  insuranceCost: number;
  cifValue: number;
  estimatedDutyRate: number;
  estimatedDuty: number;
  vatAmount: number;
  totalCost: number;
  hsCodeEstimate: string;
  productCategory: string;
  notes: string;
}

const countries = [
  { value: "CN", label: "China" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "TW", label: "Taiwan" },
  { value: "IN", label: "India" },
  { value: "TR", label: "Turkey" },
  { value: "IL", label: "Israel" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "OTHER_EU", label: "Other EU Country" },
  { value: "OTHER", label: "Other Country" },
];

const DutyCalculator = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  const [formData, setFormData] = useState({
    productDescription: "",
    productValue: "",
    shippingCost: "",
    insuranceCost: "",
    countryOfOrigin: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acknowledged) {
      toast({
        title: "Acknowledgment Required",
        description: "Please acknowledge that this is an estimate only before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.productDescription || !formData.productValue || !formData.countryOfOrigin) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/calculate-duty`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            productDescription: formData.productDescription,
            productValue: parseFloat(formData.productValue),
            shippingCost: parseFloat(formData.shippingCost) || 0,
            insuranceCost: parseFloat(formData.insuranceCost) || 0,
            countryOfOrigin: formData.countryOfOrigin,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to calculate duties");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation Error",
        description: error instanceof Error ? error.message : "Failed to calculate duties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/services/customs-clearing" className="text-white/70 hover:text-white text-sm">
              ← Back to Customs Clearing
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            Cyprus Duty & VAT Calculator
          </h1>
          <p className="text-white/90 text-lg">AI-Powered Import Duty Estimation Tool</p>
        </div>
      </div>

      <div className="container-shoham py-12">
        {/* TOP DISCLAIMER - CRITICAL */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-heading font-bold text-xl text-amber-800 mb-2">
                Important Legal Notice
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                This calculator provides <strong>ESTIMATES ONLY</strong> for informational purposes. 
                The results are <strong>NOT legally binding</strong> and should <strong>NOT</strong> be 
                relied upon for official customs declarations or financial planning. Actual duties and 
                taxes may vary significantly based on current regulations, exact product classification, 
                customs officer assessment, and other factors. <strong>Shoham Group Ltd accepts no 
                responsibility</strong> for any discrepancies between these estimates and actual charges. 
                For accurate duty calculations, please contact our customs team directly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-accent" />
                  Calculate Import Duties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">
                      Product Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Describe the product you're importing (e.g., 'iPhone 15 Pro Max smartphone', 'Cotton t-shirts for men', 'Industrial machinery for food processing')"
                      value={formData.productDescription}
                      onChange={(e) => handleInputChange("productDescription", e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Be as specific as possible for more accurate estimates
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productValue">
                        Product Value (EUR) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="productValue"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 1200"
                        value={formData.productValue}
                        onChange={(e) => handleInputChange("productValue", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingCost">Shipping Cost (EUR)</Label>
                      <Input
                        id="shippingCost"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 50"
                        value={formData.shippingCost}
                        onChange={(e) => handleInputChange("shippingCost", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceCost">Insurance Cost (EUR)</Label>
                      <Input
                        id="insuranceCost"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 10"
                        value={formData.insuranceCost}
                        onChange={(e) => handleInputChange("insuranceCost", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countryOfOrigin">
                        Country of Origin <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.countryOfOrigin}
                        onValueChange={(value) => handleInputChange("countryOfOrigin", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Acknowledgment Checkbox - CRITICAL */}
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="acknowledge"
                        checked={acknowledged}
                        onCheckedChange={(checked) => setAcknowledged(checked === true)}
                        className="mt-1"
                      />
                      <Label htmlFor="acknowledge" className="text-sm leading-relaxed cursor-pointer">
                        I understand and acknowledge that this calculator provides <strong>estimates only</strong>, 
                        the results are <strong>not legally binding</strong>, and I should not rely on them 
                        for official customs declarations. I will contact Shoham for an official quote if needed.
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-shoham-orange-dark"
                    disabled={isLoading || !acknowledged}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate Duties
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div>
            {result ? (
              <Card className="border-2 border-accent/30">
                <CardHeader className="bg-accent/10">
                  <CardTitle className="flex items-center justify-between">
                    <span>Estimated Import Costs</span>
                    <span className="text-xs font-normal bg-amber-500 text-white px-2 py-1 rounded">
                      ESTIMATE ONLY
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Category Info */}
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Product Category</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.productCategory}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Estimated HS Code: {result.hsCodeEstimate}
                      </p>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Product Value:</span>
                        <span>€{result.productValue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping Cost:</span>
                        <span>€{result.shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Insurance Cost:</span>
                        <span>€{result.insuranceCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium border-t pt-2">
                        <span>CIF Value:</span>
                        <span>€{result.cifValue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Import Duty ({result.estimatedDutyRate}%):
                        </span>
                        <span>€{result.estimatedDuty.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">VAT (19%):</span>
                        <span>€{result.vatAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-3 text-accent">
                        <span>ESTIMATED TOTAL:</span>
                        <span>€{result.totalCost.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {result.notes && (
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mt-4">
                        <p className="text-sm text-blue-800">{result.notes}</p>
                      </div>
                    )}

                    {/* Result Disclaimer */}
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                      <p className="text-xs text-amber-700">
                        <strong>⚠️ Reminder:</strong> This is an ESTIMATE only. Actual duties may differ 
                        based on exact product classification, current regulations, and customs assessment.
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 space-y-3">
                      <Button asChild className="w-full bg-accent hover:bg-shoham-orange-dark">
                        <Link to="/contact-us">Get Official Quote from Our Team</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/quote">Request Detailed Quote</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Calculator className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Enter Product Details
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Fill in the form to get an estimated calculation of import duties and VAT 
                    for bringing goods into Cyprus.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Full Disclaimer */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Full Legal Disclaimer</h3>
          <div className="bg-muted p-6 rounded-lg text-sm text-muted-foreground space-y-4">
            <p>
              <strong>Purpose:</strong> This duty calculator is provided as a free informational tool 
              to help users get a general understanding of potential import costs when bringing goods 
              into Cyprus. It uses AI technology to estimate product classifications and applicable 
              duty rates.
            </p>
            <p>
              <strong>No Guarantee:</strong> The calculations provided are estimates only and are 
              NOT guaranteed to be accurate. Actual duties, taxes, and fees may vary significantly 
              based on: the exact HS code classification determined by customs authorities, current 
              duty rates which may change, preferential trade agreements, anti-dumping duties, 
              product-specific regulations, and the assessment of customs officers.
            </p>
            <p>
              <strong>No Liability:</strong> Shoham Group Ltd, its directors, employees, and affiliates 
              accept NO responsibility or liability whatsoever for any loss, damage, cost, or expense 
              (whether direct, indirect, or consequential) arising from the use of or reliance on 
              this calculator or its results.
            </p>
            <p>
              <strong>Professional Advice:</strong> For accurate customs duty calculations and 
              professional customs clearance services, please contact our customs department directly. 
              We strongly recommend obtaining an official quote before making any financial decisions 
              based on import costs.
            </p>
            <p>
              <strong>Data Usage:</strong> Product descriptions entered into this calculator may be 
              processed by AI systems for the purpose of providing estimates. No personal data is 
              stored or shared.
            </p>
          </div>
        </div>

        {/* Other Customs Services */}
        <div className="mt-8 pt-8 border-t">
          <h3 className="font-heading font-semibold text-lg mb-4">Other Customs Services</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/services/customs-clearing/eori-registration-cyprus"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              EORI Registration Cyprus
            </Link>
            <Link
              to="/services/customs-clearing/form-1002"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Customs Authority Form 1002
            </Link>
            <Link
              to="/services/customs-clearing/transfer-of-residence"
              className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Transfer of Residence
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DutyCalculator;
