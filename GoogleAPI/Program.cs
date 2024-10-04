
namespace GoogleAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowAllOrigins");
            app.MapControllers();
            app.MapGet("/KWRANKING", GetDataAsync);
            app.Run();
        }




        private static async Task<IResult> GetDataAsync()
        {
            var filePath = "csvfiles/kwresearchstest2.csv"; // Update the path to your CSV file
            var csvData = await ReadCsvFileAsync(filePath);

            if (csvData.Length < 7)
            {
                return Results.BadRequest("CSV file does not contain enough data.");
            }

            var selectedRows = ExtractSelectedRows(csvData);
            return Results.Json(selectedRows);
        }

        private static async Task<string[]> ReadCsvFileAsync(string filePath)
        {
            return await File.ReadAllLinesAsync(filePath);
        }

        private static object ExtractSelectedRows(string[] csvData)
        {
            return csvData
                .Skip(3) // Skip the first 3 rows to start at row 4
                .Take(5) // Take 5 rows from row 7
                         //5to 10
                .Select(row => row.Split(','))
                .Select(columns => new
                {
                    KEYWORD = columns[0],
                    RANK = columns[1],
                    CVR = columns[3],
                    IMPRESSIONS = columns[4],
                    CLICKS = columns[5],
                    SPEND = columns[6],
                    TOTALSALES = columns[7]
                })
                .OrderBy(row => row.RANK);
        }
    }
}
