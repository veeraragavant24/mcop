
using Microsoft.EntityFrameworkCore;
using MadhaPhysiotherapy.Api.Models;

namespace MadhaPhysiotherapy.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    public DbSet<NewsEvent> NewsEvents => Set<NewsEvent>();
}
