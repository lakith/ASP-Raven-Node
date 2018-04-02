using System;
using System.Collections.Generic;
using System.Linq;
using BusinessEngines.Interfaces;
using RavenAccessor.Interfaces;
using Santa.Common.BusinessObjects;
using Santa.Common.Enums;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Raven.Abstractions.Util;
using Raven.Client;
using Raven.Client.Connection;
using Raven.Client.Indexes;
using Raven.Client.Linq;
using RavenAccessor.RavenBo;
using RavenAccessor.RavenHelper;

namespace BusinessEngines.Implementation
{
    public class ElvesEngine:IElvesEngine
    {
        private readonly IRavanStore _ravanStore;
        public ElvesEngine(IRavanStore ravanStore)
        {
            _ravanStore = ravanStore;
        }
        public bool CreateElf(ElfBO elf)
        {
            using (var dac =_ravanStore.CreateConnection().OpenSession())
            {
                var elfobject= AutoMapper.Mapper.Map<ElfBO, Elves>(elf);
                dac.Store(elfobject);
                dac.SaveChanges();
                return true;
            }
        }
        public bool EditElf(ElfBO elf)
        {
            var elfobject= AutoMapper.Mapper.Map<ElfBO, Elves>(elf);
            using (var dac =_ravanStore.CreateConnection().OpenSession())
            {
                dac.Store(elfobject);
                dac.SaveChanges();
                return true;
            }
        }
        public bool DeleteElf(Guid id)
        {
            using (var dac =_ravanStore.CreateConnection().OpenSession())
            {
                var elf = dac.Load<Elves>(id);
                if (elf != null)
                {
                    dac.Delete<Elves>(elf);
                    dac.SaveChanges();
                    return true;
                }
                return false;
            }
        }
        public ElfBO[] GetAllElves()
        {
            using (var dac =_ravanStore.CreateConnection().OpenSession())
            {
                var current = dac.Query<Elves>().ToList();
                var elfobject= AutoMapper.Mapper.Map<Elves[],ElfBO[]>(current.ToArray());
                return elfobject;
            }
        }
        public ElfBO[] SearchWithFilters(string search)
        {
            
            /*
            I tried to Do multiple term search creatring AbstractIndexCreationTask in  RavenAccessor.RavenHelper
            public class ElvesSearch and did not work out as time restriction i went for folloeing method
            var results =
              dac.Query<SearchByQuery.QueryModel,SearchByQuery>()
              .Where(o => o.Query == search)
              .OfType<Elves>(); Thid id not the most effeciant way*/
            
            using (var dac =_ravanStore.CreateConnection().OpenSession())
            {
                try
                {
                    int number;
                    var valon= int.TryParse(search, out number);
                    var value = valon ? number : 0;
                    var results = dac.Query<Elves>()
                        .Where(d=>d.Name.StartsWith(RavenQuery.Escape(search)) || d.Age.In(value) || d.Naughtiness.In(value) || d.Specialty.In(RavenQuery.Escape(search)))
                        .ToList();
                    var elfobject= AutoMapper.Mapper.Map<Elves[],ElfBO[]>(results.ToArray());
                    return elfobject;
                }
                catch (Exception exception)
                {
                   throw exception;
                }
                
            }
        }
    }
    
    

}