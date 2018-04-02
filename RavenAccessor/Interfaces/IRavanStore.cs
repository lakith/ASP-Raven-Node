using Raven.Client;

namespace RavenAccessor.Interfaces
{
    public interface IRavanStore
    {
        IDocumentStore CreateConnection();
    }
}