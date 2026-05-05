import { UploadedDocument, ValidationResult, ValidationIssue, CustomerPolicy } from './types';

export function validateDocuments(
  documents: UploadedDocument[],
  policy: CustomerPolicy
): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (const doc of documents) {
    const applicableRules = policy.rules.filter((r) => r.documentType === doc.type);
    const issues: ValidationIssue[] = [];

    for (const rule of applicableRules) {
      const fieldValue = doc.content.fields[rule.field] ?? '';

      switch (rule.condition) {
        case 'present':
          if (!fieldValue || fieldValue.trim() === '') {
            issues.push({
              field: rule.field,
              expected: 'Field must be present and non-empty',
              actual: fieldValue || '(empty)',
              severity: 'error',
              rule: rule.description,
            });
          }
          break;

        case 'matches':
          if (fieldValue !== rule.expectedValue) {
            issues.push({
              field: rule.field,
              expected: rule.expectedValue || '',
              actual: fieldValue || '(empty)',
              severity: 'error',
              rule: rule.description,
            });
          }
          break;

        case 'format':
          if (rule.expectedValue && !new RegExp(rule.expectedValue).test(fieldValue)) {
            issues.push({
              field: rule.field,
              expected: `Must match pattern: ${rule.expectedValue}`,
              actual: fieldValue || '(empty)',
              severity: 'warning',
              rule: rule.description,
            });
          }
          break;

        case 'cross_reference':
          if (rule.referenceDocument && rule.referenceField) {
            const refDoc = documents.find((d) => d.type === rule.referenceDocument);
            if (refDoc) {
              const refValue = refDoc.content.fields[rule.referenceField!] ?? '';
              if (fieldValue !== refValue && fieldValue && refValue) {
                issues.push({
                  field: rule.field,
                  expected: `Must match ${rule.referenceDocument}.${rule.referenceField}: "${refValue}"`,
                  actual: fieldValue,
                  severity: 'error',
                  rule: rule.description,
                });
              }
            }
          }
          break;
      }
    }

    const status = issues.some((i) => i.severity === 'error')
      ? 'fail'
      : issues.some((i) => i.severity === 'warning')
      ? 'warning'
      : 'pass';

    results.push({
      documentId: doc.id,
      documentName: doc.name,
      documentType: doc.type,
      shipbillRef: doc.shipbillRef || '',
      issues,
      status,
    });
  }

  return results;
}
