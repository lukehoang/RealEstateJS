﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Utilities;
using System.Data;
using System.Collections;

namespace webAPI
{
    /// <summary>
    /// Summary description for HomeWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class HomeWS : System.Web.Services.WebService
    {

        [WebMethod]
        public Boolean StoreTeam(House theHouse)
        {
            DBConnect objDB = new DBConnect();

            string strSQL = "INSERT INTO Home (MLS, Address, Bedroom, Bathroom, Price, Size, Status, Description, Url) " +
                            "VALUES ('" + theHouse._MLS + "', '" + theHouse._address + "', '" + theHouse._bedroom + "', '" + theHouse._bathroom+ "', '" + theHouse._price+ "',"
                             + theHouse._size + "', '" + theHouse._status+ "', '" + theHouse._description + "', '" + theHouse._url + "')";
            int result = objDB.DoUpdate(strSQL);
            if (result > 0)
                return true;
            return false;
        }

        [WebMethod]
        public House GetHouseByMLS(int MLS)
        {
            DBConnect objDB = new DBConnect();
            House house = new House();
            string strSQL = "SELECT * FROM Home WHERE MLS = '" + MLS + "'";
            int recordCount = 0;
            objDB.GetDataSet(strSQL, out recordCount);
            if (recordCount > 0)
            {
                house._MLS = int.Parse(objDB.GetField("MLS", 0).ToString());
                house._address = objDB.GetField("Address", 0).ToString();
                house._bedroom= int.Parse(objDB.GetField("Bedroom", 0).ToString());
                house._bathroom = int.Parse(objDB.GetField("Bathroom", 0).ToString());
                house._price = decimal.Parse(objDB.GetField("Price", 0).ToString());
                house._size = decimal.Parse(objDB.GetField("Size", 0).ToString());
                house._status = objDB.GetField("Status", 0).ToString();
                house._description= objDB.GetField("Description", 0).ToString();
                house._url = objDB.GetField("Url", 0).ToString();
            }
            return house;
        }

        [WebMethod]
        public Boolean ChangeHouseStatus(int MLS, string Status)
        {
            DBConnect objDB = new DBConnect();
            string strSQL = "update Home set Status = '" + Status + "' where MLS = '" + MLS + "'";
            int result = objDB.DoUpdate(strSQL);
            if (result > 0)
                return true;
            return false;
        }

        [WebMethod]
        public List<House> GetHousesByRange(decimal range)
        {
            DBConnect objDB = new DBConnect();
            List<House> houseList = new List<House>();
            string strSQL = "SELECT * FROM Home where Price <= " + range;
            int recordCount = 0;
            objDB.GetDataSet(strSQL, out recordCount);
            
            for (int i = 0; i < recordCount; i++)
            {
                House house = new House();
                house._MLS = int.Parse(objDB.GetField("MLS", i).ToString());
                house._address = objDB.GetField("Address", i).ToString();
                house._bedroom = int.Parse(objDB.GetField("Bedroom", i).ToString());
                house._bathroom = int.Parse(objDB.GetField("Bathroom", i).ToString());
                house._price = decimal.Parse(objDB.GetField("Price", i).ToString());
                house._size = decimal.Parse(objDB.GetField("Size", i).ToString());
                house._status = objDB.GetField("Status", i).ToString();
                house._description = objDB.GetField("Description", i).ToString();
                house._url = objDB.GetField("Url", i).ToString();
                houseList.Add(house);
            }
            return houseList;
        }

        [WebMethod]
        public List<House> GetHousesByBedBath(int bed, int bath)
        {
            DBConnect objDB = new DBConnect();
            List<House> houseList = new List<House>();
            string strSQL = "SELECT * FROM Home where Bedroom >= " + bed + " and Bathroom >= " + bath;
            int recordCount = 0;
            objDB.GetDataSet(strSQL, out recordCount);

            for (int i = 0; i < recordCount; i++)
            {
                House house = new House();
                house._MLS = int.Parse(objDB.GetField("MLS", i).ToString());
                house._address = objDB.GetField("Address", i).ToString();
                house._bedroom = int.Parse(objDB.GetField("Bedroom", i).ToString());
                house._bathroom = int.Parse(objDB.GetField("Bathroom", i).ToString());
                house._price = decimal.Parse(objDB.GetField("Price", i).ToString());
                house._size = decimal.Parse(objDB.GetField("Size", i).ToString());
                house._status = objDB.GetField("Status", i).ToString();
                house._description = objDB.GetField("Description", i).ToString();
                house._url = objDB.GetField("Url", i).ToString();
                houseList.Add(house);
            }
            return houseList;
        }
    }
}
