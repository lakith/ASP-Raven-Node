using System;
using Santa.Common.BusinessObjects;

namespace BusinessManager.Interfaces
{
    public interface IElvesManager
    {
        bool CreateElf(ElfBO elf);
        bool EditElf(ElfBO elf);
        bool DeleteElf(Guid id);
        ElfBO[] GetAllElves();
        ElfBO[] SearchWithFilters(string search);

    }
}