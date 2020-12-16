﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Processes
{
    public class MalfunctionProcess {
        private readonly MaintenanceDatabaseContext _context;

        public MalfunctionProcess(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // выбор всех неисправностей
        public List<MalfunctionViewData> GetMalfunctionsData() =>
            _context.Malfunctions.Include(m => m.Details).Select(m => new MalfunctionViewData(m, m.Details.ToList()))
                .ToList();

        // выбор конкретной неисправности
        public MalfunctionViewData GetMalfunctionData(int id) {
            Malfunction malfunction = _context.Malfunctions.Include(m => m.Details).FirstOrDefault(m => m.Id == id);
            if(malfunction == null) throw new Exception("Данная неисправность не была найдена");
            return new MalfunctionViewData(malfunction, malfunction.Details.ToList());
        }

        // добавление неисправности
        public async void AppendMalfunction(MalfunctionViewData malfunctionViewData) {
            // поиск неисправности. если мы находим неисправность, то ругаемся что данная неисправность уже существует
            Malfunction malfunction =
                _context.Malfunctions.FirstOrDefault(m => String.Equals(m.Title, malfunctionViewData.Title, StringComparison.CurrentCultureIgnoreCase));
            if(malfunction != null) throw new Exception("Данная неисправность уже существует. Добавить еще одну такую же невозможно");

            // создаем неисправность
            malfunction = new Malfunction{TimeToFix = malfunctionViewData.TimeToFix, Title = malfunctionViewData.Title, Details = new List<Detail>()};

            // создание и добавление (в случае надобности) новой детали
            for (int i = 0; i < malfunctionViewData.Details.Count; i++) {
                // поиск детали по наименованию
                Detail detail = _context.Details.FirstOrDefault(d => d.Title == malfunctionViewData.Details[i].Title);
                // если мы не находим такую деталь, то мы добавляем ее
                if (detail == null) {
                    _context.Details.Add(malfunctionViewData.Details[i]);
                    await _context.SaveChangesAsync();
                }

                // после добавления детали при необходимости, добавляем деталь к неисправности
                malfunction.Details.Add(detail);
            }

            // добавляем неисправность
            _context.Malfunctions.Add(malfunction);
            await _context.SaveChangesAsync();
        }

        // проверка на существование неисправности для обработки для заявки на ремонт
        public async Task<bool> isSetMalfunction(string title) => await _context.Malfunctions.AnyAsync(m => m.Title == title);
    }
}