using System.Globalization;

namespace GoogleSheetsAPI.EndPoint
{
    public static class Endpoints
    {
        public static void UseCustomEndpoints(this WebApplication app)
        {
            app.MapGet("/KWRANKING", async () => await GetDataAsync());
            app.MapGet("/SALESRANKING/{month}", async (string month) => await GetSalesDataByMonthAsync(month));
            app.MapGet("/DETAILEDSALES/{month}", async (string month) => await GetMonthlySalesDataAsync(month));
        }

        private static async Task<IResult> GetDataAsync()
        {
            var filePath = "csvFiles/kwresearchstest2.csv";
            var csvData = await ReadCsvFileAsync(filePath);

            if (csvData.Length < 7)
            {
                return Results.BadRequest("CSV file does not contain enough data.");
            }

            var selectedRows = ExtractKWSelectedRows(csvData);
            return Results.Json(selectedRows);
        }

        private static async Task<IResult> GetSalesDataByMonthAsync(string monthInput)
        {
            var normalizedMonth = monthInput.Trim().ToLower();

            var monthMapping = new Dictionary<string, string>
            {
                { "jan", "January" },
                { "january", "January" },
                { "feb", "February" },
                { "february", "February" },
                { "mar", "March" },
                { "march", "March" },
                { "apr", "April" },
                { "april", "April" },
                { "may", "May" },
                { "jun", "June" },
                { "june", "June" },
                { "jul", "July" },
                { "july", "July" },
                { "aug", "August" },
                { "august", "August" },
                { "sep", "September" },
                { "sept", "September" },
                { "september", "September" },
                { "oct", "October" },
                { "october", "October" },
                { "nov", "November" },
                { "november", "November" },
                { "dec", "December" },
                { "december", "December" }
            };

            if (!monthMapping.TryGetValue(normalizedMonth, out var fullMonthName))
            {
                return Results.BadRequest("Invalid month provided.");
            }

            var filePath = fullMonthName switch
            {
                "January" => "csvFiles/MonthlySales/SalesByProducts_2024_Jan.csv",
                "February" => "csvFiles/MonthlySales/SalesByProducts_2024_Feb.csv",
                "March" => "csvFiles/MonthlySales/SalesByProducts_2024_Mar.csv",
                "April" => "csvFiles/MonthlySales/SalesByProducts_2024_Apr.csv",
                "May" => "csvFiles/MonthlySales/SalesByProducts_2024_May.csv",
                "June" => "csvFiles/MonthlySales/SalesByProducts_2024_Jun.csv",
                "July" => "csvFiles/MonthlySales/SalesByProducts_2024_Jul.csv",
                "August" => "csvFiles/MonthlySales/SalesByProducts_2024_Aug.csv",
                "September" => "csvFiles/MonthlySales/SalesByProducts_2024_Sept.csv",
                "October" => "csvFiles/MonthlySales/SalesByProducts_2024_Oct.csv",
                "November" => "csvFiles/MonthlySales/SalesByProducts_2024_Nov.csv",
                "December" => "csvFiles/MonthlySales/SalesByProducts_2024_Dec.csv",
                _ => null
            };

            if (filePath == null)
            {
                return Results.BadRequest("Invalid month provided.");
            }

            var csvData = await ReadCsvFileAsync(filePath);

            if (csvData.Length < 7)
            {
                return Results.BadRequest("CSV file does not contain enough data.");
            }

            var selectedRows = ExtractSalesSelectedRows(csvData);
            return Results.Json(selectedRows);
        }

        private static async Task<string[]> ReadCsvFileAsync(string filePath)
        {
            return await File.ReadAllLinesAsync(filePath);
        }

        private static object ExtractKWSelectedRows(string[] csvData)
        {
            return csvData
                .Skip(3)
                .Take(5)
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

        private static object ExtractSalesSelectedRows(string[] csvData)
        {
            var totalRow = csvData
                .Select(row => row.Split(';'))
                .FirstOrDefault(columns => columns.Length > 5 && columns[0].Replace("\"", "").Trim().Equals("Totals", StringComparison.OrdinalIgnoreCase));

            if (totalRow == null)
            {
                return new { error = "Total row not found in the CSV file." };
            }

