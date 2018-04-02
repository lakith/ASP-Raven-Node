using Raven.Client;
using RavenAccessor.Interfaces;

namespace RavenAccessor.Implementation
{
    public class RavanStore:IRavanStore
    {
        private readonly string _url;

        public RavanStore(string url)
        {
            _url = url;
        }
        public IDocumentStore CreateConnection()
        {
            var documentStore = new Raven.Client.Document.DocumentStore { Url =_url };
            documentStore.Initialize();
            return documentStore;
        }
        
    }
}