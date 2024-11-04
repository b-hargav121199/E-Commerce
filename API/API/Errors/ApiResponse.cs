using System;

namespace API.Errors
{
    public class ApiResponse(int statuscode, string message=null)
    {
        public int StatusCode { get; set; }=statuscode;
        public string Message { get; set; } = message ?? GetDefaultMessageForStatuscode(statuscode);
        private static string GetDefaultMessageForStatuscode(int statuscode)
        {
            return statuscode switch
            {
                400 => "A bad request, you have made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Error leads to enger. Anger leads to head. Hate leads to career change.",
                _ => null
            };
        }
    }
}
