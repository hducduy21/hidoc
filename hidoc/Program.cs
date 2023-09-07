using hidoc.Middleware;
using hidoc.Model;
using hidoc.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddCors(p => p.AddPolicy("cors", build =>
//{
//    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
//}));
// Add services to the container.
//Scaffold-DbContext "Data Source=DESKTOP-VIT0CG8\SQLEXPRESS;Initial Catalog=hidoctor;Integrated Security=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Model -f

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<hidoctorContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("HiDoc"), options => options.CommandTimeout(120)));
builder.Services.AddCors(options => options.AddDefaultPolicy(polycy => polycy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.Name = ".AdventureWorks.Session";
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.IsEssential = true;
});
builder.Services.AddScoped<IHospitalRepo, HospitalRepo>();
var secretkey = Encoding.UTF8.GetBytes("HiDoctorAPIweb52000650");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(secretkey),

        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();
app.UseCors();
//if (args.Length==1 && args[0].ToLower() == "seeddata")
//{
//    SeedData(app);
//}

//void SeedData(IHost app)
//{
//    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
//    using (var scope = scopedFactory.CreateScope())
//    {
//        var s = scope.ServiceProvider.GetService<DbInitializer>();
//        s.Seed();
//    }
//}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseFileServer(new FileServerOptions
{
    FileProvider = new  PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),"static")),
    RequestPath = "/static",
});
app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();
app.UseJwtMiddleware();
app.UseSession();
app.MapControllers();

app.Run();
