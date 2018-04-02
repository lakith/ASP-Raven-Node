using System;
using Santa.Common.Enums;

namespace Santa.Common.BusinessObjects
{
    public class ElfBO
    {
        public Guid  Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public int Naughtiness { get; set; }
        public IntelligenceEnum Intelligence { get; set; }
        public string Specialty { get; set; }
    }
}