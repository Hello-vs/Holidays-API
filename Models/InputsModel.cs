using System.Globalization;

namespace ClientHolidayApi.Models
{
    public class InputsModel
    {
        private string? _CC;
        public string CountryCode
        {
            get { return _CC!; } 
            set {
               
                _CC = IsValidCountryCode(value);
            }
        }

        private int _Y; 
        public int Year { 

            get { return _Y;  }
            set
            {
                if (value <= 0)
                    _Y = DateTime.Today.Year;
                else
                    _Y = value;
            }
        
        }
        private string? IsValidCountryCode(string countryCode)
        {
            RegionInfo? regionInfo = null;

            try
            {
               regionInfo = new RegionInfo(countryCode);
                return regionInfo.TwoLetterISORegionName;
            }
            catch 
            {
                return countryCode;
            }
        }

    }
}
