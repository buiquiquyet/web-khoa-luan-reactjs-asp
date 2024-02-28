using cuoikiAsp.Models;
using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;
using System.ComponentModel;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);
var MyAllowOrigins = "AllowAll";
    // Configure CORS
builder.Services.AddCors(options =>
{
    /*options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());*/
    options.AddPolicy(MyAllowOrigins,
        builder => builder.WithOrigins("http://localhost:3000")
                      .AllowAnyHeader()
                      .AllowAnyMethod());
                     
});
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<databaseContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;

    });
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 1000000000; // Giới hạn kích thước tệp đính kèm lên (1GB)
});

builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = 1000000000; // Giới hạn kích thước request body (1GB)
});


builder.Services.AddScoped<IUserRespositores, UserRespositores>();
builder.Services.AddScoped<IClassRespositories, ClassRespositories>();
builder.Services.AddScoped<IDeparmentRespotories, DeparmentRespotories>();
builder.Services.AddScoped<ISpecializedRespositories, SpecializedRespositories>();
builder.Services.AddScoped<ISchoolYearRespositories, SchoolYearRespositories>();
builder.Services.AddScoped<IForumRespositories, ForumRespositories>();
builder.Services.AddScoped<ICommentRespositories, CommentRespositories>();
builder.Services.AddScoped<IEvaluateRespositories, EvaluateRespositories>();
builder.Services.AddScoped<IProjectListRespositories, ProjectListRespositores>();
builder.Services.AddScoped<ICommentFeedBackRespositories, CommentFeedBackRespositories>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Apply CORS policy
app.UseCors(MyAllowOrigins);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "images")),
    RequestPath = "/StaticImages"
});


app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "files")),
    RequestPath = "/StaticFiles"
});
app.UseHttpsRedirection();
app.UseAuthorization();



app.MapControllers();


app.Run();
