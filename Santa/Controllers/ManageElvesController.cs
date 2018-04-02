using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using BusinessManager.Interfaces;
using Santa.Common.BusinessObjects;
using Santa.Models;

namespace Santa.Controllers
{
    public class ManageElvesController : BaseController
    {
        private readonly IElvesManager _elvesManager;
        public ManageElvesController(IElvesManager elvesManager)
        {
            _elvesManager = elvesManager;
        }
        [HttpGet]
        [Route("api/ManageElvesApi", Name = "GetAllElvesApiRoute")]
        public HttpResponseMessage Get()
        {
            return ToJson(_elvesManager.GetAllElves());
        }
        [HttpPost]
        [Route("api/ManageElvesApi", Name = "CreateElfApiRoute")]
        public HttpResponseMessage Post(ElfVm elf)
        {
            var elfbo= Mapper.Map<ElfVm, ElfBO>(elf);
            var result = _elvesManager.CreateElf(elfbo);
            return ToJson(result);
        }
        [HttpPut]
        [Route("api/ManageElvesApi", Name = "EditElfApiRoute")]
        public HttpResponseMessage Put(ElfVm elf)
        {
            var elfbo= Mapper.Map<ElfVm, ElfBO>(elf);
            return ToJson(_elvesManager.EditElf(elfbo));
        }
        [HttpDelete]
        [Route("api/ManageElvesApi/{id}", Name = "DeleteElfApiRoute")]
        public HttpResponseMessage Delete(Guid id)
        {
            return ToJson(_elvesManager.DeleteElf(id));
        }
        [HttpGet]
        [Route("api/ManageElvesApi/Search/{search}", Name = "GetFilterSearchElvesApiRoute")]
        public HttpResponseMessage SearchWithFilters(string search)
        {
            return ToJson(_elvesManager.SearchWithFilters(search));
        }
        
    }
}
