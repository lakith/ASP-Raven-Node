using AutoMapper;
using System.Data.Linq;
using WebGrease.Css.Extensions;

namespace Santa.Mappers
{
    public static partial class AutoMapperConfiguration
    {
        private static bool _isInitialised;
        public static Profile[] GetProfiles()
        {
            return new Profile[]
            {
                new AutoMapperConfiguration.VmBoProfile(), 
                new AutoMapperConfiguration.VmBoProfile(), 
            };
        }
        public static void Configure()
        {
            if (_isInitialised)
            {
                return;
            }
            Mapper.Initialize(cfg =>
            {
                cfg.AllowNullDestinationValues = false;
                cfg.CreateMissingTypeMaps = true;
                GetProfiles().ForEach(cfg.AddProfile);
            });

            _isInitialised = true;
        }
    }
}