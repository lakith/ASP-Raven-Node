using System;
using BusinessEngines.Interfaces;
using BusinessManager.Interfaces;
using Santa.Common.BusinessObjects;
using Santa.Common.ExceptionFactory;
using Santa.Common.Resources;
namespace BusinessManager.Implementation
 {
     public class ElvesManager:IElvesManager
     {
         
         private readonly IElvesEngine _elvesEngine;
         public ElvesManager(IElvesEngine elvesEngine)
         {
             _elvesEngine = elvesEngine;
         }
         public bool CreateElf(ElfBO elf)
         {
             if (string.IsNullOrEmpty(elf.Name))
             {
                 throw ValidationExceptionFactory.Create(ServerMessages.Error_NameNotProvided, nameof(elf.Name));
             }
             return _elvesEngine.CreateElf(elf);
         }
         public bool EditElf(ElfBO elf)
         {
             if (string.IsNullOrEmpty(elf.Name))
             {
                 throw ValidationExceptionFactory.Create(ServerMessages.Error_NameNotProvided, nameof(elf.Name));
             }
             if (elf.Id==Guid.Empty)
             {
                 throw ValidationExceptionFactory.Create(ServerMessages.Error_IdNotProvided, nameof(elf.Name));
             }
             return _elvesEngine.EditElf(elf);
         }
         public bool DeleteElf(Guid id)
         {
             if (id==Guid.Empty)
             {
                 throw ValidationExceptionFactory.Create(ServerMessages.Error_IdNotProvided, nameof(id));
             }
             return _elvesEngine.DeleteElf(id);
         }
         public ElfBO[] GetAllElves()
         {
             return _elvesEngine.GetAllElves();
         }
         public ElfBO[] SearchWithFilters(string search)
         {
             if (string.IsNullOrEmpty(search))
             {
                 throw ValidationExceptionFactory.Create(ServerMessages.Error_SearchStringProvided, nameof(search));
             }
             return _elvesEngine.SearchWithFilters(search);
         }
     }
 }