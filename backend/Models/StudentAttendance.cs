namespace StudentAttendanceAPI.Models
{
    public class StudentAttendance
    {
        public int ID { get; set; }
        public string StudentName { get; set; }
        public DateTime Date { get; set; }
        public bool Present { get; set; }
        public string Remarks { get; set; }
    }
}