            if (totalRow.Length < 9)
            {
                return new { error = "Insufficient columns in the total row." };
            }

            return new
            {
                TotalSales = totalRow[5].Replace("\"", "").Trim(),
                TotalProducts = totalRow[6].Replace("\"", "").Trim(),
                //TotalNetProfit = totalRow[7].Replace("\"", "").Trim(),    HÖGST OKLAR BETYDELSE??!?!??!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!
                TotalRefunds = totalRow[8].Replace("\"", "").Trim(),
                Budget = totalRow[14].Replace("\"", "").Trim()
            };
        }

        private static async Task<IResult> GetMonthlySalesDataAsync(string monthInput)
        {
            // Normalisera inmatningen (ta bort mellanslag och gör små bokstäver)
            var normalizedMonth = monthInput.Trim().ToLower();

            // Skapa en dictionary för att matcha månadsnamn och nummer till dess siffra
            var monthMapping = new Dictionary<string, int>
    {
        { "1", 1 }, { "january", 1 }, { "jan", 1 },
        { "2", 2 }, { "february", 2 }, { "feb", 2 },
        { "3", 3 }, { "march", 3 }, { "mar", 3 },
        { "4", 4 }, { "april", 4 }, { "apr", 4 },
        { "5", 5 }, { "may", 5 },
        { "6", 6 }, { "june", 6 }, { "jun", 6 },
        { "7", 7 }, { "july", 7 }, { "jul", 7 },
        { "8", 8 }, { "august", 8 }, { "aug", 8 },
        { "9", 9 }, { "september", 9 }, { "sep", 9 },
        { "10", 10 }, { "october", 10 }, { "oct", 10 },
        { "11", 11 }, { "november", 11 }, { "nov", 11 },
        { "12", 12 }, { "december", 12 }, { "dec", 12 }
    };

            // Validera inmatningen
            if (!monthMapping.TryGetValue(normalizedMonth, out var monthNumber))
            {
                return Results.BadRequest("Invalid month provided.");
            }

            var filePath = "csvFiles/DashboardTotalsMonthly.csv";
            var csvData = await ReadCsvFileAsync(filePath);

            if (csvData.Length < 2)
            {
                return Results.BadRequest("CSV file does not contain enough data.");
            }

            var selectedData = ExtractMonthlySalesData(csvData, monthNumber);
            return Results.Json(selectedData);
        }
        private static object ExtractMonthlySalesData(string[] csvData, int monthNumber)
        {
            var salesData = csvData
                .Skip(1) // Skippa header-raden
                .Select(row => row.Split(';')) // Använd semikolon som avgränsare
                .Where(columns =>
                {
                    // Ta bort citattecken runt datumen och parsar dem
                    var dateFromString = columns[0].Trim('"');
                    var dateToString = columns[1].Trim('"');

                    // Specificera formatet baserat på hur datumen ser ut i CSV-filen
                    string dateFormat = "d/MM/yyyy";
                    if (DateTime.TryParseExact(dateFromString, dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateFrom) &&
                        DateTime.TryParseExact(dateToString, dateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateTo))
                    {
                        // Skriver ut information om datumintervall
                        Console.WriteLine($"DateFrom: {dateFrom}, DateTo: {dateTo}, MonthNumber: {monthNumber}");

                        // Kontrollera om angiven månad ligger inom datointervallet
                        var isWithinRange = dateFrom.Month <= monthNumber && dateTo.Month >= monthNumber;
                        Console.WriteLine($"Row matches month: {isWithinRange}");

                        return isWithinRange;
                    }
                    else
                    {
                        Console.WriteLine("Date parsing failed for row.");
                    }
                    return false;
                })
                .Select((columns, index) => new
                {
                    //RowNumber = index + 2, // För att matcha radnumret korrekt (CSV-data börjar på rad 2)
                    DateFrom = columns[0].Trim('"'),
                    DateTo = columns[1].Trim('"'),
                    OrganicSales = columns[2].Trim('"'),
                    SponsoredSales = columns[3].Trim('"'),
                    Orders = columns[10].Trim('"')
                })
                .ToList();

            if (!salesData.Any())
            {
                return new { error = "No data found for the specified month." };
            }

            return salesData;
        }
    }
}
