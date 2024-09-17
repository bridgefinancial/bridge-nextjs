import { FieldType } from "@/types/forms.enum";
import { FormidableForm } from "@/types/forms.types";

export const CHIROPRACTOR_VALUATION_FORM_DEFINITION: FormidableForm = {
  id: 8,
  created_at: "2024-09-14T11:21:59.524282-06:00",
  updated_at: "2024-09-15T23:11:04.635250-06:00",
  name: "Chiropractic Valuation",
  slug: "chiropractic-valuation",
  review: false,
  definition: {
    id: 8,
    name: "Chiropractic Valuation",
    pages: [
      {
        name: "location",
        fields: [
          {
            id: 123,
            min: 0,
            name: "years_in_operation",
            type: FieldType.PositiveInteger,
            label: "How long has your business been operating?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
            placeholder: "Years in operation",
          },
          {
            id: 134,
            enum: [
              { label: "Rent", value: "rent", textbox: false, placeholder: "" },
              { label: "Own", value: "own", textbox: false, placeholder: "" },
              {
                label: "I have none",
                value: "none",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "real_estate_ownership_type",
            type: FieldType.Radio,
            label: "Do you rent or own your business property?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 135,
            name: "annual_rent",
            type: FieldType.USD,
            label: "What is the current annual rent?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "rent",
                operator: "equal",
                dependant_on: {
                  name: "real_estate_ownership_type",
                  page_name: "location",
                },
              },
            ],
          },
          {
            id: 136,
            name: "real_estate_value",
            type: FieldType.USD,
            label: "What is the appraised or estimated value of the property?",
            order: 3,
            hidden: false,
            add_more: false,
            not_sure: true,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "own",
                operator: "equal",
                dependant_on: {
                  name: "real_estate_ownership_type",
                  page_name: "location",
                },
              },
            ],
          },
          {
            id: 137,
            name: "inventory_and_equipment_value",
            type: FieldType.USD,
            label:
              "What is the appraised or estimated value of the equipment and inventory that you own?",
            order: 4,
            hidden: false,
            add_more: false,
            not_sure: true,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 138,
            name: "other_investments",
            type: FieldType.YesNo,
            label: "Do you own any other investments related to the business?",
            order: 5,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 139,
            name: "other_investments_value",
            type: FieldType.USD,
            label: "What is the current value of these investments?",
            order: 6,
            hidden: false,
            add_more: false,
            not_sure: true,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: {
                  name: "other_investments",
                  page_name: "location",
                },
              },
            ],
          },
        ],
        header: "Location & Operations",
      },
      {
        name: "financial",
        fields: [
          {
            id: 124,
            name: "annual_revenue",
            type: FieldType.USD,
            label:
              "What was your business's gross revenue for the most recent year? An estimate is fine.",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 140,
            name: "knows_ebitda",
            type: FieldType.YesNo,
            label:
              "Do you know your Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 141,
            name: "ebitda",
            type: FieldType.USD,
            label: "What was your EBITDA for the most recent year?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: { name: "knows_ebitda", page_name: "financial" },
              },
            ],
          },
          {
            id: 142,
            name: "net_profit",
            type: FieldType.USD,
            label:
              "What was your net profit for the most recent year? An estimate is fine.",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Financial Information",
      },
      {
        name: "debt",
        fields: [
          {
            id: 143,
            name: "total_debt",
            type: FieldType.USD,
            label:
              "What is the total amount of debt and loan obligations your business currently holds? An estimate is fine.",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 144,
            name: "has_other_debts",
            type: FieldType.YesNo,
            label:
              "Are there any other financial obligations or liabilities that could affect your business’s valuation? (e.g., outstanding taxes, pending lawsuits)",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 145,
            name: "other_debts_description",
            type: FieldType.LongText,
            label: "Could you describe your financial obligations?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: { name: "has_other_debts", page_name: "debt" },
              },
            ],
          },
        ],
        header: "Debt & Obligations",
      },
    ],
    review: false,
  },
};

