using ClientHolidayApi.Models;
using System.Linq.Expressions;
using System.Text.Json;

namespace ClientHolidayApi.Interfaces
{
    public class HolidayApiService : IHolidaysApiService
    {
        private readonly HttpClient client;

        public HolidayApiService(IHttpClientFactory clientFactory)
        {
            client = clientFactory.CreateClient("PublicHolidaysApi");
        }

        //static HolidayApiService()
        //{
        //    client = new HttpClient()
        //    {
        //        BaseAddress = new Uri("https://date.nager.at")
        //    };
        //}

        public async Task<List<HolidayModel>> GetHolidays(string countryCode, int year)
        {
            var url = string.Format("/api/v2/PublicHolidays/{0}/{1}", year, countryCode);
            var result = new List<HolidayModel>();
            var response = await client.GetAsync(url);
            try
            {
                if (response.IsSuccessStatusCode)
                {
                    var stringResponse = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        result = JsonSerializer.Deserialize<List<HolidayModel>>(stringResponse, new JsonSerializerOptions()
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                        });
                    }
                    else if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
                    {
                        getErrorResult(result, response.ReasonPhrase!);
                    }
                }
                else
                {
                    throw new HttpRequestException(response.ReasonPhrase);
                }
            }
            catch(HttpRequestException ex)
            {
                getErrorResult(result!, ex.Message);
            }
            return result!;
        }

        public List<HolidayModel> getErrorResult(List<HolidayModel> result, string message)
        {
            var hm = new HolidayModel();
            hm.Name = message;
            hm.Date = DateTime.Today;
            result!.Add(hm);
            return result!;
        }
    }
}
