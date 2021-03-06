﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Utils
{
    public static class Utils {
        // расчет пределов передачи данных для определенной страницы данных
        public static (int from, int to) GetDataRange(int page, int collectionCount) =>
            (page * 10 - 10, page * 10 > collectionCount ? collectionCount : page * 10);

        public static object GetInfoPage(int count) => new {
            count,
            maxPages = (count / 10) + (count % 10 >= 1 ? 1 : 0)
        };
}
}
