using System;
using System.Linq;
using Raven.Abstractions.Indexing;
using Raven.Client.Indexes;
using RavenAccessor.RavenBo;
using Santa.Common.Enums;

namespace RavenAccessor.RavenHelper
{
    public class ElvesSearch
    {
        public Guid  Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public int Naughtiness { get; set; }
        public int Intelligence { get; set; }
        public string Specialty { get; set; }
        public string Keyword { get; set; } 
    }
    public class ElvesByKeyword : AbstractIndexCreationTask<ElvesSearch>
    {
        public ElvesByKeyword()
        {
            Map = elves => from elf in elves
                select new
                {
                    Keyword  = new string[] {elf.Name, elf.Specialty,elf.Age.ToString(),elf.Intelligence.ToString(),elf.Naughtiness.ToString()}
                };
            Index(x => x.Keyword , FieldIndexing.Analyzed);
        }
    }
    
    public class SearchByQuery :
        AbstractIndexCreationTask<Elves, SearchByQuery.QueryModel>
    {
        public class QueryModel
        {
            public string Query;
        }
        public SearchByQuery()
        {
            Map = elves =>
                from elf in elves
                select new
                {
                    Query = new object[]
                    {
                        elf.Name,
                        elf.Age,
                    }
                };
        }
    }
    
    public class SearchFilters : AbstractIndexCreationTask<Elves>
    {
        public SearchFilters()
        {
            Map = ideas => from idea in ideas
                select new
                {
                    idea.Name,
                    idea.Age
                };
        }
    }
}