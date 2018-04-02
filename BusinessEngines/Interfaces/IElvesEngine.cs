using System;
using Santa.Common.BusinessObjects;

namespace BusinessEngines.Interfaces
{
    public interface IElvesEngine
    {
        bool CreateElf(ElfBO elf);
        bool EditElf(ElfBO elf);
        bool DeleteElf(Guid id);
        ElfBO[] GetAllElves();
        ElfBO[] SearchWithFilters(string search);
    }
}