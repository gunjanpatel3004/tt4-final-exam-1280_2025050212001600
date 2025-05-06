using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAttendanceAPI.Data;
using StudentAttendanceAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class AttendanceController : ControllerBase
{
    private readonly AttendanceDbContext _context;

    public AttendanceController(AttendanceDbContext context) => _context = context;

    // GET: api/attendance
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentAttendance>>> GetAttendances() => 
        await _context.Attendances.ToListAsync();

    // POST: api/attendance
    [HttpPost]
    public async Task<ActionResult<StudentAttendance>> PostAttendance(StudentAttendance attendance)
    {
        _context.Attendances.Add(attendance);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAttendances), new { id = attendance.ID }, attendance);
    }

    // PUT: api/attendance/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAttendance(int id, StudentAttendance attendance)
    {
        if (id != attendance.ID) return BadRequest();
        _context.Entry(attendance).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/attendance/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAttendance(int id)
    {
        var attendance = await _context.Attendances.FindAsync(id);
        if (attendance == null) return NotFound();
        _context.Attendances.Remove(attendance);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}