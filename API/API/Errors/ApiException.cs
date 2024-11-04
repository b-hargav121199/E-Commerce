namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statuscode, string message = null,string details=null) : base(statuscode, message)
        {
            Deatils = details;
        }
        public string Deatils { get; set; }
    }
}
