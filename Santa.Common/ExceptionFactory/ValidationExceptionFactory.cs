using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace Santa.Common.ExceptionFactory
{
    public static class ValidationExceptionFactory
    {
        public static ValidationResultsException Create(ValidationResults result)
        {
            return new ValidationResultsException(result);
        }
        public static ValidationResultsException Create(string validationMessage, string property = "")
        {
            return new ValidationResultsException(validationMessage, property);
        }
        public static NotFoundException CreateNotFound(string validationMessage, string property = "")
        {
            return new NotFoundException(validationMessage, property);
        }
        public static ValidationResultsException CreateWarning(string validationMessage, string property = "")
        {
            return new ValidationResultsException(validationMessage, property, ValidationType.Warning);
        }
    }
}