# ClientHolidayApi

Shows holidays by country code. Uses a third-party API to retrieve holidays by country code.

I followed a tutorial from ezzylearning.net website article titled "How to Consume Third-party Web APIs in ASP.NET Core"
link: https://www.ezzylearning.net/tutorial/how-to-consume-third-party-web-apis-in-asp-net-core#google_vignette

prompts consist of country code and year and then click submit button.
if invalid input application will show "Not Found"
if valid input but records do not exist application will show "No Content" else application will display the following columns Date, Holiday Name, Local Name, Country Code, Global.
