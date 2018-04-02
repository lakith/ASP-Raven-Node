using System;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace Santa.Common.ExceptionFactory
{
    [Serializable]
    public class ValidationResultsException : System.Exception
    {
        public ValidationResults Results { get; private set; }

        public ValidationType ValidationType { get; private set; }

        public ValidationResultsException(ValidationResults results, ValidationType validationType = ValidationType.Exception)
            : base("Validation Error")
        {
            Results = results;
            ValidationType = validationType;
        }

        public ValidationResultsException(string message, string property, ValidationType validationType = ValidationType.Exception)
            : base("Validation Error")
        {
            Results = new ValidationResults();
            Results.AddResult(new ValidationResult(message, "", property, "", null));
            ValidationType = validationType;
        }
    }
    
    [Serializable]
    public class NotFoundException : System.Exception
    {
        public ValidationResults Results { get; private set; }

        public ValidationType ValidationType { get; private set; }

        public NotFoundException(ValidationResults results, ValidationType validationType = ValidationType.Exception)
            : base("Validation Error")
        {
            Results = results;
            ValidationType = validationType;
        }

        public NotFoundException(string message, string property, ValidationType validationType = ValidationType.Exception)
            : base("Validation Error")
        {
            Results = new ValidationResults();
            Results.AddResult(new ValidationResult(message, "", property, "", null));
            ValidationType = validationType;
        }
    }
    public enum ValidationType
    {
        Exception = 2,
        Warning = 4
    }
}