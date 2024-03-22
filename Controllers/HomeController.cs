using ClientHolidayApi.Interfaces;
using ClientHolidayApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ClientHolidayApi.Controllers
{
    public class HomeController : Controller
    {
 
        private readonly IHolidaysApiService _holidaysApiService;

        public HomeController(IHolidaysApiService holidaysApiService)
        {
            _holidaysApiService = holidaysApiService; 
        }

        public async Task<IActionResult> Index(string countryCode = "US", int year = 0)
        {
   
            List<HolidayModel> holidays = new List<HolidayModel>();
            InputsModel inpts = new InputsModel();
            inpts.CountryCode = countryCode;
            inpts.Year = year;
            ViewData["Country"] = inpts.CountryCode;
            ViewData["Year"] = inpts.Year;
            holidays = await _holidaysApiService.GetHolidays(inpts.CountryCode, inpts.Year);
           
            return View(holidays);
        }

        public IActionResult Privacy()
        {
            return View();
        }


    }
}
