using homework3_19.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using homework3_19Data;

namespace homework3_19.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress; Initial Catalog=MyFirstDatabase;Integrated Security=True;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(p);
            return Json(p);
        }
        [HttpPost]
        public IActionResult DeletePerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(id);
            return Json(id);
        }

        public IActionResult GetPerson(int id)
        {
            var repo = new PeopleRepository (_connectionString);
            Person person = repo.GetPerson(id);
            return Json(person);
        }

        [HttpPost]
        public IActionResult EditPerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(p);
            return Json(repo);
        }


    }
}