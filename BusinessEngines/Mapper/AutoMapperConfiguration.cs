using AutoMapper;
using RavenAccessor.RavenBo;
using RavenAccessor.RavenHelper;
using Santa.Common.BusinessObjects;

namespace BusinessEngines.Mapper
{
    public static partial class AutoMapperConfiguration
    {
        internal class VmBoProfile : Profile
        {
            public VmBoProfile()
            {
                CreateMap<ElfBO, Elves>();
                CreateMap<Elves, ElfBO>();
                CreateMap<ElvesSearch, ElfBO>();
            }
        }
    }
}