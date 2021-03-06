﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webAPI
{
    public class House
    {
        public int _MLS { get; set; }
        public string _address { get; set; }
        public int _bedroom { get; set; }
        public int _bathroom { get; set; }
        public decimal _price { get; set; }
        public decimal _size { get; set; }
        public string _status { get; set; }
        public string _description { get; set; }
        public string _url { get; set; }
    }
}