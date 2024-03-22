using ClientHolidayApi.Models;

namespace ClientHolidayApi.Interfaces
{
    public interface IHolidaysApiService
    {
        Task<List<HolidayModel>> GetHolidays(string countryCode, int year);
    }
}
