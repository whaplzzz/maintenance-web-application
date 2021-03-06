﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.AspNetCore.Authorization;
using WebApplication.Data;
using WebApplication.Models.Processes;
using WebApplication.Models.Utils;
using WebApplication.Models.ViewData;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class CarViewDataController : ControllerBase
    {
        private readonly CarProcess _carProcess;

        public CarViewDataController(MaintenanceDatabaseContext context) {
            _carProcess = new CarProcess(context);
        }

        // GET: api/CarViewData
        [HttpGet("{page}")]
        public IEnumerable<CarViewData> GetCars(int page) => _carProcess.GetCarsData(page);

        [HttpGet]
        [ActionName("InfoTable")]
        public object GetInfoTable() => Utils.GetInfoPage(_carProcess.GetTableCount());

        // GET: api/CarViewData/5
        [HttpGet("{id}")]
        public CarViewData GetCar(int id) => _carProcess.GetCarData(id);

        // PUT: api/CarViewData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task PutCar(int id, CarViewData car) {
            if(id != car.Id) throw new Exception("Данного авто не существует");
            await _carProcess.ChangeCar(car);
        }

        // POST: api/CarViewData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task PostCar(CarViewData car) => await _carProcess.AppendCar(car);
    }
}
