using AutoMapper;
using Santa.Common.BusinessObjects;
using Santa.Models;

namespace Santa.Mappers
 {
     public static partial class AutoMapperConfiguration
     {
         internal class VmBoProfile : Profile
         {
             public VmBoProfile()
             {
                 CreateMap<ElfBO, ElfVm>();
                 CreateMap<ElfVm, ElfBO>();
             }
         }
     }
 }