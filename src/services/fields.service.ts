import { FieldType } from "@/types/forms.enum";
import { FormField } from "@/types/forms.types";

export class FieldInformationService {
  static isShortText(field: FieldType | string) {
    return FieldInformationService.shortTextFieldTypes.includes(field);
  }

  static isLongText(field: FieldType | string) {
    return FieldInformationService.longFieldTypes.includes(field);
  }

  static isNumber(field: FieldType | string) {
    return FieldInformationService.numberFieldTypes.includes(field);
  }

  static isDropdown(type: FieldType | string) {
    return FieldInformationService.dropdownTypes.includes(type);
  }

  static isSearchableDropdown(type: FieldType | string) {
    return FieldInformationService.searchableDropdownTypes.includes(type);
  }

  static isRadio(type: FieldType | string) {
    return FieldInformationService.radioTypes.includes(type);
  }

  static isCheckbox(type: FieldType | string) {
    return FieldInformationService.checkboxTypes.includes(type);
  }

  static isSelection(type: FieldType | string) {
    return (
      FieldInformationService.isCheckbox(type) ||
      FieldInformationService.isRadio(type)
    );
  }

  static isComplex(field: FieldType | string) {
    return FieldInformationService.complexFieldTypes.includes(field);
  }

  static isLikert(field: FieldType | string) {
    return FieldInformationService.likertFieldTypes.includes(field);
  }

  static getDefaultSelections(field: FormField):
    | {
        value: string;
        label: string;
        placeholder?: string;
        textbox?: boolean;
      }[]
    | undefined {
    // radio
    if (FieldInformationService.isRadio(field.type)) {
      let defaultOptions = FieldInformationService.radios.find(
        (listing) => listing.name === field.type
      )?.data;
      if (!field.enum) {
        return defaultOptions ? defaultOptions : undefined;
      } else {
        return field.enum;
      }
    }
    // dropdown
    if (FieldInformationService.isDropdown(field.type)) {
      let defaultOptions = FieldInformationService.dropdowns.find(
        (listing) => listing.name === field.type
      )?.data;
      if (!field.enum) {
        return defaultOptions ? defaultOptions : undefined;
      } else {
        return field.enum;
      }
    }
    return undefined;
  }

  static getDefaultInternalFields(field: FormField): FormField[] | undefined {
    let defaultFields = FieldInformationService.complexData.find(
      (listing) => listing.name === field.type
    )?.data;
    if (!field.internal_fields) {
      return defaultFields ? defaultFields : undefined;
    } else {
      return field.internal_fields;
    }
  }

  static shortTextFieldTypes: string[] = [
    FieldType.Text,
    FieldType.Email,
    FieldType.PhoneNumber,
    FieldType.IP,
    FieldType.IPv4,
    FieldType.IPv6,
    FieldType.EIN,
    FieldType.SocialSecurity,
    FieldType.Zip,
    FieldType.URL,
    FieldType.UUID,
    FieldType.Hex,
  ];

  static numberFieldTypes: string[] = [
    FieldType.Decimal,
    FieldType.Integer,
    FieldType.PositiveInteger,
  ];
  static dropdownTypes: string[] = [
    FieldType.Dropdown,
    FieldType.USAStatesDropdown,
  ];
  static searchableDropdownTypes: string[] = [FieldType.SearchableDropdown];
  static radioTypes: string[] = [
    FieldType.Radio,
    FieldType.YesNo,
    FieldType.TrueFalse,
  ];
  static checkboxTypes: string[] = [FieldType.Checkbox];
  static complexFieldTypes: string[] = [
    FieldType.Complex,
    FieldType.Address,
    FieldType.DateRange,
  ];
  static likertFieldTypes: string[] = [FieldType.Likert];
  static longFieldTypes: string[] = [FieldType.LongText];

  static dropdowns: { name: string; data: { value: any; label: string }[] }[] =
    [
      {
        name: "usa_states_dropdown",
        data: [
          { value: "AK", label: "AK" },
          { value: "AL", label: "AL" },
          { value: "AR", label: "AR" },
          { value: "AZ", label: "AZ" },
          { value: "CA", label: "CA" },
          { value: "CO", label: "CO" },
          { value: "CT", label: "CT" },
          { value: "DE", label: "DE" },
          { value: "FL", label: "FL" },
          { value: "GA", label: "GA" },
          { value: "HI", label: "HI" },
          { value: "IA", label: "IA" },
          { value: "ID", label: "ID" },
          { value: "IL", label: "IL" },
          { value: "IN", label: "IN" },
          { value: "KS", label: "KS" },
          { value: "KY", label: "KY" },
          { value: "LA", label: "LA" },
          { value: "MA", label: "MA" },
          { value: "MD", label: "MD" },
          { value: "ME", label: "ME" },
          { value: "MI", label: "MI" },
          { value: "MN", label: "MN" },
          { value: "MO", label: "MO" },
          { value: "MS", label: "MS" },
          { value: "MT", label: "MT" },
          { value: "NC", label: "NC" },
          { value: "ND", label: "ND" },
          { value: "NE", label: "NE" },
          { value: "NH", label: "NH" },
          { value: "NJ", label: "NJ" },
          { value: "NM", label: "NM" },
          { value: "NV", label: "NV" },
          { value: "NY", label: "NY" },
          { value: "OH", label: "OH" },
          { value: "OK", label: "OK" },
          { value: "OR", label: "OR" },
          { value: "PA", label: "PA" },
          { value: "RI", label: "RI" },
          { value: "SC", label: "SC" },
          { value: "SD", label: "SD" },
          { value: "TN", label: "TN" },
          { value: "TX", label: "TX" },
          { value: "UT", label: "UT" },
          { value: "VA", label: "VA" },
          { value: "VT", label: "VT" },
          { value: "WA", label: "WA" },
          { value: "WI", label: "WI" },
          { value: "WV", label: "WV" },
          { value: "WY", label: "WY" },
        ],
      },
    ];

  static radios: Record<
    string,
    { name: string; data: { value: any; label: string }[] }
  > = {
    [FieldType.TrueFalse]: {
      name: "true_false",
      data: [
        { value: true, label: "True" },
        { value: false, label: "False" },
      ],
    },
    [FieldType.YesNo]: {
      name: "yes_no",
      data: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  };

  static complexData: { name: string; data: FormField[] }[] = [
    {
      name: "address",
      data: [
        {
          id: 1,
          label: "",
          placeholder: "Line 1",
          name: "line1",
          type: "text",
        },
        {
          id: 2,
          label: "",
          placeholder: "Line 2 (optional)",
          required: false,
          name: "line2",
          type: "text",
        },
        {
          id: 3,
          label: "",
          placeholder: "City",
          name: "city",
          type: "text",
        },
        {
          id: 4,
          label: "",
          name: "state",
          type: "usa_states_dropdown",
        },
        {
          id: 5,
          label: "",
          placeholder: "Zip Code",
          name: "zip",
          type: "zip",
        },
      ],
    },
    {
      name: "date_range",
      data: [
        {
          id: 1,
          label: "Start Date",
          name: "start",
          type: "date",
        },
        {
          id: 2,
          label: "End Date",
          name: "end",
          type: "date",
        },
      ],
    },
  ];
}