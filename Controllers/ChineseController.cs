using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Alenny.SweetHome.Protocols.Chinese;
using Alenny.SweetHome.Protocols;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;

namespace Alenny.SweetHome.Controllers
{
    [Route("api/[controller]")]
    public class ChineseController : ControllerBase
    {
        private static readonly string _folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/chinese-characters");

        public ChineseController()
        {
            if (!Directory.Exists(_folder))
            {
                Directory.CreateDirectory(_folder);
            }
        }

        [HttpGet]
        public Task<ActionResult<GetCharactersResponse>> Get()
        {
            var files = Directory.GetFiles(_folder);
            var charsBuilder = new StringBuilder();
            foreach (var fn in files)
            {
                charsBuilder.Append(Path.GetFileNameWithoutExtension(fn));
            }
            return Task.FromResult<ActionResult<GetCharactersResponse>>(
                Ok(new GetCharactersResponse { Characters = charsBuilder.ToString() }));
        }

        [HttpPost]
        public Task<ActionResult> Post(
            [FromHeader(Name = "Authorization")] string auth,
            [FromBody] AddCharactersRequest req)
        {
            if (!VerifyUser(auth))
            {
                return Task.FromResult<ActionResult>(Unauthorized());
            }
            if (string.IsNullOrWhiteSpace(req.Characters) || req.Characters.Length > 10)
            {
                return Task.FromResult<ActionResult>(BadRequest(new ErrorResponse { ErrorMessage = "Please specify 1 to 10 characters" }));
            }
            foreach (var ch in req.Characters)
            {
                AddCharacter(ch);
            }
            return Task.FromResult<ActionResult>(Ok());
        }

        [HttpDelete]
        public Task<ActionResult> Delete(
            [FromHeader(Name = "Authorization")] string auth,
            [FromBody] DeleteCharactersRequest req)

        {
            if (!VerifyUser(auth))
            {
                return Task.FromResult<ActionResult>(Unauthorized());
            }
            if (string.IsNullOrWhiteSpace(req.Characters) || req.Characters.Length > 10)
            {
                return Task.FromResult<ActionResult>(BadRequest(new ErrorResponse { ErrorMessage = "Please specify 1 to 10 characters" }));
            }
            foreach (var ch in req.Characters)
            {
                DeleteCharacter(ch);
            }
            return Task.FromResult<ActionResult>(Ok());
        }

        private bool VerifyUser(string auth)
        {
            return auth == "Bearer lydzy";
        }

        private void AddCharacter(char ch)
        {
            var path = Path.Combine(_folder, $"{ch}.png");
            if (System.IO.File.Exists(path))
            {
                return;
            }
            var image = new Bitmap(400, 400);
            Graphics gra = Graphics.FromImage(image);
            gra.FillRectangle(Brushes.Yellow, 0, 0, 400, 400);
            gra.DrawString(ch.ToString(), new Font(FontFamily.GenericSansSerif, 160.0f), Brushes.Black, 45.0f, 80.0f);
            image.Save(path, ImageFormat.Png);
        }

        private void DeleteCharacter(char ch)
        {
            var path = Path.Combine(_folder, $"{ch}.png");
            if (!System.IO.File.Exists(path))
            {
                return;
            }
            System.IO.File.Delete(path);
        }
    }
}
