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
    public class WorkerViewDataController : ControllerBase
    {
        private readonly WorkerProcess _workerProcess;

        public WorkerViewDataController(MaintenanceDatabaseContext context) {
            _workerProcess = new WorkerProcess(context);
        }

        // GET: api/WorkerViewData
        [HttpGet("{page}")]
        public IEnumerable<WorkerViewData> GetWorkers(int page) => _workerProcess.GetWorkersData(page);

        [HttpGet]
        public object GetInfoTable() => Utils.GetInfoPage(_workerProcess.GetTableCount());

        [HttpGet]
        public IEnumerable<string> GetWorkersForSelect() => _workerProcess.GetWorkersForSelect();

        // GET: api/WorkerViewData/5
        [HttpGet("{id}")]
        public WorkerViewData GetWorker(int id) => _workerProcess.GetWorkerData(id);

        // POST: api/WorkerViewData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task PostWorker(WorkerViewData worker) =>
            await _workerProcess.AppendWorker(worker);

        // DELETE: api/WorkerViewData/5
        [HttpDelete("{id}")]
        public async Task DeleteWorker(int id) =>
            await _workerProcess.SafeRemoveWorker(id);
    }
}