export const VALUATION_FORM_DEFINITION: FormidableForm = {
  id: 7,
  created_at: "2024-08-12T11:54:20.415132-06:00",
  updated_at: "2024-08-12T12:13:51.696793-06:00",
  name: "Valuation Estimate",
  slug: "valuation-estimate",
  review: false,
  definition: {
    id: 7,
    name: "Valuation Estimate",
    pages: [
      {
        name: "business_information",
        fields: [
          {
            id: 67,
            min: 1000,
            name: "annual_revenue",
            type: FieldType.USD,
            label:
              "What is your estimated yearly revenue? (Estimate to the nearest $1,000)",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Business Info",
      },
      {
        name: "intent_to_sell",
        fields: [
          {
            id: 121,
            enum: [
              {
                label: "0-6 months",
                value: "next_6_months",
                textbox: false,
                placeholder: "",
              },
              {
                label: "6-12 months",
                value: "6_to_12_months",
                textbox: false,
                placeholder: "",
              },
              {
                label: "1-3 years",
                value: "1_to_3_years",
                textbox: false,
                placeholder: "",
              },
              {
                label: "3+ years",
                value: "more_than_3_years",
                textbox: false,
                placeholder: "",
              },
              {
                label: "I don't want to sell, I just want my valuation.",
                value: "not_selling",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "business_sale_timeline",
            type: FieldType.Radio,
            label: "When do you hope to sell your business?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 122,
            enum: [
              {
                label: "Planning for retirement",
                value: "retire",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Found a new opportunity",
                value: "new_opportunity",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Consolidating my assets",
                value: "consolidating_assets",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Transferring ownership to a trusted employee/partner",
                value: "transferring_ownership",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Looking for a profitable exit",
                value: "profitable_exit",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "business_sale_reason",
            type: FieldType.Radio,
            label: "Why do you want to sell your business?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
        ],
        header: "Business Sale",
      },
    ],
    review: false,
  },
};

export const RECOMMENDATION_FORM_DEFINITION: FormidableForm = {
  id: 3,
  created_at: "2024-07-27T22:51:09.478783-06:00",
  updated_at: "2024-08-12T16:43:16.522528-06:00",
  name: "Onboarding Survey",
  slug: "onboarding-survey",
  review: false,
  definition: {
    id: 3,
    name: "Onboarding Survey",
    pages: [
      {
        name: "product_market_fit",
        fields: [
          {
            id: 68,
            max: 100,
            min: 0,
            name: "customer_affinity_percentage",
            type: FieldType.PositiveInteger,
            label:
              "What percentage of your customers would be *very disappointed* if you were to close your business?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 69,
            max: 100,
            min: 0,
            name: "yearly_retention_rate",

            type: FieldType.PositiveInteger,
            label:
              "What % of your customers continue purchasing your product or service for more than a year?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Product-Market Fit",
      },
      {
        name: "position_clarity",
        fields: [
          {
            id: 70,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "position_clarity_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 71,
                name: "understands_customer",

                type: FieldType.Radio,
                label:
                  "I have a clear understanding of my ideal customer profile, including their values, needs, and pain points?",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 72,
                name: "understands_landscape",

                type: FieldType.Radio,
                label:
                  "I have a clear understanding of the unique value my product or service offers to customers and how my products and services are differentiated from my competitors.",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 73,
                name: "good_positioning",

                type: FieldType.Radio,
                label:
                  "My customers have a clear understanding of the unique value of my products or services.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 74,
                name: "systematic_pricing",

                type: FieldType.Radio,
                label:
                  "My company used a systematic approach to determining pricing.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Position Clarity",
      },
      {
        name: "pricing_and_bundling",
        fields: [
          {
            id: 75,
            min: 0,
            name: "average_ticket_price",

            type: FieldType.PositiveInteger,
            label: "What is your average ticket price? (It's OK to estimate)",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 76,
            name: "offers_payment_plans",

            type: FieldType.YesNo,
            label: "Do you offer customers any form of payment plans?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Pricing & Bundling",
      },
      {
        name: "online_presence",
        fields: [
          {
            id: 77,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "has_website",

            type: FieldType.Radio,
            label: "Do you have a website?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 78,
            name: "web_address",

            type: FieldType.URL,
            label: "What is your web address?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: {
                  name: "has_website",
                  page_name: "online_presence",
                },
              },
            ],
          },
          {
            id: 79,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "has_blog",

            type: FieldType.Radio,
            label: "Does your company have a blog?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 80,
            name: "blog_address",

            type: FieldType.URL,
            label: "What is your blog web address?",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            conditions: [
              {
                value: "yes",
                operator: "equal",
                dependant_on: {
                  name: "has_blog",
                  page_name: "online_presence",
                },
              },
            ],
          },
        ],
        header: "Online Presence",
      },
      {
        name: "digital_strategy",
        fields: [
          {
            id: 81,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "digital_strategy_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 82,
                name: "website_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company website is effective at generating leads for my business.",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 83,
                name: "blog_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company blog does a good job of raising brand awareness and generating leads.",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 84,
                name: "social_media_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of raising brand awareness and generating leads through social media.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 85,
                name: "review_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of requesting online reviews from happy customers.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 86,
                name: "review_responsiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job monitoring and replying to online reviews.",
                order: 4,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 87,
                name: "digital_ad_effectiveness",

                type: FieldType.Radio,
                label: "My company has an effective digital ad strategy.",
                order: 5,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 88,
                name: "email_marketing_effectiveness",

                type: FieldType.Radio,
                label: "My company runs effective email marketing campaigns.",
                order: 6,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 89,
                name: "affiliate_marketing_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company has an effective affilite marketing program for generating online leads and sales.",
                order: 7,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Digital Strategy",
      },
      {
        name: "leads_management",
        fields: [
          {
            id: 90,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "leads_management_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 91,
                name: "partnership_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company makes good use of partnerships, distributors, and other sales channels to generate leads and sales.",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 120,
                name: "traditional_marketing_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job using traditional marketing strategies such as community events, trade shows, sponsorships, promotions, coupons, traditional advertising (print, radio, billboards, etc), direct mail, and cold calling to raise awareness of company products and services.",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 92,
                name: "lead_tracking_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of saving contact info and other applicable details for new leads.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 93,
                name: "lead_prioritization_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of prioritizing high-quality / high-fit leads.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 94,
                name: "sales_conversion_effectiveness",

                type: FieldType.Radio,
                label:
                  "My company does a good job of converting leads into new sales.",
                order: 4,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Leads Management",
      },
      {
        name: "business_systems",
        fields: [
          {
            id: 95,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "business_systems_likert",

            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 96,
                name: "customized_comms",

                type: FieldType.Radio,
                label:
                  "My company's interactions and communication with prospective customers is customized based on their preferences, behavior, and past interactions.",
                order: 0,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 97,
                name: "consistent_delivery",

                type: FieldType.Radio,
                label:
                  "My company does a good job of ensuring that the promised value and benefits of my products and services are delivered across all customer touch points (physical space, the front desk, the solution delivery, and followups).",
                order: 1,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 98,
                name: "meets_commitments",

                type: FieldType.Radio,
                label:
                  "My company consistently meets our commitments to our customers.",
                order: 2,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 99,
                name: "commitment_tracking",

                type: FieldType.Radio,
                label:
                  "My company has good, effective systems in place to track and fulfill our promises to our customers.",
                order: 3,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 100,
                name: "spend_management",

                type: FieldType.Radio,
                label: "My company does a good job managing our spending.",
                order: 4,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 101,
                name: "cash_reserve_adequacy",

                type: FieldType.Radio,
                label:
                  "My company does a good job maintaing adequate cash reserves.",
                order: 5,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
              {
                id: 102,
                name: "good_collections",

                type: FieldType.Radio,
                label:
                  "My company does a good job ensuring that we are paid for products and services delivered.",
                order: 6,
                hidden: false,

                add_more: false,
                disabled: false,
                readonly: false,
                required: false,
              },
            ],
          },
        ],
        header: "Business Systems",
      },
      {
        name: "employee_efficiency",
        fields: [
          {
            id: 104,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "uses_productivity_software",

            type: FieldType.Radio,
            label:
              "Does your company use software to track and improve employee productivity?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 105,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "uses_bi_software",

            type: FieldType.Radio,
            label:
              "My business uses systems to gain insights business and customer data (Business Intellegence Software).",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
          {
            id: 106,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "fraud_prevention",

            type: FieldType.Radio,
            label:
              "Does your company have good processes and/or software in place to prevent fraud and ensure security?",
            order: 2,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 117,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "manage_expenditures",

            type: FieldType.Radio,
            label:
              "My business does a good job at managing and categorizing expenditures",
            order: 3,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 103,
            name: "num_employees",

            type: FieldType.PositiveInteger,
            label:
              "About how many employees do you have? (It is OK to estimate)",
            order: 4,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: true,
          },
        ],
        header: "Employee Efficiency",
      },
      {
        name: "process_and_training",
        fields: [
          {
            id: 107,
            enum: [
              {
                label: "Yes",
                value: "yes",
                textbox: false,
                placeholder: "",
              },
              {
                label: "No",
                value: "no",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "has_org_chart",
            type: FieldType.Radio,
            label: "Does your company have an up-to-date org chart?",
            order: 0,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
          },
          {
            id: 108,
            enum: [
              {
                label: "Strongly Disagree",
                value: "strongly_disagree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Disagree",
                value: "disagree",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Unsure",
                value: "unsure",
                textbox: false,
                placeholder: "",
              },

              {
                label: "Agree",
                value: "agree",
                textbox: false,
                placeholder: "",
              },
              {
                label: "Strongly Agree",
                value: "strongly_agree",
                textbox: false,
                placeholder: "",
              },
            ],
            name: "process_likert",
            type: FieldType.Likert,
            label:
              "How strongly do you agree or disagree with the following statements?",
            order: 1,
            hidden: false,
            add_more: false,
            disabled: false,
            readonly: false,
            required: false,
            internal_fields: [
              {
                id: 110,
                name: "processes_and_procedures",
                type: FieldType.Radio,
                label:
                  "My company's processes and procedures are standardized and well documented, and we do a good job of keeping that documentation up-to-date.",
                order: 0,
                hidden: false,
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 109,
                name: "emps_understand_roles",
                type: FieldType.Radio,
                label:
                  "Everyone at my company clearly understands their roles and responsibilities.",
                order: 1,
                hidden: false,
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
              {
                id: 111,
                name: "adequate_training",
                type: FieldType.Radio,
                label:
                  "My company is effective at ensuring that staff follows standards and procedures.",
                order: 2,
                hidden: false,
                add_more: false,
                disabled: false,
                readonly: false,
                required: true,
              },
            ],
          },
        ],
        header: "Process & Training",
      },
    ],
    review: false,
  },
};

export const RECOMMENDATIONS_FORM_ID = RECOMMENDATION_FORM_DEFINITION.id;
export const VALUATION_FORM_ID = VALUATION_FORM_DEFINITION.id;
export const ONBOARDING_FORM_IDS = [VALUATION_FORM_ID, RECOMMENDATIONS_FORM_ID];
