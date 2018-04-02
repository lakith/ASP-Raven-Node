using System.Web.Mvc;
using Microsoft.Practices.Unity;
using System.Configuration;
using BusinessEngines.Implementation;
using BusinessEngines.Interfaces;
using BusinessManager.Implementation;
using BusinessManager.Interfaces;
using RavenAccessor.Implementation;
using RavenAccessor.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.Practices.Unity.Mvc;
using UnityDependencyResolver = Unity.Mvc5.UnityDependencyResolver;

namespace  Santa
{
    public  class UnityConfig
    {
        private static UnityContainer _container;
        public static void InitializeUnityContainer()
        {
            var ravenUrl = ConfigurationManager.AppSettings["RavanUrl"];
            var container = RegisterComponents(ravenUrl);
            
            GlobalConfiguration.Configuration.DependencyResolver = new SantaWebApiUnityDependencyResolver(container);
            
            var resolver = new SantaMVCUnityDependencyResolver(container);
            FilterProviders.Providers.Remove(FilterProviders.Providers.OfType<FilterAttributeFilterProvider>().First());
            FilterProviders.Providers.Add(new UnityFilterAttributeFilterProvider(container));
            DependencyResolver.SetResolver(resolver.GetService, resolver.GetServices);
            
        }
        public static IUnityContainer Container { get { return _container; } }
        
        public static IUnityContainer RegisterComponents(string ravenUrl)
        {
			 _container = new UnityContainer();
             IRavanStore raven = new RavanStore(ravenUrl);
             _container.RegisterInstance<IRavanStore>(raven);
             _container.RegisterType<IElvesEngine, ElvesEngine>();
             _container.RegisterType<IElvesManager, ElvesManager>();
            return _container;
        }
    }
    public class SantaMVCUnityDependencyResolver : UnityDependencyResolver
    {
        private readonly IUnityContainer _container;
        
        public SantaMVCUnityDependencyResolver(IUnityContainer container)
            : base(container)
        {
            _container = container;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return base.GetService(serviceType);
            }
            catch (Exception exception)
            {
               
                throw exception;
            }
        }
        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return base.GetServices(serviceType);
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }
    }
    
    public class SantaWebApiUnityDependencyResolver : Unity.WebApi.UnityDependencyResolver
    {
        
        public SantaWebApiUnityDependencyResolver(IUnityContainer container)
            : base(container)
        {
        }
        public object GetService(Type serviceType)
        {
           try
            {
                return base.GetService(serviceType);
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }
        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return base.GetServices(serviceType);
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }
    }
}