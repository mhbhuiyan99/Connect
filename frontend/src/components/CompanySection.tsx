import React from "react";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { Company } from "@/models/Company";

type CompanySectionProps = {
  index: number;
  company: Company;
  pending: boolean;
  showExtraFields: boolean;
  toggleExtraFields: () => void;
  companySections: Company[];
  setCompanySections: React.Dispatch<React.SetStateAction<Company[]>>;
  isCurrentCompany: boolean;
  presetIndustries: string[];
  onRemove?: () => void;
  isLastCompany?: boolean;
  handleAddCompany?: () => void;
};

const CompanySection: React.FC<CompanySectionProps> = ({
  index,
  company,
  pending,
  showExtraFields,
  toggleExtraFields,
  companySections,
  setCompanySections,
  isCurrentCompany,
  presetIndustries,
  onRemove,
  isLastCompany,
  handleAddCompany,
}) => {
  const handleChange = (field: keyof typeof company, value: string) => {
    const updated = [...companySections];
    updated[index][field] = value;
    setCompanySections(updated);
  };

  return (
    <div className={`col-span-full bg-muted/10 border p-4 rounded-xl mb-6`}>
      {isCurrentCompany ? (
        <h3 className="text-base font-semibold mb-2"> {`Current Company`}</h3>
      ) : (
        <h3 className="text-base font-semibold mb-2"> {`Previous Company ${index}`}</h3>
      )}

      <div>
        <FloatingInput
          list="industry"
          type="text"
          disabled={pending}
          label="Industry"
          placeholder="Type or select an industry"
          value={company.industry}
          onChange={(e) => handleChange("industry", e.target.value)}>
          <datalist id="industry">
            {presetIndustries.map((industry, idx) => (
              <option
                key={idx}
                value={industry}
              />
            ))}
          </datalist>
        </FloatingInput>
      </div>

      {showExtraFields && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingInput
            type="text"
            disabled={pending}
            placeholder="Software (separated by comma)"
            label="Software"
            value={company.software}
            onChange={(e) => handleChange("software", e.target.value)}
          />

          <FloatingInput
            type="text"
            disabled={pending}
            placeholder="Position"
            label="Position"
            value={company.position}
            onChange={(e) => handleChange("position", e.target.value)}
          />

          <FloatingInput
            type="text"
            disabled={pending}
            placeholder="Key Responsibilities"
            label="Responsibilities"
            value={company.responsibilities}
            onChange={(e) => handleChange("responsibilities", e.target.value)}
          />

          <FloatingInput
            type="text"
            disabled={pending}
            placeholder="Platform"
            label="Platform"
            value={company.platform}
            onChange={(e) => handleChange("platform", e.target.value)}
          />
        </div>
      )}

      <div className="mt-3 flex justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={toggleExtraFields}>
          {showExtraFields ? "Hide Company Info" : "Add Company Info"}
        </Button>
        {onRemove && (
          <Button
            type="button"
            variant="destructive"
            onClick={onRemove}>
            Remove
          </Button>
        )}
        {isLastCompany && (
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCompany}>
            ➕ Add Another Company
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanySection;
